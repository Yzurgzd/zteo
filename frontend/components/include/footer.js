import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="container space-1">
        <div className="row align-items-md-center text-center">
          <div className="col-md-3 mb-4 mb-md-0">
            <p className="small">ЗАО «ПТФК «ЗТЭО» 2021</p>
          </div>

          <div className="col-sm-7 col-md-6 mb-4 mb-sm-0">
            {/* Nav List */}
            <ul className="nav nav-sm nav-x-0 justify-content-center text-md-center">
              <li className="nav-item px-3">
                <Link href={`/about`}>
                  <a className="nav-link">О компании</a>
                </Link>
              </li>
              <li className="nav-item px-3">
                <Link href={`/contact`}>
                  <a className="nav-link">Контакты</a>
                </Link>
              </li>
            </ul>
            {/* End Nav List */}
          </div>

          <div className="col-sm-5 col-md-3 text-md-center">
            <p className="small">Республика Татарстан, Набережные Челны.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
