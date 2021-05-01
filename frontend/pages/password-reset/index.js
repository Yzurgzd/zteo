import Link from "next/link";
import { useState } from "react";
import { useAlert } from "react-alert";
import Layout from "../../components/layout";
import LoadingElement from "../../components/loadingElement";

export default function ResetPassword() {
  const alert = useAlert();

  const [email, setEmail] = useState("");
  const [email_error, setEmailError] = useState("");

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoadingSubmit(true);

    const resetApi = await fetch(
      `${process.env.API_URL}/auth/users/reset_password/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    if (resetApi.ok) {
      setEmail("");

      alert.success(
        "На ваш email отправлено письмо. Пожалуйста перейдите по ссылке из письма. Возможно оно попало в папку спам"
      );
    } else {
      let result = await resetApi.json();
      setEmailError(result.email);

      if (result.non_field_errors) {
        alert.error(result.non_field_errors);
      }
    }

    setLoadingSubmit(false);
  }

  return (
    <Layout title="Восстановление пароля">
      {loadingSubmit ? (
        <LoadingElement />
      ) : (
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-8 col-lg-7 col-xl-6 offset-md-2 offset-lg-2 offset-xl-3 space-2">
              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-5 mb-md-7">
                  <h1 className="h2">Забыли свой пароль?</h1>
                  <p>
                    Введите свой адрес электронной почты ниже, и мы поможем вам
                    восстановить пароль.
                  </p>
                </div>
                {/* End Title */}

                {/* Form Group */}
                <div className="form-group">
                  <label
                    className="input-label"
                    htmlFor="signinSrEmailExample2"
                  >
                    Email адрес
                  </label>
                  <input
                    type="email"
                    className={`form-control ${
                      email_error ? "is-invalid" : null
                    }`}
                    name="email"
                    value={email}
                    onChange={(e) => (
                      setEmail(e.target.value), setEmailError("")
                    )}
                    id="signinSrEmailExample2"
                    placeholder="email@example.ru"
                    aria-label="Email address"
                  />
                  {email_error ? (
                    <span className="text-danger font-size-1">
                      {email_error}
                    </span>
                  ) : null}
                </div>
                {/* End Form Group */}

                {/* Button */}
                <div className="row align-items-center mb-5">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <a
                      className="font-size-1 font-weight-bold"
                      href="{% url 'account_login' %}"
                    >
                      <i className="fas fa-angle-left fa-sm mr-1"></i>
                      Вернуться к входу
                    </a>
                  </div>

                  <div className="col-sm-6 text-sm-right">
                    <button
                      type="submit"
                      className="btn btn-primary transition-3d-hover"
                    >
                      Запросить ссылку на сброс
                    </button>
                  </div>
                </div>
                {/* End Button */}
              </form>
              {/* End Form */}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
