import Link from "next/link";
import Head from "next/head";
import Header from "./include/header";
import Footer from "./include/footer";

export default function Layout({
  children,
  title = "Холдинг компании «ТЭМПО»",
}) {
  return (
    <>
      <Head>
        <title>
          {title} | ЗАО «ПТФК «Завод транспортного электрооборудования»
        </title>
      </Head>
      <div className="site">
        <div className="site-content">
          {/* ========== HEADER ========== */}
          <Header />
          {/* ========== END HEADER ========== */}

          {/* ========== MAIN CONTENT ========== */}
          <main id="content" role="main">
            {children}
          </main>
          {/* ========== END MAIN CONTENT ========== */}
        </div>
        {/* ========== FOOTER ========== */}
        <Footer />
        {/* ========== END FOOTER ========== */}
      </div>
    </>
  );
}
