import { useState } from "react";
import Cookies from "js-cookie";
import { useAlert } from "react-alert";

export default function FeedbackModal() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [subject_error, setSubjectError] = useState("");
  const [message_error, setMessageError] = useState("");

  const alert = useAlert();

  async function handleSubmit(e) {
    e.preventDefault();

    var myModal = await bootstrap.Modal.getInstance(
      document.getElementById("feedbackModal")
    );

    const feedbackApi = await fetch(
      `${process.env.API_URL}/user/feedback/add/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + Cookies.get("token"),
        },
        body: JSON.stringify({ subject, message }),
      }
    );

    if (feedbackApi.ok) {
      myModal.toggle();
      setSubject("");
      setSubjectError("");
      setMessage("");
      setMessageError("");
      alert.success("Сообщение отправлено");
    } else {
      const result = await feedbackApi.json();

      setSubjectError(result.subject);
      setMessageError(result.message);
    }
  }

  return (
    <>
      {/* Add New Address Modal */}
      <div
        className="modal fade"
        id="feedbackModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        aria-labelledby="feedbackModalTitle"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h4 id="feedbackModalTitle" className="modal-title">
                Задать вопрос
              </h4>
              <div className="modal-close">
                <button
                  type="button"
                  className="btn btn-icon btn-xs btn-ghost-secondary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* End Header */}

            {/* Body */}
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-sm-12">
                    {/* Form Group */}
                    <div className="form-group">
                      <label htmlFor="subject" className="input-label">
                        Тема вопроса
                      </label>
                      <input
                        type="text"
                        className={`form-control ${
                          subject_error ? "is-invalid" : null
                        }`}
                        name="subject"
                        value={subject}
                        onChange={(e) => (
                          setSubject(e.target.value), setSubjectError("")
                        )}
                        id="subject"
                        placeholder="Оплата"
                        aria-label="Оплата"
                        required=""
                      />
                      {subject_error ? (
                        <span className="text-danger font-size-1">
                          {subject_error}
                        </span>
                      ) : null}
                    </div>
                    {/* End Form Group */}
                  </div>

                  <div className="col-sm-12">
                    {/* Form Group */}
                    <div className="form-group">
                      <label htmlFor="message" className="input-label">
                        Сообщение
                      </label>
                      <div className="input-group">
                        <textarea
                          className={`form-control ${
                            message_error ? "is-invalid" : null
                          }`}
                          rows="4"
                          name="message"
                          value={message}
                          onChange={(e) => (
                            setMessage(e.target.value), setMessageError("")
                          )}
                          id="message"
                          placeholder="Привет, я бы хотел ..."
                          aria-label="Привет, я бы хотел ..."
                          required=""
                        />
                      </div>
                      {message_error ? (
                        <span className="text-danger font-size-1">
                          {message_error}
                        </span>
                      ) : null}
                    </div>
                    {/* End Form Group */}
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-white mr-2"
                    data-bs-dismiss="modal"
                  >
                    Закрыть
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Добавить
                  </button>
                </div>
              </form>
            </div>
            {/* End Body */}
          </div>
        </div>
      </div>
      {/* End Add New Address Modal */}
    </>
  );
}
