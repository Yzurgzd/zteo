import Cookies from "js-cookie";
import useSWR from "swr";
import { useUser, fetchWithToken } from "../utils/auth";
import { useState } from "react";
import NewAddressModal from "./newAddressModal";
import OrderCompleted from "./orderCompleted";
import Link from "next/link";
import Router from "next/router";
import { useAlert } from "react-alert";
import LoadingElement from "./loadingElement";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Skeleton from "react-loading-skeleton";

export default function CheckoutElement() {
  const alert = useAlert();
  const token = Cookies.get("token");

  const stripe = useStripe();
  const elements = useElements();

  const { data, error: addressesError, mutate } = useSWR(
    [`${process.env.API_URL}/user/address/`, token],
    fetchWithToken
  );

  const [address, setAddress] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const cardElement = elements.getElement(CardElement);

    stripe.createToken(cardElement).then(async (result) => {
      setLoadingSubmit(true);
      if (result.token) {
        const payApi = await fetch(`${process.env.API_URL}/payment/`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `JWT ${token}`,
          },
          body: JSON.stringify({
            address: address || data.default_id,
            stripeToken: result.token.id,
          }),
        });
        if (await payApi.ok) {
          alert.success("Оплата прошла успешна");
          Router.replace("/cart");
        } else {
          const error = await payApi.json();
          alert.error(error.message);
        }
      }
      setLoadingSubmit(false);
    });
  }

  const loadingAddresses = !(data || data === null) && !addressesError;

  return (
    <>
      {loadingSubmit ? (
        <LoadingElement />
      ) : (
        <form onSubmit={handleSubmit}>
          {/* csrf_token */}
          <div className="border-bottom pb-7 mb-7">
            {/* Title */}
            <div className="mb-4">
              <h2 className="h3">Адрес доставки</h2>
            </div>
            {/* End Title */}
            {/* Billing Form */}
            <div className="row">
              {loadingAddresses ? (
                <>
                  <div className="col-sm-6 mb-5 mb-sm-7">
                    <Skeleton className="h5" width={270} height={22} />
                    <div className="d-block mb-2">
                      <Skeleton count={4} width={270} height={22} />
                    </div>
                    <div className="d-flex">
                      <Skeleton width={91} height={30} />
                    </div>
                  </div>
                  <div className="col-sm-6 mb-5 mb-sm-7">
                    <Skeleton className="h5" width={270} height={22} />
                    <div className="d-block mb-2">
                      <Skeleton count={4} width={270} height={22} />
                    </div>
                    <div className="d-flex">
                      <Skeleton width={91} height={30} />
                    </div>
                  </div>
                  <div className="col-sm-6 mb-5 mb-sm-7">
                    <Skeleton className="h5" width={270} height={22} />
                    <div className="d-block mb-2">
                      <Skeleton count={4} width={270} height={22} />
                    </div>
                    <div className="d-flex">
                      <Skeleton width={91} height={30} />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {data ? (
                    <>
                      {data.address.map((address, index) => (
                        <div key={address.id} className="col-sm-6 mb-5 mb-sm-7">
                          {/* Radio Checkbox */}
                          <div className="custom-control custom-radio custom-control-inline w-100 h-100">
                            <input
                              type="radio"
                              id={`billingRadio${index}`}
                              name="address"
                              className="custom-control-input"
                              onChange={(e) => setAddress(e.target.value)}
                              value={address.id}
                              defaultChecked={address.default}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={`billingRadio${index}`}
                            >
                              <span className="h5 d-block">
                                Адрес доставки #{index + 1}
                              </span>

                              <span className="d-block mb-2">
                                {address.region}
                                <br />
                                {address.town}
                                <br />
                                {address.apartment}
                                <br />
                                {address.postal}
                                <br />
                              </span>

                              <Link href={`/account/address`}>
                                <a className="btn btn-xs btn-white">
                                  <i className="fas fa-pencil-alt mr-1"></i>{" "}
                                  Изменить адрес
                                </a>
                              </Link>
                            </label>
                          </div>
                          {/* End Radio Checkbox */}
                        </div>
                      ))}
                    </>
                  ) : null}

                  <div className="col-sm-6 mb-5 mb-sm-7">
                    {/* Card */}
                    <a
                      className="card card-dashed"
                      type="submit"
                      data-bs-toggle="modal"
                      data-bs-target="#addNewAddressModal"
                    >
                      <div className="card-body card-body-centered card-dashed-body">
                        <i className="fas fa-building fa-lg mb-2"></i>
                        Добавить новый адрес
                      </div>
                    </a>
                    {/* End Card */}
                  </div>
                </>
              )}
            </div>
            {/* End Billing Form */}
          </div>

          {/* Payment */}
          <div className="mb-7">
            {/* Title */}
            <div className="mb-4">
              <h2 className="h3">Оплата</h2>
            </div>
            {/* End Title */}

            {/* Input */}
            <CardElement
              className="mb-7"
              options={{
                style: {
                  base: {
                    color: "#303238",
                    fontSize: "16px",
                    fontFamily: '"Open Sans", sans-serif',
                    fontSmoothing: "antialiased",
                    "::placeholder": {
                      color: "#CFD7DF",
                    },
                  },
                  invalid: {
                    color: "#ed4c78",
                    ":focus": {
                      color: "#ed4c78",
                    },
                  },
                },
              }}
            />
            {/* End Input */}

            {/* Button */}
            <div className="d-flex justify-content-between align-items-center">
              <Link href={`/cart`}>
                <a className="font-weight-bold">
                  <i className="fas fa-angle-left fa-xs mr-1"></i>
                  Вернуться в корзину
                </a>
              </Link>
              <button
                type="submit"
                className="btn btn-primary btn-pill transition-3d-hover"
              >
                Оплатить
              </button>
            </div>
            {/* End Button */}
          </div>
          {/* End Payment */}
        </form>
      )}
      <NewAddressModal mutate={mutate} />
    </>
  );
}
