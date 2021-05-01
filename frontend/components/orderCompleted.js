import Layout from "./layout";

export default function OrderCompleted() {
  return (
    <Layout>
      {/*- Cart Section */}
      <div className="container space-2 space-lg-3">
        <div className="w-md-80 w-lg-50 text-center mx-md-auto">
          <i className="fas fa-check-circle text-success fa-5x mb-3"></i>
          <div className="mb-5">
            <h1 className="h2">Your order is completed!</h1>
            <p>
              Thank you for your order! Your order is being processed and will
              be completed within 3-6 hours. You will receive an email
              confirmation when your order is completed.
            </p>
          </div>
          <a
            className="btn btn-primary btn-pill transition-3d-hover px-5"
            href="shop-classic.html"
          >
            Continue Shopping
          </a>
        </div>
      </div>
      {/*- End Cart Section */}
    </Layout>
  );
}
