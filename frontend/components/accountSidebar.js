import Link from "next/link";
import { useUser } from "../utils/auth";
import { useRouter } from "next/router";
import Router from "next/router";
import { useEffect } from "react";
import LoadingElement from "./loadingElement";
import Skeleton from "react-loading-skeleton";

export default function AccountSidebar() {
  const { user, loadingUser, loggedOut, mutate } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loggedOut) {
      Router.replace("/");
    }
  }, [loggedOut]);
  if (loggedOut) return <LoadingElement />;

  return (
    <>
      <div className="navbar-expand-lg navbar-expand-lg-collapse-block navbar-light">
        <div
          id="sidebarNav"
          className="collapse navbar-collapse navbar-vertical"
        >
          {/* Card */}
          <div className="card mb-5">
            <div className="card-body">
              {/* Avatar */}
              <div className="d-none d-lg-block text-center mb-5">
                <div className="avatar avatar-xxl avatar-circle mb-3">
                  {loadingUser ? (
                    <Skeleton circle={true} width={112} height={112} />
                  ) : (
                    <img
                      className="avatar-img"
                      src={user.avatar}
                      alt="Image Description"
                    />
                  )}
                </div>

                <h4 className="card-title">
                  {loadingUser ? (
                    <Skeleton width={100} height={24} />
                  ) : (
                    <>
                      {user.first_name} {user.last_name}
                    </>
                  )}
                </h4>
                <p className="card-text font-size-1">
                  {loadingUser ? (
                    <Skeleton width={100} height={24} />
                  ) : (
                    <>{user.email}</>
                  )}
                </p>
              </div>
              {/* End Avatar */}

              {/* Nav */}
              <h6 className="text-cap small">Аккаунт</h6>

              {/* List */}
              <ul className="nav nav-sub nav-sm nav-tabs nav-list-y-2 mb-4">
                <li className="nav-item">
                  <Link href={`/account`}>
                    <a
                      className={`nav-link ${
                        router.pathname === "/account" ? "active" : null
                      }`}
                    >
                      <i className="fas fa-id-card nav-icon"></i> Основная
                      информация
                    </a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href={`/account/login-and-security`}>
                    <a
                      className={`nav-link ${
                        router.pathname === "/account/login-and-security"
                          ? "active"
                          : null
                      }`}
                    >
                      <i className="fas fa-shield-alt nav-icon"></i>{" "}
                      Безопастность
                    </a>
                  </Link>
                </li>
              </ul>
              {/* End List */}

              <h6 className="text-cap small">Покупки</h6>

              {/* List */}
              <ul className="nav nav-sub nav-sm nav-tabs nav-list-y-2 mb-4">
                <li className="nav-item">
                  <Link href={`/account/orders`}>
                    <a
                      className={`nav-link ${
                        router.pathname === "/account/orders" ? "active" : null
                      }`}
                    >
                      <i className="fas fa-shopping-basket nav-icon"></i> Ваши
                      заказы
                    </a>
                  </Link>
                </li>
              </ul>
              {/* End List */}

              <h6 className="text-cap small">Данные</h6>

              {/* List */}
              <ul className="nav nav-sub nav-sm nav-tabs nav-list-y-2">
                <li className="nav-item">
                  <Link href={`/account/address`}>
                    <a
                      className={`nav-link ${
                        router.pathname === "/account/address" ? "active" : null
                      }`}
                    >
                      <i className="fas fa-map-marker-alt nav-icon"></i> Адрес
                    </a>
                  </Link>
                </li>
              </ul>
              {/* End List */}
              {/* End Nav */}
            </div>
          </div>
          {/* End Card */}
        </div>
      </div>
    </>
  );
}
