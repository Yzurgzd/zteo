import Layout from "../components/layout";
import {
  YMaps,
  Map,
  Placemark,
  GeolocationControl,
  ZoomControl,
} from "react-yandex-maps";

export default function Contact() {
  return (
    <Layout>
      <div className="container space-top-2 space-top-lg-3 space-bottom-2">
        <div className="row">
          <div className="col-lg-6 mb-9 mb-lg-0">
            <div className="mb-5">
              <h1>Контакты</h1>
            </div>

            {/* Leaflet */}
            <div className="mb-5">
              <YMaps>
                <Map
                  defaultState={{
                    center: [55.723562, 52.541167],
                    zoom: 16,
                  }}
                  width="auto"
                  height={300}
                >
                  <Placemark geometry={[55.723562, 52.541167]} />
                  <GeolocationControl options={{ float: "left" }} />
                  <ZoomControl options={{ float: "right" }} />
                </Map>
              </YMaps>
            </div>
            {/* End Leaflet */}

            <div className="row">
              <div className="col-sm-6">
                <div className="mb-3">
                  <span className="d-block h5 mb-1">
                    Технический директор Шакиров Камил Киаметдинович:
                  </span>
                  <span className="d-block text-body font-size-1">
                    (8552) 20-20-10
                  </span>
                </div>
                <div className="mb-3">
                  <span className="d-block h5 mb-1">
                    Главный инженер Шарифуллин Фаниль Фахрутдинович:
                  </span>
                  <span className="d-block text-body font-size-1">
                    (8552) 20-21-11
                  </span>
                </div>
                <div className="mb-3">
                  <span className="d-block h5 mb-1">
                    Коммерческий директор Мубаракшин Марат Мансурович:
                  </span>
                  <span className="d-block text-body font-size-1">
                    (8552) 20-20-39
                  </span>
                </div>
                <div className="mb-3">
                  <span className="d-block h5 mb-1">
                    Заместитель коммерческого директора по маркетингу и сбыту
                    Ханнанов Нияз Рустямович:
                  </span>
                  <span className="d-block text-body font-size-1">
                    (8552) 20-21-16, 20-20-00
                  </span>
                </div>
                <div className="mb-3">
                  <span className="d-block h5 mb-1">
                    Начальник отдела сбыта Насыбуллина Алия Ягфаровна:
                  </span>
                  <span className="d-block text-body font-size-1">
                    (8552) 20-21-40
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-5">
            <div className="card bg-white position-relative z-index-999 p-5 p-sm-7">
              <div className="mb-5">
                <span className="d-block font-size-2 text-dark text-lh-sm">
                  Республика Татарстан,
                </span>
                <span className="d-block font-size-4 text-dark font-weight-bold text-lh-sm">
                  Набережные Челны
                </span>
              </div>

              {/* Contacts */}
              <div className="media mb-5">
                <span className="icon icon-xs icon-soft-primary icon-circle mr-3">
                  <i className="fas fa-phone"></i>
                </span>
                <div className="media-body">
                  <h5 className=" mb-1">
                    Управляющий ЗАО "ПТФК "ЗТЭО" Мухаметшин Рамиз Басимович
                  </h5>
                  <span className="d-block text-body font-size-1">
                    (8552) 20-20-22
                  </span>
                </div>
              </div>
              {/* End Contacts */}

              {/* Contacts */}
              <div className="media mb-5">
                <span className="icon icon-xs icon-soft-primary icon-circle mr-3">
                  <i className="fas fa-envelope"></i>
                </span>
                <div className="media-body text-truncate">
                  <h5 className=" mb-1">Электронная почта</h5>
                  <span className="d-block text-body font-size-1">
                    pk@zteo.ru
                  </span>
                </div>
              </div>
              {/* End Contacts */}

              {/* Contacts */}
              <div className="media">
                <span className="icon icon-xs icon-soft-primary icon-circle mr-3">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                <div className="media-body">
                  <h5 className=" mb-1">Адрес</h5>
                  <span className="d-block text-body font-size-1">
                    ул. Моторная, 38, а/я 183
                  </span>
                </div>
              </div>
              {/* End Contacts */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
