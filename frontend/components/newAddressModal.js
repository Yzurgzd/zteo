import Cookies from "js-cookie";
import { useState } from "react";
import { useAlert } from "react-alert";

export default function NewAddressModal({ mutate }) {
  const [region, setRegion] = useState("");
  const [town, setTown] = useState("");
  const [apartment, setApartment] = useState("");
  const [postal, setPostal] = useState("");
  const [default_address, setDefaultAddress] = useState(false);

  const [region_error, setRegionError] = useState("");
  const [town_error, setTownError] = useState("");
  const [apartment_error, setApartmentError] = useState("");
  const [postal_error, setPostalError] = useState("");

  const alert = useAlert();

  async function addAddressSubmit(e) {
    e.preventDefault();

    var myModal = await bootstrap.Modal.getInstance(
      document.getElementById("addNewAddressModal")
    );

    const createApi = await fetch(`${process.env.API_URL}/user/address/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + Cookies.get("token"),
      },
      body: JSON.stringify({
        region,
        town,
        apartment,
        postal,
        default: default_address,
      }),
    });

    if (createApi.ok) {
      myModal.toggle();
      mutate();
      setRegion("");
      setTown("");
      setApartment("");
      setPostal("");
      setDefaultAddress(false);

      alert.success("Новый адрес добавлен успешно");
    } else {
      const result = await createApi.json();

      setRegionError(result.region);
      setTownError(result.town);
      setApartmentError(result.apartment);
      setPostalError(result.postal);
    }
  }

  return (
    <>
      {/* Add New Address Modal */}
      <div
        className="modal fade"
        id="addNewAddressModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        aria-labelledby="addNewAddressModalTitle"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h4 id="addNewAddressModalTitle" className="modal-title">
                Добавить адрес
              </h4>
              <div className="modal-close">
                <button
                  type="button"
                  className="btn btn-icon btn-xs btn-ghost-secondary"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
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
                </button>
              </div>
            </div>
            {/* End Header */}

            {/* Body */}
            <div className="modal-body">
              <form onSubmit={addAddressSubmit}>
                {/* Form Group */}
                <div className="row form-group">
                  <label
                    htmlFor="locationLabel"
                    className="col-sm-3 col-form-label input-label"
                  >
                    Местоположение
                  </label>

                  <div className="col-sm-9">
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control ${
                          region_error ? "is-invalid" : null
                        }`}
                        name="region"
                        value={region}
                        onChange={(e) => (
                          setRegion(e.target.value), setRegionError("")
                        )}
                        id="regionLabel"
                        placeholder="Регион"
                        aria-label="Регион"
                      />
                      {region_error ? (
                        <span className="text-danger font-size-1">
                          {region_error}
                        </span>
                      ) : null}
                    </div>
                    <input
                      type="text"
                      className={`form-control ${
                        town_error ? "is-invalid" : null
                      }`}
                      name="town"
                      value={town}
                      onChange={(e) => (
                        setTown(e.target.value), setTownError("")
                      )}
                      id="townLabel"
                      placeholder="Город или населённый пункт"
                      aria-label="Город или населённый пункт"
                    />
                    {town_error ? (
                      <span className="text-danger font-size-1">
                        {town_error}
                      </span>
                    ) : null}
                  </div>
                </div>
                {/* End Form Group */}

                {/* Form Group */}
                <div className="row form-group">
                  <label
                    htmlFor="addressLineLabel"
                    className="col-sm-3 col-form-label input-label"
                  >
                    Строка адреса
                  </label>

                  <div className="col-sm-9">
                    <input
                      type="text"
                      className={`form-control ${
                        apartment_error ? "is-invalid" : null
                      }`}
                      name="apartment"
                      value={apartment}
                      onChange={(e) => (
                        setApartment(e.target.value), setApartmentError("")
                      )}
                      id="addressLineLabel"
                      placeholder="Улица, дом/квартира/блок"
                      aria-label="Улица, дом/квартира/блок"
                    />
                    {apartment_error ? (
                      <span className="text-danger font-size-1">
                        {apartment_error}
                      </span>
                    ) : null}
                  </div>
                </div>
                {/* End Form Group */}

                {/* Form Group */}
                <div className="row form-group">
                  <label
                    htmlFor="zipCodeLabel"
                    className="col-sm-3 col-form-label input-label"
                  >
                    Почтовый индекс{" "}
                    <i
                      className="far fa-question-circle text-body ml-1"
                      data-bs-toggle="tooltip"
                      data-placement="top"
                      title="You can find your code in a postal address."
                    ></i>
                  </label>

                  <div className="col-sm-9">
                    <input
                      type="text"
                      className={`form-control ${
                        postal_error ? "is-invalid" : null
                      }`}
                      name="postal"
                      value={postal}
                      onChange={(e) => (
                        setPostal(e.target.value), setPostalError("")
                      )}
                      id="zipCodeLabel"
                      placeholder="Ваш почтовый индекс"
                      aria-label="Ваш почтовый индекс"
                    />
                    {postal_error ? (
                      <span className="text-danger font-size-1">
                        {postal_error}
                      </span>
                    ) : null}
                  </div>
                </div>
                {/* End Form Group */}

                <div className="custom-control custom-checkbox form-group">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    name="default_address"
                    value={default_address}
                    onChange={(e) => setDefaultAddress(e.target.value)}
                    id="makeDefaultAddressCheckbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="makeDefaultAddressCheckbox"
                  >
                    Сделать этот адрес по умолчанию
                  </label>
                </div>

                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-white mr-2"
                    data-bs-dismiss="modal"
                  >
                    Закрыть
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Добавить
                  </button>
                </div>
              </form>
            </div>
            {/* End Body */}
          </div>
        </div>
      </div>
      {/* End Add New Address Modal */}
    </>
  );
}
