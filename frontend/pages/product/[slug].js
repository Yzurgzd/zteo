import Link from "next/link";
import { useUser } from "../../utils/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import Rating from "react-rating";
import { useAlert } from "react-alert";
import Cookies from "js-cookie";
import Layout from "../../components/layout";
import FeedbackModel from "../../components/feedbackModel";
import Skeleton from "react-loading-skeleton";

export default function Product({ product }) {
  const alert = useAlert();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { user, loadingUser, loggedOut, mutate } = useUser();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function onClickAddToCart() {
    const addToCartApi = await fetch(`${process.env.API_URL}/cart/add/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + Cookies.get("token"),
      },
      body: JSON.stringify({
        quantity: 1,
        slug: product.slug,
      }),
    });

    if (addToCartApi.status === 200) {
      mutate();
      alert.success("Товар был успешно добавлен в корзину");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const reviewApi = await fetch(
      `${process.env.API_URL}/product/${product.slug}/review/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + Cookies.get("token"),
        },
        body: JSON.stringify({
          comment: comment,
          rating: rating,
        }),
      }
    );

    if (reviewApi.status < 300) {
      refreshData();
    }

    setRating(0);
    setComment("");
  }

  let addToCartElement = null;
  if (loadingUser) {
    addToCartElement = (
      <Skeleton style={{ borderRadius: "6.1875rem" }} height={51} />
    );
  }
  if (user) {
    addToCartElement = (
      <button
        onClick={onClickAddToCart}
        className="btn btn-block btn-primary btn-pill"
      >
        Добавить в корзину
      </button>
    );
  }
  if (loggedOut) {
    addToCartElement = (
      <button
        onClick={() =>
          alert.error("Необходимо авторизоваться для добавления в корзину")
        }
        className="btn btn-block btn-primary btn-pill"
      >
        Добавить в корзину
      </button>
    );
  }

  let profile = null;
  if (loadingUser) {
    profile = <Skeleton height={51} />;
  }
  if (user) {
    profile = (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="input-label" htmlFor="exampleFormControlTextarea1">
            Оставить отзыв
          </label>
          <Rating
            emptySymbol={<i className="text-muted far fa-star"></i>}
            fullSymbol={<i className="text-warning fas fa-star"></i>}
            initialRating={rating}
            onChange={setRating}
          />
          <textarea
            id="exampleFormControlTextarea1"
            className="form-control"
            name="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ваш комментарий"
            rows="4"
          ></textarea>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary btn-wide transition-3d-hover"
          >
            Отправить
          </button>
        </div>
      </form>
    );
  }
  if (loggedOut) {
    profile = (
      <div className="alert alert-secondary" role="alert">
        Вам нужно зарегистрироваться чтобы оставить отзыв!
      </div>
    );
  }

  return (
    <Layout title={`Купить ${product.name}`}>
      {/* Hero Section */}
      <div className="container space-top-1 space-top-sm-2">
        <div className="row">
          <div className="col-lg-7 mb-7 mb-lg-0">
            <div className="position-relative text-center py-3">
              <img
                className="img-fluid"
                src={product.poster}
                width={420}
                alt="Image Description"
              />
            </div>
          </div>

          {/* Product Description */}
          <div className="col-lg-5">
            {/* Rating */}
            <div className="d-flex align-items-center small mb-2">
              <div className="text-warning mr-2">
                <i
                  className={`${
                    product.get_avg_rating < 1 ? "text-muted far" : "fas"
                  } fa-star`}
                />
                <i
                  className={`${
                    product.get_avg_rating < 2 ? "text-muted far" : "fas"
                  } fa-star`}
                />
                <i
                  className={`${
                    product.get_avg_rating < 3 ? "text-muted far" : "fas"
                  } fa-star`}
                />
                <i
                  className={`${
                    product.get_avg_rating < 4 ? "text-muted far" : "fas"
                  } fa-star`}
                />
                <i
                  className={`${
                    product.get_avg_rating < 5 ? "text-muted far" : "fas"
                  } fa-star`}
                />
              </div>
              <a className="link-underline" href="#reviewSection">
                Прочитать {product.get_review_count} отзыва
              </a>
            </div>
            {/* End Rating */}

            {/* Title */}
            <div className="mb-5">
              <h1 className="h2">{product.name}</h1>
            </div>
            {/* End Title */}

            {/* Price */}
            <div className="mb-5">
              <h2 className="font-size-1 text-body mb-0">
                Итоговая цена предоплаты:
              </h2>
              {product.discount_price ? (
                <>
                  <span className="text-dark font-size-2 font-weight-bold">
                    {product.discount_price} ₽
                  </span>
                  <span className="text-body ml-2">
                    <del>{product.price} ₽</del>
                  </span>
                </>
              ) : (
                <span className="text-dark font-size-2 font-weight-bold">
                  {product.price} ₽
                </span>
              )}
            </div>
            {/* End Price */}

            {/* Accordion */}
            <div id="shopCartAccordion" className="accordion mb-5">
              {/* Card */}
              <div className="card border shadow-none">
                <div
                  className="card-body card-collapse"
                  id="shopCardHeadingOne"
                >
                  <a
                    className="btn btn-link btn-block card-btn collapsed"
                    role="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#shopCardOne"
                    aria-expanded="false"
                    aria-controls="shopCardOne"
                  >
                    <span className="row align-items-center">
                      <span className="col-9">
                        <span className="media align-items-center">
                          <span className="w-100 max-w-6rem mr-3">
                            <img
                              className="img-fluid"
                              src="/assets/svg/icons/icon-shipping.svg"
                              alt="SVG"
                            />
                          </span>
                          <span className="media-body">
                            <span className="d-block font-size-1 font-weight-bold">
                              Быстрая доставка
                            </span>
                          </span>
                        </span>
                      </span>
                      <span className="col-3 text-right">
                        <span className="card-btn-toggle">
                          <span className="card-btn-toggle-default">+</span>
                          <span className="card-btn-toggle-active">−</span>
                        </span>
                      </span>
                    </span>
                  </a>
                </div>
                <div
                  id="shopCardOne"
                  className="collapse"
                  aria-labelledby="shopCardHeadingOne"
                  data-bs-parent="#shopCartAccordion"
                >
                  <div className="card-body">
                    <p className="small mb-0">
                      Мы предлагаем быструю доставку в любую точку России.
                      Квалифицированная команда доставки доставит товар к вам.
                    </p>
                  </div>
                </div>
              </div>
              {/* End Card */}

              {/* Card */}
              <div className="card border shadow-none">
                <div
                  className="card-body card-collapse"
                  id="shopCardHeadingTwo"
                >
                  <a
                    className="btn btn-link btn-block card-btn collapsed"
                    role="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#shopCardTwo"
                    aria-expanded="false"
                    aria-controls="shopCardTwo"
                  >
                    <span className="row align-items-center">
                      <span className="col-9">
                        <span className="media align-items-center">
                          <span className="w-100 max-w-6rem mr-3">
                            <img
                              className="img-fluid"
                              src="/assets/svg/icons/icon-wallet.svg"
                              alt="SVG"
                            />
                          </span>
                          <span className="media-body">
                            <span className="d-block font-size-1 font-weight-bold">
                              Лушая цена
                            </span>
                          </span>
                        </span>
                      </span>
                      <span className="col-3 text-right">
                        <span className="card-btn-toggle">
                          <span className="card-btn-toggle-default">+</span>
                          <span className="card-btn-toggle-active">−</span>
                        </span>
                      </span>
                    </span>
                  </a>
                </div>
                <div
                  id="shopCardTwo"
                  className="collapse"
                  aria-labelledby="shopCardHeadingTwo"
                  data-bs-parent="#shopCartAccordion"
                >
                  <div className="card-body">
                    <p className="small mb-0">
                      Мы предлагаем вам лучшую цену на продукцию. Заботимся о
                      упаковке и доставке.
                    </p>
                  </div>
                </div>
              </div>
              {/* End Card */}
            </div>
            {/* End Accordion */}

            <div className="mb-4">{addToCartElement}</div>

            {/* Help Link */}
            <div className="media align-items-center">
              <span className="w-100 max-w-6rem mr-2">
                <img
                  className="img-fluid"
                  src="/assets/svg/icons/icon-support.svg"
                  alt="SVG"
                />
              </span>
              <div className="media-body text-body small">
                <span className="font-weight-bold mr-1">Нужна помощь?</span>
                {loggedOut ? (
                  <a
                    className="link-underline"
                    type="submit"
                    onClick={() =>
                      alert.error(
                        "Для обратной связи необходимо авторизоваться"
                      )
                    }
                  >
                    Связаться
                  </a>
                ) : (
                  <a
                    className="link-underline"
                    type="submit"
                    data-bs-toggle="modal"
                    data-bs-target="#feedbackModal"
                  >
                    Связаться
                  </a>
                )}
              </div>
            </div>
            {/* End Help Link */}
          </div>
          {/* End Product Description */}
        </div>
      </div>
      {/* End Hero Section */}

      {/* Product Description Section */}
      <div
        className="container space-top-2 space-lg-3"
        dangerouslySetInnerHTML={{
          __html: product.description,
        }}
      />
      {/* End Product Description Section */}

      <div className="container space-top-1">
        <div className="row mx-n2">
          {product.get_images.map((image) => (
            <div key={image.id} className="col-4 col-sm px-2 mb-3 mb-sm-0">
              <img
                className="img-fluid rounded"
                src={image.image}
                alt="Image Description"
              />
            </div>
          ))}
        </div>
      </div>

      {product.get_last_products.length > 0 ? (
        <>
          {/* Related Products Section */}
          <div className="container space-2 space-lg-3">
            {/* Title */}
            <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
              <h2>Новинка</h2>
            </div>
            {/* End Title */}

            <div className="row mx-n2 mx-sm-n3 mb-3">
              {product.get_last_products.map((last_product) => (
                <div
                  key={last_product.id}
                  className="col-sm-6 col-lg-3 px-2 px-sm-3 mb-3 mb-sm-5"
                >
                  {/* Product */}
                  <div className="card card-bordered shadow-none text-center h-100">
                    <div className="position-relative">
                      <img
                        className="card-img-top"
                        src={last_product.poster}
                        alt="Image Description"
                      />
                      {last_product.discount_price ? (
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
                          as={`/products/${last_product.category.slug}`}
                        >
                          <a className="d-inline-block text-body small font-weight-bold mb-1">
                            {last_product.category.name}
                          </a>
                        </Link>

                        <span className="d-block font-size-1">
                          <Link
                            href={`/product/[slug]`}
                            as={`/product/${last_product.slug}`}
                          >
                            <a className="text-inherit">{last_product.name}</a>
                          </Link>
                        </span>
                        <div className="d-block">
                          {last_product.discount_price ? (
                            <>
                              <span className="text-dark font-weight-bold">
                                {last_product.discount_price} ₽
                              </span>
                              <span className="text-body ml-2">
                                <del>{last_product.price} ₽</del>
                              </span>
                            </>
                          ) : (
                            <span className="text-dark font-weight-bold">
                              {last_product.price} ₽
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
                                last_product.get_avg_rating < 1
                                  ? "text-muted far"
                                  : "fas"
                              } fa-star`}
                            />
                            <i
                              className={`${
                                last_product.get_avg_rating < 2
                                  ? "text-muted far"
                                  : "fas"
                              } fa-star`}
                            />
                            <i
                              className={`${
                                last_product.get_avg_rating < 3
                                  ? "text-muted far"
                                  : "fas"
                              } fa-star`}
                            />
                            <i
                              className={`${
                                last_product.get_avg_rating < 4
                                  ? "text-muted far"
                                  : "fas"
                              } fa-star`}
                            />
                            <i
                              className={`${
                                last_product.get_avg_rating < 5
                                  ? "text-muted far"
                                  : "fas"
                              } fa-star`}
                            />
                          </div>
                          <span>{last_product.get_review_count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Product */}
                </div>
              ))}
            </div>
          </div>
          {/* End Related Products Section */}
        </>
      ) : null}

      {/* Review Section */}
      <div
        id="reviewSection"
        className="container space-bottom-2 space-bottom-lg-3"
      >
        <div className="row">
          <div className="col-lg-4 mb-7 mb-lg-0">
            <div className="border-bottom pb-4 mb-4">
              {/* Overall Rating Stats */}
              <div className="card bg-primary text-white p-4 mb-3">
                <div className="d-flex justify-content-center align-items-center">
                  <span className="display-4">{product.get_avg_rating}</span>
                  <div className="ml-3">
                    <div className="small">
                      <i
                        className={`${
                          product.get_avg_rating < 1 ? "far" : "fas"
                        } fa-star`}
                      />
                      <i
                        className={`${
                          product.get_avg_rating < 2 ? "far" : "fas"
                        } fa-star`}
                      />
                      <i
                        className={`${
                          product.get_avg_rating < 3 ? "far" : "fas"
                        } fa-star`}
                      />
                      <i
                        className={`${
                          product.get_avg_rating < 4 ? "far" : "fas"
                        } fa-star`}
                      />
                      <i
                        className={`${
                          product.get_avg_rating < 5 ? "far" : "fas"
                        } fa-star`}
                      />
                    </div>
                    <span>
                      <span className="font-weight-bold">
                        {product.get_review_count}
                      </span>{" "}
                      отзыва
                    </span>
                  </div>
                </div>
              </div>
              {/* End Overall Rating Stats */}
            </div>

            <span className="d-block display-4 text-dark">
              {product.get_recommend}%
            </span>
            <p className="small">клиентов рекомендуют этот продукт</p>
          </div>

          <div className="col-lg-8">
            <div className="pl-lg-4">
              {profile}

              {/* Review */}
              {product.get_reviews.map((review) => (
                <div key={review.id} className="border-top pt-5 mt-5">
                  <div className="row mb-2">
                    <div className="col-lg-4 mb-3 mb-lg-0">
                      {/* Review */}
                      <div className="media align-items-center">
                        <div className="avatar avatar-circle mr-3">
                          <img
                            className="avatar-img"
                            src={review.user.avatar}
                            alt="Image Description"
                          />
                        </div>
                        <div className="media-body">
                          <span className="d-block text-body font-size-1">
                            {review.date_added}
                          </span>
                          <h4 className="mb-0">{review.user.first_name}</h4>
                        </div>
                      </div>
                      {/* End Review */}
                    </div>

                    <div className="col-lg-8">
                      {/* Review Rating */}
                      <div className="d-flex justify-content-between align-items-center text-body font-size-1 mb-3">
                        <div className="text-warning">
                          <i
                            className={`${
                              review.rating < 1 ? "text-muted far" : "fas"
                            } fa-star`}
                          />
                          <i
                            className={`${
                              review.rating < 2 ? "text-muted far" : "fas"
                            } fa-star`}
                          />
                          <i
                            className={`${
                              review.rating < 3 ? "text-muted far" : "fas"
                            } fa-star`}
                          />
                          <i
                            className={`${
                              review.rating < 4 ? "text-muted far" : "fas"
                            } fa-star`}
                          />
                          <i
                            className={`${
                              review.rating < 5 ? "text-muted far" : "fas"
                            } fa-star`}
                          />
                        </div>
                      </div>
                      {/* End Review Rating */}

                      <p>{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
              {/* End Review */}
            </div>
          </div>
        </div>
      </div>
      {/* End Review Section */}
      <FeedbackModel />
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const response = await fetch(`${process.env.API_URL}/product/${query.slug}/`);
  const product = await response.json();
  return {
    props: { product },
  };
}
