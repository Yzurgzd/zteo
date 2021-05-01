import Link from "next/link";
import Layout from "../../components/layout";
import Router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import FilterEleement from "../../components/filterEleement";

export default function Products({ data, currentPage }) {
  const router = useRouter();

  async function handlePagination(page) {
    const path = router.pathname;
    const query = router.query;
    query.page = page.selected + 1;
    router.push({
      pathname: path,
      query: query,
    });
  }

  // const [loading, setLoading] = useState(false);
  // const startLoading = () => setLoading(true);
  // const stopLoading = () => setLoading(false);
  // useEffect(() => {
  //   // Router event handler
  //   Router.events.on("routeChangeStart", startLoading);
  //   Router.events.on("routeChangeComplete", stopLoading);
  //   return () => {
  //     Router.events.off("routeChangeStart", startLoading);
  //     Router.events.off("routeChangeComplete", stopLoading);
  //   };
  // }, []);

  return (
    <Layout title={`Категория ${data.results.category.name}`}>
      {/* Title Section */}
      <div className="bg-light">
        <div className="container py-5">
          <div className="row align-items-sm-center">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <h1 className="h4 mb-0">Сетка продуктов</h1>
            </div>

            <div className="col-sm-6">
              {/* Breadcrumb */}
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-no-gutter justify-content-sm-end mb-0">
                  <li className="breadcrumb-item">
                    <Link href={`/`}>
                      <a>Главная</a>
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href={`/categories`}>
                      <a>Категории</a>
                    </Link>
                  </li>
                  {data.results.category.parent ? (
                    <li className="breadcrumb-item">
                      <Link
                        href={`/category/[slug]`}
                        as={`/category/${data.results.category.parent.slug}`}
                      >
                        <a>{data.results.category.parent.name}</a>
                      </Link>
                    </li>
                  ) : null}
                  <li className="breadcrumb-item active" aria-current="page">
                    {data.results.category.name}
                  </li>
                </ol>
              </nav>
              {/* End Breadcrumb */}
            </div>
          </div>
        </div>
      </div>
      {/* End Title Section */}

      {/* Products & Filters Section */}
      <div className="container space-top-1 space-top-md-2 space-bottom-2 space-bottom-lg-3">
        <div className="row">
          <div className="col-lg-9">
            {/* Sorting */}
            <div className="row align-items-center mb-5">
              <div className="col-lg-6 mb-3 mb-lg-0">
                <span className="font-size-1 ml-1">{data.count} товара</span>
              </div>
            </div>
            {/* End Sorting */}

            {/* Products */}
            <div className="row mx-n2 mb-5">
              {data.results.products.map((product) => (
                <div
                  key={product.id}
                  className="col-sm-6 col-lg-4 px-2 px-sm-3 mb-3 mb-sm-5"
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
                          as={`/products/${product.category.slug}`}
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
                            ></i>
                            <i
                              className={`${
                                product.get_avg_rating < 2
                                  ? "text-muted far"
                                  : "fas"
                              } fa-star`}
                            ></i>
                            <i
                              className={`${
                                product.get_avg_rating < 3
                                  ? "text-muted far"
                                  : "fas"
                              } fa-star`}
                            ></i>
                            <i
                              className={`${
                                product.get_avg_rating < 4
                                  ? "text-muted far"
                                  : "fas"
                              } fa-star`}
                            ></i>
                            <i
                              className={`${
                                product.get_avg_rating < 5
                                  ? "text-muted far"
                                  : "fas"
                              } fa-star`}
                            ></i>
                          </div>
                          <span>{product.get_review_count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Product */}
                </div>
              ))}
            </div>
            {/* End Products */}

            {/* Pagination */}
            <nav aria-label="Page navigation">
              <ReactPaginate
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                previousLabel={
                  <>
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">Previous</span>
                  </>
                }
                nextLabel={
                  <>
                    <span aria-hidden="true">»</span>
                    <span className="sr-only">Next</span>
                  </>
                }
                breakLabel={"..."}
                pageClassName={"page-item"}
                breakClassName={"page-item"}
                nextClassName={"page-item"}
                previousClassName={"page-item"}
                pageLinkClassName={"page-link"}
                breakLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                previousLinkClassName={"page-link"}
                activeClassName={"active"}
                containerClassName={"pagination justify-content-center"}
                initialPage={currentPage - 1}
                pageCount={data.page_count}
                onPageChange={handlePagination}
              />
            </nav>
            {/* End Pagination */}

            {/* Divider */}
            <div className="d-lg-none">
              <hr className="my-7 my-sm-11" />
            </div>
            {/* End Divider */}
          </div>

          {/* Filters */}
          <div className="col-lg-3">
            <FilterEleement
              price_min={data.results.filters.price_range.price__min}
              price_max={data.results.filters.price_range.price__max}
              specifications={data.results.filters.specifications}
            />
          </div>
          {/* End Filters */}
        </div>
      </div>
      {/* End Products & Filters Section */}
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const price_min = query.price_min || "";
  const price_max = query.price_max || "";
  const specification = query.specification || [];

  const response = await fetch(
    `${process.env.API_URL}/products/${
      query.slug
    }/?page=${page}&price_min=${price_min}&price_max=${price_max}${
      specification.length > 0 ? `&specification=${specification}` : ""
    }`
  );

  // const response = await fetch(
  //   `${process.env.API_URL}/category/${query.slug}/?page=${page}&price_min=${price_min}&price_max=${price_max}&specification=${specification}`
  // );

  // if (!response.ok) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/",
  //     },
  //   };
  // }

  const data = await response.json();
  return { props: { data, currentPage: page } };
}
