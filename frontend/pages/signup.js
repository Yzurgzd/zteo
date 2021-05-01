import Link from "next/link";
import Router from "next/router";
import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useUser } from "../utils/auth";
import Layout from "../components/layout";
import LoadingElement from "../components/loadingElement";

export default function Signup() {
  const alert = useAlert();

  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRePassword] = useState("");

  const [email_error, setEmailError] = useState("");
  const [first_name_error, setFirstNameError] = useState("");
  const [last_name_error, setLastNameError] = useState("");
  const [password_error, setPasswordError] = useState("");
  const [re_password_error, setRePasswordError] = useState("");

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoadingSubmit(true);

    const loginApi = await fetch(`${process.env.API_URL}/auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        first_name,
        last_name,
        password,
        re_password,
      }),
    });

    let result = await loginApi.json();

    if (loginApi.ok) {
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setRePassword("");

      alert.success(
        "На ваш email отправлено письмо. Пожалуйста перейдите по ссылке из письма. Возможно оно попало в папку спам"
      );
    } else {
      setEmailError(result.email);
      setFirstNameError(result.first_name);
      setLastNameError(result.last_name);
      setPasswordError(result.password);
      setRePasswordError(result.re_password);

      if (result.non_field_errors) {
        alert.error(result.non_field_errors);
      }
    }

    setLoadingSubmit(false);
  }

  const { user, loadingUser, loggedOut, mutate } = useUser();

  useEffect(() => {
    if (user) {
      Router.replace("/");
    }
  }, [user]);
  if (user) return <LoadingElement />;

  return (
    <Layout title={`Регистрация`}>
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
                  <h1 className="h2">Добро пожаловать</h1>
                  <p>Заполните форму, чтобы зарегистрироваться.</p>
                </div>
                {/* End Title */}

                {/* Form Group */}
                <div className="form-group">
                  <label className="input-label" htmlFor="signinEmail">
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
                    id="signinEmail"
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
                  <label className="input-label" htmlFor="signinFirstName">
                    Имя
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      first_name_error ? "is-invalid" : null
                    }`}
                    name="first_name"
                    value={first_name}
                    onChange={(e) => (
                      setFirstName(e.target.value), setFirstNameError("")
                    )}
                    id="signinFirstName"
                    placeholder="Ваше имя"
                    aria-label="First name"
                  />
                  {first_name_error ? (
                    <span className="text-danger font-size-1">
                      {first_name_error}
                    </span>
                  ) : null}
                </div>
                {/* End Form Group */}

                {/* Form Group */}
                <div className="form-group">
                  <label className="input-label" htmlFor="signinLastName">
                    Фамилия
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      last_name_error ? "is-invalid" : null
                    }`}
                    name="last_name"
                    value={last_name}
                    onChange={(e) => (
                      setLastName(e.target.value), setLastNameError("")
                    )}
                    id="signinLastName"
                    placeholder="Ваша фамилия"
                    aria-label="Last name"
                  />
                  {last_name_error ? (
                    <span className="text-danger font-size-1">
                      {last_name_error}
                    </span>
                  ) : null}
                </div>
                {/* End Form Group */}

                {/* Form Group */}
                <div className="form-group">
                  <label
                    className="input-label"
                    htmlFor="signinSrPasswordExample1"
                  >
                    Пароль
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
                    id="signinSrPasswordExample1"
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

                {/* Form Group */}
                <div className="form-group">
                  <label
                    className="input-label"
                    htmlFor="signinSrConfirmPassword"
                  >
                    Повторите пароль
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      re_password_error ? "is-invalid" : null
                    }`}
                    name="re_password"
                    value={re_password}
                    onChange={(e) => (
                      setRePassword(e.target.value), setRePasswordError("")
                    )}
                    id="signinSrConfirmPassword"
                    placeholder="********"
                    aria-label="********"
                  />
                  {re_password_error ? (
                    <span className="text-danger font-size-1">
                      {re_password_error}
                    </span>
                  ) : null}
                </div>
                {/* End Form Group */}

                {/* Button */}
                <div className="row align-items-center mb-5">
                  <div className="col-sm-6 mb-3 mb-sm-0">
                    <span className="font-size-1 text-muted">
                      У вас уже есть аккаунт?
                    </span>{" "}
                    <Link href={`/login`}>
                      <a className="font-size-1 font-weight-bold">
                        Авторизация
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
