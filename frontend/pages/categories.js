import Link from "next/link";
import React from "react";
import Layout from "../components/layout";

export default function Category({ categories }) {
  return (
    <Layout>
      {/* Title Section */}
      <div className="bg-light">
        <div className="container py-5">
          <div className="row align-items-sm-center">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <h1 className="h4 mb-0">Категории</h1>
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
                  <li className="breadcrumb-item active" aria-current="page">
                    Категории
                  </li>
                </ol>
              </nav>
              {/* End Breadcrumb */}
            </div>
          </div>
        </div>
      </div>
      {/* End Title Section */}
      {/* Categories Section */}
      <div className="container space-2 space-lg-3">
        {/* Title */}
        <div className="w-md-80 w-lg-40 text-center mx-md-auto mb-5 mb-md-9">
          <h2>Покупайте по категориям</h2>
        </div>
        {/* End Title */}

        <div className="row">
          {categories.map((category) => (
            <React.Fragment key={category.id}>
              {!category.parent ? (
                <div className="col-md-4 mb-3">
                  {/* Card */}
                  <div className="card h-100 card-bordered shadow-none text-center d-block">
                    <div className="position-relative py-3">
                      <img
                        className="img-fluid"
                        src={category.poster}
                        width={280}
                        alt="Image Description"
                      />
                    </div>
                    <div className="card-footer py-4">
                      <h3
                        className={`${
                          category.get_min_price ? "mb-1" : "mb-3"
                        }`}
                      >
                        {category.name}
                      </h3>
                      {category.get_min_price ? (
                        <span className="d-block text-muted font-size-1 mb-3">
                          Начиная с {category.get_min_price} ₽
                        </span>
                      ) : null}
                      {category.get_children.length > 0 ? (
                        <Link href={`/category/${category.slug}`}>
                          <a className="btn btn-sm btn-outline-primary btn-pill transition-3d-hover px-5">
                            Подкатегории
                          </a>
                        </Link>
                      ) : null}
                      {category.get_products.length > 0 ? (
                        <>
                          <span className="mx-2"></span>
                          <Link
                            href={`/products/[slug]`}
                            as={`/products/${category.slug}`}
                          >
                            <a className="btn btn-sm btn-primary btn-pill transition-3d-hover px-5">
                              Товар
                            </a>
                          </Link>
                        </>
                      ) : null}
                    </div>
                  </div>
                  {/* End Card */}
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* End Categories Section */}
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
