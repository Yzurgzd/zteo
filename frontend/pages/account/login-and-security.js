import { useState, useEffect } from "react";
import AccountLayout from "../../components/accountLayout";
import { useUser } from "../../utils/auth";
import Cookies from "js-cookie";
import { useAlert } from "react-alert";
import Router from "next/router";
import Skeleton from "react-loading-skeleton";

export default function LoginAndSecurity() {
  const { user, loadingUser, loggedOut, mutate } = useUser();
  const alert = useAlert();

  const [current_password, setCurrentPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [re_new_password, setReNewPassword] = useState("");

  const [current_password_error, setCurrentPasswordError] = useState("");
  const [new_password_error, setNewPasswordError] = useState("");
  const [re_new_password_error, setReNewPasswordError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const setApi = await fetch(
      `${process.env.API_URL}/auth/users/set_password/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${Cookies.get("token")}`,
        },
        body: JSON.stringify({
          current_password,
          new_password,
          re_new_password,
        }),
      }
    );

    if (setApi.ok) {
      alert.success("Пароль успешно изменен");
    } else {
      const result = await setApi.json();

      setCurrentPasswordError(result.current_password);
      setNewPasswordError(result.new_password);
      setReNewPasswordError(result.re_new_password);

      if (result.non_field_errors) {
        alert.error(result.non_field_errors);
      }
      if (result.detail) {
        alert.error(result.detail);
      }
    }
  }

  if (loggedOut) return <LoadingElement />;

  return (
    <AccountLayout title={`Безопастность`}>
      <div className="card mb-3 mb-lg-5">
        <div className="card-header">
          <h5 className="card-title">Пароль</h5>
        </div>

        {/* Body */}
        <div className="card-body">
          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Form Group */}
            <div className="row form-group">
              <label
                htmlFor="currentPasswordLabel"
                className="col-sm-3 col-form-label input-label"
              >
                Текущий пароль
              </label>

              <div className="col-sm-9">
                {loadingUser ? (
                  <Skeleton width={575} height={51} />
                ) : (
                  <>
                    <input
                      type="password"
                      className={`form-control ${
                        current_password_error ? "is-invalid" : null
                      }`}
                      name="current_password"
                      value={current_password}
                      onChange={(e) => (
                        setCurrentPassword(e.target.value),
                        setCurrentPasswordError("")
                      )}
                      id="currentPasswordLabel"
                      placeholder="Введите текущий пароль"
                      aria-label="Введите текущий пароль"
                    />
                    {current_password_error ? (
                      <span className="text-danger font-size-1">
                        {current_password_error}
                      </span>
                    ) : null}
                  </>
                )}
              </div>
            </div>
            {/* End Form Group */}
            {/* Form Group */}
            <div className="row form-group">
              <label
                htmlFor="newPassword"
                className="col-sm-3 col-form-label input-label"
              >
                Новый пароль
              </label>

              <div className="col-sm-9">
                {loadingUser ? (
                  <Skeleton width={575} height={51} />
                ) : (
                  <>
                    <input
                      type="password"
                      className="form-control"
                      className={`form-control ${
                        new_password_error ? "is-invalid" : null
                      }`}
                      value={new_password}
                      onChange={(e) => (
                        setNewPassword(e.target.value), setNewPasswordError("")
                      )}
                      id="newPassword"
                      placeholder="Введите новый пароль"
                      aria-label="Введите новый пароль"
                    />
                    {new_password_error ? (
                      <span className="text-danger font-size-1">
                        {new_password_error}
                      </span>
                    ) : null}
                  </>
                )}
              </div>
            </div>
            {/* End Form Group */}
            {/* Form Group */}
            <div className="row form-group">
              <label
                htmlFor="confirmNewPasswordLabel"
                className="col-sm-3 col-form-label input-label"
              >
                Повторите новый пароль
              </label>

              <div className="col-sm-9">
                <div className="mb-3">
                  {loadingUser ? (
                    <Skeleton width={575} height={51} />
                  ) : (
                    <>
                      <input
                        type="password"
                        className={`form-control ${
                          re_new_password_error ? "is-invalid" : null
                        }`}
                        name="re_new_password"
                        value={re_new_password}
                        onChange={(e) => (
                          setReNewPassword(e.target.value),
                          setReNewPasswordError("")
                        )}
                        id="confirmNewPasswordLabel"
                        placeholder="Повторите новый пароль"
                        aria-label="Повторите новый пароль"
                      />
                      {re_new_password_error ? (
                        <span className="text-danger font-size-1">
                          {re_new_password_error}
                        </span>
                      ) : null}
                    </>
                  )}
                </div>

                <h5>Требования к паролю:</h5>

                <p className="card-text font-size-1">
                  Убедитесь, что эти требования соблюдены:
                </p>

                <ul className="font-size-1">
                  <li>Минимум 8 символов - чем больше, тем лучше</li>
                  <li>По крайней мере, один символ нижнего регистра</li>
                  <li>По крайней мере одна цифра, символ</li>
                </ul>
              </div>
            </div>
            {/* End Form Group */}
            {/* Footer */}
            <div className="card-footer d-flex justify-content-end">
              {loadingUser ? (
                <Skeleton width={177} height={51} />
              ) : (
                <button type="submit" className="btn btn-primary">
                  Обновить пароль
                </button>
              )}
            </div>
            {/* End Footer */}
          </form>
          {/* End Form */}
        </div>
        {/* End Body */}
      </div>
    </AccountLayout>
  );
}
