import AccountLayout from "../../components/accountLayout";
import Cookies from "js-cookie";
import useSWR from "swr";
import { useUser, fetchWithToken } from "../../utils/auth";
import { useEffect, useState } from "react";
import Router from "next/router";
import LoadingElement from "../../components/loadingElement";
import EmptyStateElement from "../../components/emptyStateElement";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import Skeleton from "react-loading-skeleton";

export default function Orders() {
  const router = useRouter();
  const path = router.pathname;
  const query = router.query;

  const currentPage = query.page || 1;
  const delivered = query.delivered || "unknown";
  const received = query.received || "unknown";
  const search = query.search || "";

  const [search_text, setSearchText] = useState(query.search || "");

  const { data, mutate, error } = useSWR(
    [
      `${process.env.API_URL}/list-orders/?${
        currentPage > 1 ? `page=${currentPage}&` : null
      }delivered=${delivered}&received=${received}&search=${search}`,
      Cookies.get("token"),
    ],
    fetchWithToken
  );

  const loadingOrder = !(data || data === null) && !error;
  const { loggedOut } = useUser();

  async function handlePagination(page) {
    query.page = page.selected + 1;
    router.push({
      pathname: path,
      query: query,
    });
  }

  async function onClickFilter(filter) {
    if (filter === "all-orders-tab") {
      query.delivered = "unknown";
      query.received = "unknown";
    } else if (filter === "delivered-orders-tab") {
      query.delivered = "true";
      query.received = "false";
    } else if (filter === "cenceled-orders-tab") {
      query.delivered = "true";
      query.received = "true";
    }
    router.push({
      pathname: path,
      query: query,
    });
  }

  function handleSearch(e) {
    e.preventDefault();

    query.search = search_text;
    router.push({
      pathname: path,
      query: query,
    });
  }

  if (loggedOut) return <LoadingElement />;

  return (
    <AccountLayout
      title={`Ваши заказы
    `}
    >
      <div className="card">
        {/* Header */}
        <div className="card-header">
          <form
            onSubmit={handleSearch}
            className="input-group input-group-merge input-group-borderless"
          >
            <input
              type="search"
              className="form-control"
              placeholder="Поиск заказов"
              aria-label="Поиск заказов"
              name="search_text"
              value={search_text}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              <span className="fas fa-search"></span>
            </button>
          </form>
        </div>
        {/* End Header */}
        {/* Body */}
        <div className="card-body">
          {/* Nav */}
          <ul
            className="nav nav-segment nav-fill mb-5"
            id="editUserTab"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className={`nav-link ${
                  delivered && received === "unknown" ? "active" : null
                }`}
                id="all-orders-tab"
                type="submit"
                onClick={(e) => onClickFilter(e.target.id)}
                role="tab"
              >
                Все заказы
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  delivered === "true" && received === "false" ? "active" : null
                }`}
                id="delivered-orders-tab"
                type="submit"
                onClick={(e) => onClickFilter(e.target.id)}
                role="tab"
              >
                Доставлен
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  delivered && received === "true" ? "active" : null
                }`}
                id="cenceled-orders-tab"
                type="submit"
                onClick={(e) => onClickFilter(e.target.id)}
                role="tab"
              >
                Закрытые заказы
              </a>
            </li>
          </ul>
          {/* End Nav */}

          {/* Tab Content */}
          <div className="tab-content" id="editUserTabContent">
            <div className="tab-pane fade show active" role="tabpanel">
              <ul className="list-unstyled">
                {/* Card */}
                {loadingOrder ? (
                  <li className="card card-bordered shadow-none mb-3">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-6 col-md mb-3 mb-md-0">
                          <small className="text-cap">Итог</small>
                          <small className="text-dark font-weight-bold">
                            <Skeleton width={45} height={18} /> ₽
                          </small>
                        </div>
                        <div className="col-6 col-md mb-3 mb-md-0">
                          <small className="text-cap">Доставка в</small>
                          <small className="text-dark font-weight-bold">
                            <Skeleton width={140} height={18} />
                          </small>
                        </div>
                        <div className="col-6 col-md">
                          <small className="text-cap">№ Заказа</small>
                          <small className="text-dark font-weight-bold">
                            <Skeleton width={14} height={18} />
                          </small>
                        </div>
                        <div className="col-6 col-md">
                          <small className="text-cap">Дата заказа:</small>
                          <small className="text-dark font-weight-bold">
                            <Skeleton width={108} height={18} />
                          </small>
                        </div>
                      </div>
                      {/* End Row */}

                      <hr />

                      <div className="row">
                        <div className="col-md-8">
                          <h5>
                            <Skeleton width={150} height={22} />
                          </h5>

                          <div className="row mx-n1">
                            <div className="col px-1 max-w-19rem">
                              <Skeleton width={136} height={136} />
                            </div>
                          </div>
                          {/* End Row */}
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <>
                    {data.results.length > 0 ? (
                      <>
                        {data.results.map((order) => (
                          <li
                            key={order.id}
                            className="card card-bordered shadow-none mb-3"
                          >
                            <div className="card-body">
                              <div className="row">
                                <div className="col-6 col-md mb-3 mb-md-0">
                                  <small className="text-cap">Итог</small>
                                  <small className="text-dark font-weight-bold">
                                    {order.get_total} ₽
                                  </small>
                                </div>
                                <div className="col-6 col-md mb-3 mb-md-0">
                                  <small className="text-cap">Доставка в</small>
                                  <small className="text-dark font-weight-bold">
                                    {order.address.town}
                                  </small>
                                </div>
                                <div className="col-6 col-md">
                                  <small className="text-cap">№ Заказа</small>
                                  <small className="text-dark font-weight-bold">
                                    {order.id}
                                  </small>
                                </div>
                                <div className="col-6 col-md">
                                  <small className="text-cap">
                                    Дата заказа:
                                  </small>
                                  <small className="text-dark font-weight-bold">
                                    {order.ordered_date}
                                  </small>
                                </div>
                              </div>
                              {/* End Row */}

                              <hr />

                              <div className="row">
                                <div className="col-md-8">
                                  <h5>
                                    {order.received
                                      ? "Заказ получен"
                                      : order.delivered
                                      ? "Заказ доставлен"
                                      : "Ожидайте доставку заказа"}
                                  </h5>

                                  <div className="row mx-n1">
                                    {order.products.map((cart) => (
                                      <div
                                        key={cart.id}
                                        className="col px-1 max-w-19rem"
                                      >
                                        <img
                                          className="img-fluid"
                                          src={cart.product.poster}
                                          alt="Image Description"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                  {/* End Row */}
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </>
                    ) : (
                      <EmptyStateElement />
                    )}
                  </>
                )}
                {/* End Card */}
              </ul>

              {/* Pagination */}
              <nav
                className="d-flex justify-content-end mt-5"
                aria-label="Page navigation"
              >
                <ul className="pagination">
                  {loadingOrder ? (
                    <>
                      <Skeleton
                        className="page-item"
                        count={3}
                        width={36}
                        height={36}
                      />
                    </>
                  ) : (
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
                  )}
                </ul>
              </nav>
              {/* End Pagination */}
            </div>
          </div>
          {/* End Tab Content */}
        </div>
        {/* End Body */}
      </div>
    </AccountLayout>
  );
}
