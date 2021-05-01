import Layout from "../../../components/layout";

export default function Activate({ data }) {
  return (
    <Layout title={`Активация учетной записи`}>
      <div className="d-lg-flex">
        <div className="container d-lg-flex align-items-lg-center vh-lg-100 space-bottom-1 space-top-3 space-bottom-lg-3 space-lg-0">
          <div className="row justify-content-lg-between align-items-lg-center w-100 mt-lg-9">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <img
                className="img-fluid"
                src="/assets/svg/illustrations/server-woman.svg"
                alt="SVG Illustration"
              />
            </div>

            <div className="col-lg-5">
              {/* Title */}
              <div className="mb-4">
                <h1>Активация учетной записи.</h1>
                <p>{data.detail}</p>
              </div>
              {/* End Title */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const activateApi = await fetch(
    `${process.env.API_URL}/auth/users/activation/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid: query.uid, token: query.token }),
    }
  );

  const data = (await activateApi.ok)
    ? { detail: "Активация прошла успешно" }
    : await activateApi.json();

  return { props: { data } };
}
