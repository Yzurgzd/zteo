import Link from "next/link";
import Layout from "../components/layout";

export default function Custom404() {
  return (
    <Layout title={`404: Страница не найдена`}>
      <div
        className="d-lg-flex bg-img-hero-fixed"
        style={{
          backgroundImage: "url(/assets/svg/illustrations/error-404.svg)",
        }}
      >
        <div className="container d-lg-flex align-items-lg-center min-vh-lg-100 space-4">
          <div className="w-lg-60 w-xl-50">
            {/* Title */}
            <div className="mb-4">
              <img
                className="max-w-23rem mb-3"
                src="/assets/svg/illustrations/error-number-404.svg"
                alt="SVG Illustration"
              />
              <p className="lead">
                Ой! Похоже, вы перешли по плохой ссылке. <br /> Если вы
                считаете, что это наша проблема, <a href="#">сообщите нам.</a>
              </p>
            </div>
            {/* End Title */}

            <Link href={`/`}>
              <a className="btn btn-wide btn-primary transition-3d-hover">
                Вернуться на главную
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
