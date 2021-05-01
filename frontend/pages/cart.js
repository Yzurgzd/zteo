import Cookies from "js-cookie";
import useSWR from "swr";
import { useUser, fetchWithToken } from "../utils/auth";
import { useEffect, useState } from "react";
import Router from "next/router";
import Link from "next/link";
import EmptyCart from "../components/emptyCart";
import LoadingElement from "../components/loadingElement";
import Layout from "../components/layout";

export default function Cart() {
  const token = Cookies.get("token");

  const { data: order, mutate, error } = useSWR(
    [`${process.env.API_URL}/order/`, token],
    fetchWithToken
  );
  const loadingOrder = !(order || order === null) && !error;

  const { loggedOut } = useUser();

  const [code, setCode] = useState("");
  const [code_error, setCodeError] = useState("");

  const refreshData = () => {
    mutate();
  };

  async function AddCoupon(e) {
    e.preventDefault();

    const addCouponApi = await fetch(`${process.env.API_URL}/coupon/add/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + Cookies.get("token"),
      },
      body: JSON.stringify({ code }),
    });

    if (addCouponApi.status < 300) {
      refreshData();
    } else {
      let result = await addCouponApi.json();
      setCodeError(result.detail);
    }
  }

  async function RemoveCoupone(e) {
    e.preventDefault();

    const removeCouponApi = await fetch(
      `${process.env.API_URL}/coupon/remove/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + Cookies.get("token"),
        },
      }
    );

    if (removeCouponApi.status < 300) {
      refreshData();
    }
  }

  async function onClickAddToCart(slug) {
    const addToCartApi = await fetch(`${process.env.API_URL}/cart/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + Cookies.get("token"),
      },
      body: JSON.stringify({
        quantity: 1,
        slug: slug,
      }),
    });

    if (addToCartApi.status < 300) {
      refreshData();
    }
  }

  async function onClickCartQuantityUpdateView(slug) {
    const cartQuantityUpdateApi = await fetch(
      `${process.env.API_URL}/cart/update-quantity/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + Cookies.get("token"),
        },
        body: JSON.stringify({
          slug: slug,
        }),
      }
    );

    if (cartQuantityUpdateApi.status < 300) {
      refreshData();
    }
  }

  async function onClickCartProductDelete(id) {
    const cartProductDeleteApi = await fetch(
      `${process.env.API_URL}/cart/${id}/delete/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + Cookies.get("token"),
        },
      }
    );

    if (cartProductDeleteApi.status < 300) {
      refreshData();
    }
  }

  useEffect(() => {
    if (loggedOut) {
      Router.replace("/");
    }
  }, [loggedOut]);
  if (loggedOut) return <LoadingElement />;

  return (
    <Layout title={`Корзина`}>
      {loadingOrder ? (
        <LoadingElement />
      ) : (
        <div className="container space-1 space-md-2">
          {order ? (
            <div className="row">
              <div className="col-lg-8 mb-7 mb-lg-0">
                {/* Title */}
                <div className="d-flex justify-content-between align-items-end border-bottom pb-3 mb-7">
                  <h1 className="h3 mb-0">Корзина покупок</h1>
                  <span>{order.products.length} товаров</span>
                </div>
                {/* End Title */}

                <form>
                  {/* Product Content */}
                  {order.products.map((cart) => (
                    <div key={cart.id} className="border-bottom pb-5 mb-5">
                      <div className="media">
                        <div className="max-w-15rem w-100 mr-3">
                          <img
                            className="img-fluid"
                            src={cart.product.poster}
                            alt="Image Description"
                          />
                        </div>
                        <div className="media-body">
                          <div className="row">
                            <div className="col-md-7 mb-3 mb-md-0">
                              <a
                                className="h5 d-block"
                                href="{{ cart.product.get_absolute_url }}"
                              >
                                {cart.product.name}
                              </a>

                              <div className="d-block d-md-none">
                                {cart.product.discount_price ? (
                                  <span className="h5 d-block mb-1">
                                    {cart.product.discount_price} ₽
                                  </span>
                                ) : (
                                  <span className="h5 d-block mb-1">
                                    {cart.product.price} ₽
                                  </span>
                                )}
                              </div>

                              <div className="text-body font-size-1 mb-1">
                                <span>Код товара: </span>
                                <span>{cart.product.article}</span>
                              </div>
                            </div>

                            <div className="col-md-3">
                              <div className="row">
                                <div className="col-auto">
                                  {/* Quantity */}
                                  <div className="bg-white border rounded px-3">
                                    <div className="row align-items-center">
                                      <div className="col-7">
                                        <label className="form-control h-auto border-0 rounded p-0">
                                          {cart.quantity}
                                        </label>
                                      </div>
                                      <div className="col-5 text-right">
                                        <a
                                          className="btn btn-xs btn-icon btn-outline-secondary rounded-circle"
                                          onClick={() =>
                                            onClickCartQuantityUpdateView(
                                              cart.product.slug
                                            )
                                          }
                                        >
                                          <i className="fas fa-minus"></i>
                                        </a>
                                        <a
                                          className="btn btn-xs btn-icon btn-outline-secondary rounded-circle"
                                          onClick={() =>
                                            onClickAddToCart(cart.product.slug)
                                          }
                                        >
                                          <i className="fas fa-plus"></i>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  {/* End Quantity */}
                                </div>

                                <div className="col-auto">
                                  <a
                                    className="d-block text-body font-size-1 mb-1"
                                    role="button"
                                    onClick={() =>
                                      onClickCartProductDelete(cart.id)
                                    }
                                  >
                                    <i className="far fa-trash-alt text-hover-primary mr-1"></i>
                                    <span className="font-size-1 text-hover-primary">
                                      Удалить
                                    </span>
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="col-4 col-md-2 d-none d-md-inline-block text-right">
                              {cart.product.discount_price ? (
                                <span className="h5 d-block mb-1">
                                  {cart.product.discount_price} ₽
                                </span>
                              ) : (
                                <span className="h5 d-block mb-1">
                                  {cart.product.price} ₽
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* End Product Content */}

                  <div className="d-sm-flex justify-content-end">
                    <Link href={`/`}>
                      <a className="font-weight-bold">
                        <i className="fas fa-angle-left fa-xs mr-1"></i>
                        Продолжить покупки
                      </a>
                    </Link>
                  </div>
                </form>
              </div>

              <div className="col-lg-4">
                <div className="pl-lg-4">
                  {/* Order Summary */}
                  <div className="card shadow-soft p-4 mb-4">
                    {/* Title */}
                    <div className="border-bottom pb-4 mb-4">
                      <h2 className="h3 mb-0">Итог заказа</h2>
                    </div>
                    {/* End Title */}

                    <div className="border-bottom pb-4 mb-4">
                      <div className="media align-items-center mb-3">
                        <span className="d-block font-size-1 mr-3">
                          Итого по позиции ({order.products.length})
                        </span>
                        <div className="media-body text-right">
                          <span className="text-dark font-weight-bold">
                            {order.get_subtotal} ₽
                          </span>
                        </div>
                      </div>

                      <div className="media align-items-center mb-3">
                        <span className="d-block font-size-1 mr-3">
                          Доставка
                        </span>
                        <div className="media-body text-right">
                          <span className="text-dark font-weight-bold">
                            Бесплатно
                          </span>
                        </div>
                      </div>

                      {/* Checkbox */}
                      <div className="card shadow-none mb-3">
                        <div className="card-body p-0">
                          <div className="custom-control custom-radio d-flex align-items-center small">
                            <input
                              type="radio"
                              className="custom-control-input"
                              id="deliveryRadio1"
                              name="deliveryRadio"
                              // checked
                            />
                            <label
                              className="custom-control-label ml-1"
                              htmlFor="deliveryRadio1"
                            >
                              <span className="d-block font-size-1 font-weight-bold mb-1">
                                Бесплатно - Стандартная доставка
                              </span>
                              <span className="d-block text-muted">
                                Доставка может занять 5-6 рабочих дней.
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      {/* End Checkbox */}

                      {order.coupon ? (
                        <div className="media align-items-center mb-3">
                          <span className="d-block font-size-1 mr-3">
                            Промо-код
                          </span>
                          <div className="media-body text-right">
                            <span className="text-dark font-weight-bold">
                              -{order.coupon.discount_amount} ₽
                            </span>
                          </div>
                        </div>
                      ) : null}
                    </div>

                    <div className="media align-items-center mb-3">
                      <span className="d-block font-size-1 mr-3">Итог</span>
                      <div className="media-body text-right">
                        <span className="text-dark font-weight-bold">
                          {order.get_total} ₽
                        </span>
                      </div>
                    </div>

                    <div className="row mx-1">
                      <div className="col px-1 my-1">
                        <Link href={`/checkout`}>
                          <a className="btn btn-primary btn-block btn-pill transition-3d-hover">
                            Продолжить
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* End Order Summary */}

                  {/* Accordion */}
                  <div
                    id="shopCartAccordion"
                    className="accordion card shadow-soft mb-4"
                  >
                    {/* Card */}
                    <div className="card rounded">
                      <div
                        className="card-header card-collapse"
                        id="shopCartHeadingOne"
                      >
                        <h3 className="mb-0">
                          <a
                            className="btn btn-link btn-block card-btn font-weight-bold collapsed"
                            role="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#shopCartOne"
                            aria-expanded="false"
                            aria-controls="shopCartOne"
                          >
                            Промо-код?
                            <i
                              className="far fa-question-circle text-body ml-1"
                              data-bs-container="body"
                              data-bs-toggle="popover"
                              data-bs-placement="top"
                              data-bs-trigger="hover"
                              title="Промо-код"
                              data-bs-content="Действителен только для товаров по полной цене. Некоторые продукты, возможно исключены."
                            ></i>
                          </a>
                        </h3>
                      </div>
                      <div
                        id="shopCartOne"
                        className="collapse"
                        aria-labelledby="shopCartHeadingOne"
                        data-bs-parent="#shopCartAccordion"
                      >
                        {order.coupon ? (
                          <form className="p-4" onSubmit={RemoveCoupone}>
                            <div className="row">
                              <div className="col-sm mb-3 mb-sm-0">
                                <span className="text-dark font-weight-bold">
                                  {order.coupon.code}
                                </span>
                              </div>
                              <div className="col-sm-auto">
                                <button
                                  type="submit"
                                  className="btn btn-xs btn-white"
                                >
                                  <i className="fas fa-trash-alt mr-1"></i>{" "}
                                  Удалить
                                </button>
                              </div>
                            </div>
                          </form>
                        ) : (
                          <form className="p-4" onSubmit={AddCoupon}>
                            <div className="input-group input-group-pill mb-3">
                              <input
                                type="text"
                                className={`form-control ${
                                  code_error ? "is-invalid" : null
                                }`}
                                name="code"
                                value={code}
                                onChange={(e) => (
                                  setCode(e.target.value), setCodeError("")
                                )}
                                placeholder="Promo code"
                                aria-label="Promo code"
                              />
                              <div className="input-group-append">
                                <button
                                  type="submit"
                                  className="btn btn-block btn-primary btn-pill"
                                >
                                  Применить
                                </button>
                              </div>
                            </div>
                            <span className="text-danger font-size-1">
                              {code_error}
                            </span>
                          </form>
                        )}
                      </div>
                    </div>
                    {/* End Card */}
                  </div>
                  {/* End Accordion */}

                  {/* Help Link */}
                  <div className="media align-items-center">
                    <figure className="w-100 max-w-6rem mr-2">
                      <img
                        className="img-fluid"
                        src="/assets/svg/icons/icon-support.svg"
                        alt="SVG"
                      />
                    </figure>
                    <div className="media-body text-body small">
                      <span className="font-weight-bold mr-1">
                        Нужна помощь?
                      </span>
                      <a className="link-underline" href="#">
                        Связаться
                      </a>
                    </div>
                  </div>
                  {/* End Help Link */}
                </div>
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>
      )}
    </Layout>
  );
}
