import Link from "next/link";
import React from "react";
import Layout from "../components/layout";

export default function Home({ categories }) {
  return (
    <Layout>
      {/* Hero Section */}
      <div
        id="carouselExampleIndicators"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="/assets/img/others/baner3.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="/assets/img/others/baner4.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="/assets/img/others/baner5.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="/assets/img/others/baner7.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      {/* End Hero Section */}

      {/* Features Section */}
      <div className="border-bottom">
        <div className="container space-2">
          <div className="row">
            <div className="col-md-4 mb-7 mb-md-0">
              {/* Contacts */}
              <div className="media">
                <figure className="w-100 max-w-8rem mr-4">
                  <img
                    className="img-fluid"
                    src="/assets/svg/icons/icon-support.svg"
                    alt="SVG"
                  />
                </figure>
                <div className="media-body">
                  <h4 className="mb-1">Поддержка 24/7</h4>
                  <p className="font-size-1 mb-0">
                    Свяжитесь с нами 24 часа в сутки, 7 дней в неделю.
                  </p>
                </div>
              </div>
              {/* End Contacts */}
            </div>

            <div className="col-md-4 mb-7 mb-md-0">
              {/* Contacts */}
              <div className="media">
                <figure className="w-100 max-w-8rem mr-4">
                  <img
                    className="img-fluid"
                    src="/assets/svg/icons/icon-return.svg"
                    alt="SVG"
                  />
                </figure>
                <div className="media-body">
                  <h4 className="mb-1">14 дней возврата</h4>
                  <p className="font-size-1 mb-0">
                    Мы предлагаем вам полный возврат средств в течение 14 дней с
                    момента покупки.
                  </p>
                </div>
              </div>
              {/* End Contacts */}
            </div>

            <div className="col-md-4">
              {/* Contacts */}
              <div className="media">
                <figure className="w-100 max-w-8rem mr-4">
                  <img
                    className="img-fluid"
                    src="/assets/svg/icons/icon-shipping.svg"
                    alt="SVG"
                  />
                </figure>
                <div className="media-body">
                  <h4 className="mb-1">Бесплатная доставка</h4>
                  <p className="font-size-1 mb-0">
                    Получите бесплатную доставку по каждому заказу.
                  </p>
                </div>
              </div>
              {/* End Contacts */}
            </div>
          </div>
        </div>
      </div>
      {/* End Features Section */}

      {categories.length > 0 ? (
        <React.Fragment key={categories.id}>
          {categories.map((category) => (
            <React.Fragment key={category.id}>
              {/* Products Section */}
              {category.get_products.length > 0 ? (
                <div className="container space-2 space-lg-3">
                  {/* Title */}
                  <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
                    <h2>Топ рейтинг {category.name}</h2>
                  </div>
                  {/* End Title */}

                  {/* Products */}
                  <div className="row mx-n2 mx-sm-n3 mb-3">
                    {category.get_products.map((product) => (
                      <div
                        key={product.id}
                        className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5"
                      >
                        {/* Product */}
                        <div className="card border shadow-none text-center h-100">
                          <div className="position-relative py-3">
                            <img
                              className="img-fluid"
                              src={product.poster}
                              width={280}
                              alt="Image Description"
                            />
                            {product.discount_price ? (
                              <div className="position-absolute top-0 left-0 pt-3 pl-3">
                                <span className="badge badge-danger badge-pill">
                                  Скидка
                                </span>
                              </div>
                            ) : null}
                          </div>

                          <div className="card-body pt-4 px-4 pb-0">
                            <div className="mb-2">
                              <Link
                                href={`/products/[slug]`}
                                as={`/products/${category.slug}`}
                              >
                                <a className="d-inline-block text-body small font-weight-bold mb-1">
                                  {product.category.name}
                                </a>
                              </Link>
                              <span className="d-block font-size-1">
                                <Link
                                  href={`/product/[slug]`}
                                  as={`/product/${product.slug}`}
                                >
                                  <a className="text-inherit">{product.name}</a>
                                </Link>
                              </span>
                              <div className="d-block">
                                {product.discount_price ? (
                                  <>
                                    <span className="text-dark font-weight-bold">
                                      {product.discount_price} ₽
                                    </span>
                                    <span className="text-body ml-2">
                                      <del>{product.price} ₽</del>
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-dark font-weight-bold">
                                    {product.price} ₽
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="card-footer border-0 pt-0 pb-4 px-4">
                            <div className="mb-3">
                              <div className="d-inline-flex align-items-center small">
                                <div className="text-warning mr-2">
                                  <i
                                    className={`${
                                      product.get_avg_rating < 1
                                        ? "text-muted far"
                                        : "fas"
                                    } fa-star`}
                                  />
                                  <i
                                    className={`${
                                      product.get_avg_rating < 2
                                        ? "text-muted far"
                                        : "fas"
                                    } fa-star`}
                                  />
                                  <i
                                    className={`${
                                      product.get_avg_rating < 3
                                        ? "text-muted far"
                                        : "fas"
                                    } fa-star`}
                                  />
                                  <i
                                    className={`${
                                      product.get_avg_rating < 4
                                        ? "text-muted far"
                                        : "fas"
                                    } fa-star`}
                                  />
                                  <i
                                    className={`${
                                      product.get_avg_rating < 5
                                        ? "text-muted far"
                                        : "fas"
                                    } fa-star`}
                                  />
                                </div>
                                <span>{product.review_count}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* End Product */}
                      </div>
                    ))}
                  </div>
                  {/* End Products */}

                  <div className="text-center">
                    <Link
                      href={`/products/[slug]`}
                      as={`/products/${category.slug}`}
                    >
                      <a className="btn btn-primary btn-pill transition-3d-hover px-5">
                        Посмотреть {category.name}
                      </a>
                    </Link>
                  </div>
                </div>
              ) : null}
              {/* End Products Section */}
            </React.Fragment>
          ))}
        </React.Fragment>
      ) : null}
      <div className="container space-2">
        <div className="row justify-content-between text-center">
          <div className="col-4 col-lg-2 mb-5 mb-lg-0">
            <div className="mx-3">
              <img
                className="max-w-11rem max-w-md-13rem mx-auto"
                src="/assets/img/clients-logo/Belaz-machinery-llc.png"
                alt="Image Description"
              />
            </div>
          </div>
          <div className="col-4 col-lg-2 mb-5 mb-lg-0">
            <div className="mx-3">
              <img
                className="max-w-11rem max-w-md-13rem mx-auto"
                src="/assets/img/clients-logo/Uralskiye_lokomotivy.png"
                alt="Image Description"
              />
            </div>
          </div>
          <div className="col-4 col-lg-2 mb-5 mb-lg-0">
            <div className="mx-3">
              <img
                className="max-w-11rem max-w-md-13rem mx-auto"
                src="/assets/img/clients-logo/Kartex.png"
                alt="Image Description"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.API_URL}/categories/`);
  const categories = await response.json();
  return {
    props: { categories },
  };
}
