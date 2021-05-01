import Link from "next/link";
import Cookies from "js-cookie";
import { useAlert } from "react-alert";
import { useUser } from "../../utils/auth";
import Router from "next/router";
import React, { useEffect } from "react";
import Submenu from "../../public/assets/js/submenu";
import useSWR from "swr";
import Skeleton from "react-loading-skeleton";

const Children = ({ children }) => (
  <>
    {children.map((child) => (
      <React.Fragment key={child.id}>
        <Link href={`/products/[slug]`} as={`/products/${child.slug}`}>
          <a className="dropdown-item px-0">{child.name}</a>
        </Link>
        {Array.isArray(child.get_children) && child.get_children.length ? (
          <Children children={child.get_children} />
        ) : null}
      </React.Fragment>
    ))}
  </>
);

export default function Header() {
  const alert = useAlert();
  const { user, loadingUser, loggedOut, mutate } = useUser();

  const { data: categories, error } = useSWR([
    `${process.env.API_URL}/categories/parent/`,
  ]);

  useEffect(() => {
    Submenu();
  }, []);

  async function Logout() {
    Cookies.remove("token");
    Cookies.remove("refresh");

    Router.replace("/");
  }

  let profile = null;
  if (loadingUser) {
    profile = <Skeleton width={81} height={43} />;
  }
  if (user) {
    profile = (
      <>
        <div className="nav-item dropdown">
          <a
            className="nav-link"
            id="navbarDropdownMenuLink"
            type="submit"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="avatar avatar-xs avatar-circle mr-3">
              <img
                className="avatar-img"
                src={user.avatar}
                alt="Image Description"
              />
            </div>
            <span>
              {user.first_name} {user.last_name}
            </span>
          </a>
          <ul
            className="dropdown-menu dropdown-menu-animated"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link href={`/account`}>
                <a className="dropdown-item">Аккаунт</a>
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a type="submit" onClick={Logout} className="dropdown-item">
                Выйти
              </a>
            </li>
          </ul>
        </div>
      </>
    );
  }
  if (loggedOut) {
    profile = (
      <Link href={`/login`}>
        <a className="btn btn-sm btn-primary transition-3d-hover">Войти</a>
      </Link>
    );
  }

  return (
    <>
      <header id="headerBasic" className="header">
        <div className="header-section">
          <div id="basicLogoAndNav" className="container">
            {/* Nav */}
            <nav className="js-mega-menu navbar navbar-expand-lg">
              {/* Logo */}
              <Link href={`/`}>
                <a className="navbar-brand">
                  <img
                    src="/assets/img/logos/logo.png"
                    alt="logo"
                    width="140"
                    className="d-inline-block align-top"
                  />
                </a>
              </Link>
              {/* End Logo */}

              {/* Responsive Toggle Button */}
              <button
                type="button"
                className="navbar-toggler btn btn-icon btn-sm rounded-circle"
                aria-label="Toggle navigation"
                aria-expanded="false"
                aria-controls="navBarBasic"
                data-bs-toggle="collapse"
                data-bs-target="#navBarBasic"
              >
                <span className="navbar-toggler-default">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M17.4,6.2H0.6C0.3,6.2,0,5.9,0,5.5V4.1c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,5.9,17.7,6.2,17.4,6.2z M17.4,14.1H0.6c-0.3,0-0.6-0.3-0.6-0.7V12c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,13.7,17.7,14.1,17.4,14.1z"
                    />
                  </svg>
                </span>
                <span className="navbar-toggler-toggled">
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
                </span>
              </button>
              {/* End Responsive Toggle Button */}

              {/* Navigation */}
              <div id="navBarBasic" className="collapse navbar-collapse">
                <ul className="navbar-nav">
                  <li className="navbar-nav-item">
                    <Link href={`/`}>
                      <a className="nav-link">Главная</a>
                    </Link>
                  </li>

                  <li className="nav-item dropdown dropdown-mega">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      Категории
                    </a>
                    <div className="hs-mega-menu dropdown-menu dropdown-menu-animated shadow">
                      <div className="row mega-menu-body">
                        {categories ? (
                          <>
                            {categories.map((category) => (
                              <div
                                className="col-sm-3 mb-3 mb-sm-0"
                                key={category.id}
                              >
                                <span className="d-block h5">
                                  {category.name}
                                </span>
                                <div className="mb-3">
                                  {Array.isArray(category.get_children) &&
                                  category.get_children.length ? (
                                    <Children
                                      children={category.get_children}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            <div className="col-sm-3 mb-3 mb-sm-0">
                              <span className="d-block h5">
                                <Skeleton height={22} />
                              </span>
                              <Skeleton
                                className="mb-3"
                                count={4}
                                height={22}
                              />
                            </div>
                            <div className="col-sm-3 mb-3 mb-sm-0">
                              <span className="d-block h5">
                                <Skeleton height={22} />
                              </span>
                              <Skeleton
                                className="mb-3"
                                count={4}
                                height={22}
                              />
                            </div>
                            <div className="col-sm-3 mb-3 mb-sm-0">
                              <span className="d-block h5">
                                <Skeleton height={22} />
                              </span>
                              <Skeleton
                                className="mb-3"
                                count={4}
                                height={22}
                              />
                            </div>
                            <div className="col-sm-3 mb-3 mb-sm-0">
                              <span className="d-block h5">
                                <Skeleton height={22} />
                              </span>
                              <Skeleton
                                className="mb-3"
                                count={4}
                                height={22}
                              />
                            </div>
                          </>
                        )}
                      </div>

                      <div className="navbar-promo-footer">
                        {/* List */}
                        <div className="row no-gutters">
                          <div className="col-6">
                            <div className="navbar-promo-footer-item">
                              <span className="navbar-promo-footer-text">
                                Check what's new
                              </span>
                              <Link href={`/categories`}>
                                <a className="navbar-promo-footer-text">
                                  Все категории
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                        {/* End List */}
                      </div>
                    </div>
                  </li>
                  <li className="list-inline-item">
                    {user ? (
                      <Link href={`/cart`}>
                        <a className="btn btn-sm btn-icon btn-link-secondary">
                          <i className="fas fa-shopping-cart mr-1"></i>
                          <span className="badge badge-pill badge-light">
                            {user.get_quantity_products_in_cart}
                          </span>
                        </a>
                      </Link>
                    ) : (
                      <a
                        className="btn btn-xs btn-icon btn-link-secondary"
                        type="submit"
                        onClick={() => alert.error("Необходимо авторизоваться")}
                      >
                        <i className="fas fa-shopping-cart"></i>
                      </a>
                    )}
                  </li>
                  <li className="nav-item navbar-nav-last-item">{profile}</li>
                </ul>
              </div>
              {/* End Navigation */}
            </nav>
            {/* End Nav */}
          </div>
        </div>
      </header>
    </>
  );
}
