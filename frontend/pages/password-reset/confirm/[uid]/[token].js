import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAlert } from "react-alert";
import Layout from "../../../../components/layout";
import LoadingElement from "../../../../components/loadingElement";

export default function Activate() {
  const alert = useAlert();
  const router = useRouter();

  const [new_password, setNewPassword] = useState("");
  const [re_new_password, setReNewPassword] = useState("");

  const [new_password_error, setNewPasswordError] = useState("");
  const [re_new_password_error, setReNewPasswordError] = useState("");

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoadingSubmit(true);

    const query = router.query;

    const confirmApi = await fetch(
      `${process.env.API_URL}/auth/users/reset_password_confirm/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: query.uid,
          token: query.token,
          new_password,
          re_new_password,
        }),
      }
    );

    if (confirmApi.ok) {
      setNewPassword("");
      setReNewPassword("");

      alert.success("Success");
    } else {
      let result = await confirmApi.json();

      setNewPasswordError(result.new_password);
      setReNewPasswordError(result.re_new_password);

      if (result.token) {
        alert.error(result.token);
      }
    }

    setLoadingSubmit(false);
  }

  return (
    <Layout title={`Смена пароля`}>
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
                  <h1 className="h2">Сменить пароль</h1>
                  <p>Введите новый пароль.</p>
                </div>
                {/* End Title */}

                {/* Form Group */}
                <div className="form-group">
                  <label
                    className="input-label"
                    htmlFor="resetNewPassword"
                    tabIndex="0"
                  >
                    Пароль
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      new_password_error ? "is-invalid" : null
                    }`}
                    name="new_password"
                    value={new_password}
                    onChange={(e) => (
                      setNewPassword(e.target.value), setNewPasswordError("")
                    )}
                    id="resetNewPassword"
                    tabIndex="2"
                    placeholder="********"
                    aria-label="********"
                  />
                  {new_password_error ? (
                    <span className="text-danger font-size-1">
                      {new_password_error}
                    </span>
                  ) : null}
                </div>
                {/* End Form Group */}

                {/* Form Group */}
                <div className="form-group">
                  <label
                    className="input-label"
                    htmlFor="resetReNewPassword"
                    tabIndex="0"
                  >
                    Повторите пароль
                  </label>
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
                    id="resetReNewPassword"
                    tabIndex="2"
                    placeholder="********"
                    aria-label="********"
                  />
                  {re_new_password_error ? (
                    <span className="text-danger font-size-1">
                      {re_new_password_error}
                    </span>
                  ) : null}
                </div>
                {/* End Form Group */}

                {/* Button */}
                <div className="row align-items-center mb-5">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <span className="font-size-1 text-muted">
                      Нет учетной записи?
                    </span>{" "}
                    <Link href={`/signup`}>
                      <a className="font-size-1 font-weight-bold">
                        Регистрация
                      </a>
                    </Link>
                  </div>

                  <div className="col-sm-6 text-sm-right">
                    <button
                      type="submit"
                      className="btn btn-primary transition-3d-hover"
                    >
                      Далее
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
