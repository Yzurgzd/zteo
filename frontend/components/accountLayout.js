import Layout from "../components/layout";
import AccountSidebar from "../components/accountSidebar";

export default function AccountLayout({
  children,
  title = "Личная информация",
}) {
  return (
    <Layout title={title}>
      <div
        className="bg-dark"
        style={{
          backgroundImage: "url(/assets/svg/components/abstract-shapes-20.svg)",
        }}
      >
        <div className="container space-1 space-top-lg-2 space-bottom-lg-3">
          <div className="row align-items-center">
            <div className="col">
              <div className="d-none d-lg-block">
                <h1 className="h2 text-white">Личная информация</h1>
              </div>
            </div>

            <div className="col-auto">
              {/* Responsive Toggle Button */}
              <button
                type="button"
                className="navbar-toggler btn btn-icon btn-sm rounde-circle d-lg-none collapsed"
                aria-label="Toggle navigation"
                aria-expanded="false"
                aria-controls="sidebarNav"
                data-bs-toggle="collapse"
                data-bs-target="#sidebarNav"
              >
                <span className="navbar-toggler-default">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M17.4,6.2H0.6C0.3,6.2,0,5.9,0,5.5V4.1c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,5.9,17.7,6.2,17.4,6.2z M17.4,14.1H0.6c-0.3,0-0.6-0.3-0.6-0.7V12c0-0.4,0.3-0.7,0.6-0.7h16.9c0.3,0,0.6,0.3,0.6,0.7v1.4C18,13.7,17.7,14.1,17.4,14.1z"
                    ></path>
                  </svg>
                </span>
                <span className="navbar-toggler-toggled">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="currentColor"
                      d="M11.5,9.5l5-5c0.2-0.2,0.2-0.6-0.1-0.9l-1-1c-0.3-0.3-0.7-0.3-0.9-0.1l-5,5l-5-5C4.3,2.3,3.9,2.4,3.6,2.6l-1,1 C2.4,3.9,2.3,4.3,2.5,4.5l5,5l-5,5c-0.2,0.2-0.2,0.6,0.1,0.9l1,1c0.3,0.3,0.7,0.3,0.9,0.1l5-5l5,5c0.2,0.2,0.6,0.2,0.9-0.1l1-1 c0.3-0.3,0.3-0.7,0.1-0.9L11.5,9.5z"
                    ></path>
                  </svg>
                </span>
              </button>
              {/* End Responsive Toggle Button */}
            </div>
          </div>
        </div>
      </div>
      <div className="container space-1 space-top-lg-0 space-bottom-lg-2 mt-lg-n10">
        <div className="row">
          <div className="col-lg-3">
            {/* Navbar */}
            <AccountSidebar />
            {/* End Navbar */}
          </div>
          <div className="col-lg-9">{children}</div>
        </div>
      </div>
    </Layout>
  );
}
