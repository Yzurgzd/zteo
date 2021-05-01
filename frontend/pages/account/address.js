import AccountLayout from "../../components/accountLayout";
import useSWR from "swr";
import { fetchWithToken, useUser } from "../../utils/auth";
import LoadingElement from "../../components/loadingElement";
import Cookies from "js-cookie";
import NewAddressModal from "../../components/newAddressModal";
import { useEffect } from "react";
import Router from "next/router";
import Skeleton from "react-loading-skeleton";

export default function Address() {
  const { user, loadingUser, loggedOut } = useUser();

  const { data, error: addressesError, mutate } = useSWR(
    [`${process.env.API_URL}/user/address/`, Cookies.get("token")],
    fetchWithToken
  );

  const loadingAddresses = !(data || data === null) && !addressesError;

  async function deleteAddressOnClick(id) {
    const deleteApi = await fetch(
      `${process.env.API_URL}/user/address/delete/${id}/`,
      {
        method: "DELETE",
        headers: {
          Authorization: "JWT " + Cookies.get("token"),
        },
      }
    );

    if (deleteApi.ok) {
      mutate();
    }
  }

  async function setDefaultAddressOnClick(id) {
    const deleteApi = await fetch(
      `${process.env.API_URL}/user/address/set-default/${id}/`,
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
    <AccountLayout title={`Адрес`}>
      <>
        {/* Card */}
        <div className="card mb-3 mb-lg-5">
          {/* Header */}
          <div className="card-header">
            <h5 className="card-header-title">Мои адреса</h5>
          </div>
          {/* End Header */}

          {/* Body */}
          <div className="card-body">
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
                              id="billingRadio1"
                              name="billingRadio"
                              className="custom-control-input"
                              defaultChecked={address.default}
                              disabled
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="billingRadio1"
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
                              </span>
                              <div className="d-flex">
                                <a
                                  className="btn btn-xs btn-white"
                                  type="submit"
                                  onClick={() =>
                                    deleteAddressOnClick(address.id)
                                  }
                                >
                                  <i className="fas fa-trash-alt mr-1"></i>{" "}
                                  Удалить
                                </a>
                                {!address.default ? (
                                  <>
                                    <span className="mx-2" />
                                    <a
                                      className="btn btn-xs btn-white"
                                      type="submit"
                                      onClick={() =>
                                        setDefaultAddressOnClick(address.id)
                                      }
                                    >
                                      <i className="fas fa-check mr-1"></i> По
                                      умолчанию
                                    </a>
                                  </>
                                ) : null}
                              </div>
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
            {/* End Row */}
          </div>
          {/* End Body */}
        </div>
        {/* End Card */}
        <NewAddressModal mutate={mutate} />
      </>
    </AccountLayout>
  );
}
