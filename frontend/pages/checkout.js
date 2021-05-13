import Cookies from "js-cookie";
import useSWR from "swr";
import { useUser, fetchWithToken } from "../utils/auth";
import Router from "next/router";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutElement from "../components/checkoutElement";
import EmptyCart from "../components/emptyCart";
import { useEffect } from "react";
import Layout from "../components/layout";
import LoadingElement from "../components/loadingElement";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import FeedbackModel from "../components/feedbackModel";

export default function Checkout() {
  const token = Cookies.get("token");

  const { data: order, mutate, error: orderError } = useSWR(
    [`${process.env.API_URL}/order/`, token],
    fetchWithToken
  );
  const loadingOrder = !(order || order === null) && !orderError;

  const { loggedOut } = useUser();

  const stripePromise = loadStripe(
    "pk_test_51IXQQMG0kz5gTu2UCi92QFE09SQdBKvJXZlaFkqvj50cJLrPtHPDEuxtoJaSljhBDHwu2mSVNQnmFRgvwN625QtD00v99ob8w9"
  );

  useEffect(() => {
    if (loggedOut) {
      Router.replace("/");
    }
  }, [loggedOut]);
  if (loggedOut) return <LoadingElement />;

  return (
    <Layout title={`Информация о заказе`}>
      {loadingOrder ? (
        <LoadingElement />
      ) : (
        <div className="container space-1 space-md-2">
          {order ? (
            <div className="row">
              <div className="col-lg-4 order-lg-2 mb-7 mb-lg-0">
                <div className="pl-lg-4">
                  {/* Order Summary */}
                  <div className="card shadow-soft p-4 mb-4">
                    {/* Title */}
                    <div className="border-bottom pb-4 mb-4">
                      <h2 className="h3 mb-0">Итог заказа</h2>
                    </div>
                    {/* End Title */}

                    {/* Product Content */}
                    {order.products.map((cart) => (
                      <div key={cart.id} className="border-bottom pb-4 mb-4">
                        <div className="media">
                          <div className="avatar avatar-lg mr-3">
                            <img
                              className="avatar-img"
                              src={cart.product.poster}
                              alt="Image Description"
                            />
                            <sup className="avatar-status avatar-primary">
                              {cart.quantity}
                            </sup>
                          </div>
                          <div className="media-body">
                            <h2 className="h6">{cart.product.name}</h2>
                            <div className="text-body font-size-1">
                              <span>Код товара:</span>
                              <span>{cart.product.article}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* End Product Content */}

                    {/* Fees */}
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
                              defaultChecked
                            />
                            <label
                              className="custom-control-label ml-1"
                              htmlFor="deliveryRadio1"
                            >
                              <span className="d-block font-size-1 font-weight-bold mb-1">
                                Бесплатно - Стандартная доставка
                              </span>
                              <span className="d-block text-muted">
                                Доставка может занять 30-90 рабочих дней.
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
                    {/* End Fees */}

                    {/* Total */}
                    <div className="media align-items-center">
                      <span className="d-block font-size-1 mr-3">Итог</span>
                      <div className="media-body text-right">
                        <span className="text-dark font-weight-bold">
                          {order.get_total} ₽
                        </span>
                      </div>
                    </div>
                    {/* End Total */}
                  </div>
                  {/* End Order Summary */}

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
                      <a
                        className="link-underline"
                        type="submit"
                        data-bs-toggle="modal"
                        data-bs-target="#feedbackModal"
                      >
                        Связаться
                      </a>
                    </div>
                  </div>
                  {/* End Help Link */}
                </div>
              </div>

              <div className="col-lg-8 order-lg-1">
                <Elements stripe={stripePromise}>
                  <CheckoutElement />
                </Elements>
              </div>
            </div>
          ) : (
            <EmptyCart />
          )}
        </div>
      )}
      <FeedbackModel />
    </Layout>
  );
}
