import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import Cookies from "js-cookie";
import { useUser } from "../utils/auth";
import Layout from "../components/layout";
import LoadingElement from "../components/loadingElement";

export default function Login() {
  const alert = useAlert();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [email_error, setEmailError] = useState("");
  const [password_error, setPasswordError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const loginApi = await fetch(`${process.env.API_URL}/auth/jwt/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    let result = await loginApi.json();

    if (loginApi.ok) {
      Cookies.set("token", result.access, { expires: 1 });
      Cookies.set("refresh", result.refresh, { expires: 1 });
      Router.replace("/");
    } else {
      setEmailError(result.email);
      setPasswordError(result.password);

      if (result.non_field_errors) {
        alert.error(result.non_field_errors);
      }
      if (result.detail) {
        alert.error(result.detail);
      }
    }
  }

  const { user, loadingUser, loggedOut, mutate } = useUser();

  useEffect(() => {
    if (user) {
      Router.replace("/");
    }
  }, [user]);
  if (user) return <LoadingElement />;

  return (
    <Layout title={`Вход`}>
      {loadingUser ? (
        <LoadingElement />
      ) : (
        <div className="container">
          <div className="row no-gutters">
            <div className="col-md-8 col-lg-7 col-xl-6 offset-md-2 offset-lg-2 offset-xl-3 space-2">
              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="mb-5 mb-md-7">
                  <h1 className="h2">С возвращением</h1>
                  <p>Войдите, чтобы управлять своей учетной записью.</p>
                </div>
                {/* End Title */}

                {/* Form Group */}
                <div className="form-group">
                  <label className="input-label" htmlFor="signinSrEmail">
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
                    id="signinSrEmail"
                    tabIndex="1"
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

                {/* Form Group */}
                <div className="form-group">
                  <label
                    className="input-label"
                    htmlFor="signinSrPasswordExample2"
                    tabIndex="0"
                  >
                    <span className="d-flex justify-content-between align-items-center">
                      Пароль
                      <Link href={`/password-reset`}>
                        <a className="link-underline text-capitalize font-weight-normal">
                          Забыли Пароль?
                        </a>
                      </Link>
                    </span>
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      password_error ? "is-invalid" : null
                    }`}
                    name="password"
                    value={password}
                    onChange={(e) => (
                      setPassword(e.target.value), setPasswordError("")
                    )}
                    id="signinSrPasswordExample2"
                    tabIndex="2"
                    placeholder="********"
                    aria-label="********"
                  />
                  {password_error ? (
                    <span className="text-danger font-size-1">
                      {password_error}
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
