import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import AccountLayout from "../../components/accountLayout";
import { useUser } from "../../utils/auth";
import Cookies from "js-cookie";
import LoadingElement from "../../components/loadingElement";
import { useAlert } from "react-alert";
import Skeleton from "react-loading-skeleton";

export default function PersonInfo() {
  const { user, loadingUser, loggedOut, mutate } = useUser();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const alert = useAlert();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", first_name || user.first_name);
    formData.append("last_name", last_name || user.last_name);
    formData.append("email", email || user.email);
    formData.append("avatar", image ? image[0] : "");

    const updateApi = await fetch(`${process.env.API_URL}/user/update/`, {
      method: "PUT",
      headers: {
        Authorization: "JWT " + Cookies.get("token"),
      },
      body: formData,
    });

    if (updateApi.ok) {
      mutate();
      setFirstName("");
      setLastName("");
      setEmail("");
      setImage(null);
    } else {
      const error = await updateApi.json();
      alert.error(error.avatar);
    }
  }

  async function deleteAvatarOnClick() {
    const deleteApi = await fetch(
      `${process.env.API_URL}/user/avatar/delete/`,
      {
        method: "PUT",
        headers: {
          Authorization: "JWT " + Cookies.get("token"),
        },
      }
    );

    if (deleteApi.ok) {
      mutate();
    }
  }

  if (loggedOut) return <LoadingElement />;

  return (
    <AccountLayout title={`Основная информация`}>
      <div className="card mb-3 mb-lg-5">
        <div className="card-header">
          <h5 className="card-title">Основная информация</h5>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Body */}
          <div className="card-body">
            {/* Form Group */}
            <div className="row form-group">
              <label className="col-sm-3 col-form-label input-label">
                Фото профиля
              </label>

              <div className="col-sm-9">
                <div className="media align-items-center">
                  <label
                    className="avatar avatar-xl avatar-circle mr-4"
                    htmlFor="avatarUploader"
                  >
                    {loadingUser ? (
                      <Skeleton circle={true} width={90} height={90} />
                    ) : (
                      <img
                        id="avatarImg"
                        className="avatar-img"
                        src={user.avatar}
                        alt="Image Description"
                      />
                    )}
                  </label>

                  <div className="media-body">
                    {loadingUser ? (
                      <>
                        <Skeleton className="mr-2" width={111} height={43} />

                        <Skeleton width={94} height={43} />
                      </>
                    ) : (
                      <>
                        <div className="btn btn-sm btn-primary file-attachment-btn mb-2 mb-sm-0 mr-2">
                          Загрузить Фото
                          <input
                            type="file"
                            className="js-file-attach file-attachment-btn-label"
                            id="avatarUploader"
                            onChange={(e) => setImage(e.target.files)}
                          />
                        </div>

                        <a
                          className="btn btn-sm btn-white mb-2 mb-sm-0"
                          type="submit"
                          onClick={deleteAvatarOnClick}
                        >
                          Удалить
                        </a>
                      </>
                    )}
                  </div>
                </div>
                {image ? (
                  <a
                    className="js-create-field form-link btn btn-xs btn-no-focus btn-ghost-primary"
                    type="submit"
                    onClick={() => setImage(null)}
                  >
                    <i className="fas fa-minus mr-1"></i>
                    {image[0].name}
                  </a>
                ) : null}
              </div>
            </div>
            {/* End Form Group */}

            {/* Form Group */}
            <div className="row form-group">
              <label
                htmlFor="firstNameLabel"
                className="col-sm-3 col-form-label input-label"
              >
                Полное имя{" "}
                <i
                  className="far fa-question-circle text-body ml-1"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Displayed on public forums, such as Front."
                ></i>
              </label>

              <div className="col-sm-9">
                {loadingUser ? (
                  <Skeleton width={575} height={51} />
                ) : (
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      id="firstNameLabel"
                      placeholder={user.first_name}
                      aria-label={user.first_name}
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      id="lastNameLabel"
                      placeholder={user.last_name}
                      aria-label={user.last_name}
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
            {/* End Form Group */}

            {/* Form Group */}
            <div className="row form-group">
              <label
                htmlFor="emailLabel"
                className="col-sm-3 col-form-label input-label"
              >
                Email
              </label>

              <div className="col-sm-9">
                {loadingUser ? (
                  <Skeleton width={575} height={51} />
                ) : (
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="emailLabel"
                    placeholder={user.email}
                    aria-label={user.email}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                )}
              </div>
            </div>
            {/* End Form Group */}
          </div>
          {/* End Body */}

          {/* Footer */}
          <div className="card-footer d-flex justify-content-end">
            {loadingUser ? (
              <Skeleton width={216} height={51} />
            ) : (
              <button type="submit" className="btn btn-primary">
                Сохранить изменения
              </button>
            )}
          </div>
          {/* End Footer */}
        </form>
      </div>
    </AccountLayout>
  );
}
