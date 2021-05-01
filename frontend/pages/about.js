import Layout from "../components/layout";

export default function About() {
  return (
    <Layout title={`О компании`}>
      {/* Hero Section */}
      <div
        className="bg-primary bg-img-hero"
        style={{
          backgroundImage: "url(/assets/svg/components/abstract-shapes-5.svg)",
        }}
      >
        <div className="container space-2 space-lg-3">
          <div className="w-lg-65 text-center mx-lg-auto">
            <h1 className="text-white mb-0">О компании</h1>
          </div>
        </div>
      </div>
      {/* End Hero Section */}

      {/* Content Section */}
      <div className="container space-2 space-lg-0">
        <div className="row">
          <div
            id="stickyBlockStartPoint"
            className="col-lg-4 mt-lg-n11 mb-7 mb-lg-0"
          >
            {/* Sidebar Content */}
            <div
              className="js-sticky-block card bg-white"
              data-hs-sticky-block-options='{
                 "parentSelector": "#stickyBlockStartPoint",
                 "startPoint": "#stickyBlockStartPoint",
                 "endPoint": "#stickyBlockEndPoint",
                 "stickyOffsetTop": 24,
                 "stickyOffsetBottom": 24
               }'
            >
              <div className="card-header text-center py-5">
                <div className="max-w-27rem w-100 mx-auto">
                  <img
                    className="img-fluid"
                    src="/assets/img/logos/logo-comp.png"
                    alt="Image Description"
                  />
                </div>
              </div>

              <div className="card-body">
                <div className="border-bottom pb-2 mb-4">
                  <dl className="row font-size-1">
                    <dt className="col-sm-4 text-dark">Отрасль</dt>
                    <dd className="col-sm-8 text-body">Машиностроение</dd>
                  </dl>
                  <dl className="row font-size-1">
                    <dt className="col-sm-4 text-dark">Местонахождение</dt>
                    <dd className="col-sm-8 text-body">
                      423822, Россия, Республика Татарстан, г. Набережные Челны,
                      ул. Моторная, 38, а/я 183
                    </dd>
                  </dl>
                  <dl className="row font-size-1">
                    <dt className="col-sm-4 text-dark">Тип</dt>
                    <dd className="col-sm-8 text-body">
                      ЗАКРЫТОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            {/* End Sidebar Content */}
          </div>

          <div className="col-lg-8 space-lg-2">
            <div className="pl-lg-4">
              <h2 className="h3">Завод транспортного электрооборудования</h2>
              <p>
                Основан в 1976 году в городе Набережные Челны. В январе 1981
                года была выпущена первая продукция. Завод транспортного
                электрооборудования к концу 80-х был переименован в
                научно-производственное объединение «Татэлектромаш».
              </p>

              <div className="pt-4 pt-sm-7 pb-5 pb-sm-9">
                <img
                  className="img-fluid rounded-lg"
                  src="/assets/img/others/machine-tool-1.jpg"
                  alt="Image Description"
                />
              </div>

              <p>
                В настоящий момент ЗАО «ПТФК «ЗТЭО» входит в состав ведущих
                российских предприятий. На предприятии выпускается
                электротехническая продукция (электрическое оборудование,
                электродвигатели, генераторы, пускорегулирующая аппаратура) для
                большегрузных автосамосвалов БелАЗ, городского электротранспорта
                (трамваев, троллейбусов, метро), РЖД, экскаваторов, кранов. Так
                же на заводе интенсивно ведутся научно технические разработки и
                основных типов тягового электрооборудования на основе последних
                достижений силовой преобразовательной техники.
              </p>

              <div className="pt-4 pt-sm-7 pb-5 pb-sm-9">
                <img
                  className="img-fluid rounded-lg"
                  src="/assets/img/others/machine-tool-2.jpg"
                  alt="Image Description"
                />
              </div>

              <p>
                Предприятие занимает территорию 159 га восточнее города
                Набережные Челны и в его состав входят следующие цеха и участки:
              </p>
              <ul>
                <li className="pb-2">
                  Цех механической обработки – окончательная механическая
                  обработка заготовок.
                </li>
                <li className="pb-2">
                  Обмоточно – заготовительный цех – изготовление якорных,
                  компенсационных катушек, катушек главных и дополнительных
                  полюсов, так же пропитка и сушка якорей, катушек и моноблоков.
                  В цехе имеются намоточные, изолировочные станки и пресса для
                  опрессовки.
                </li>
                <li className="pb-2">
                  Участок изготовления литейных заготовок – отливка деталей и
                  заготовки из черных и цветных металлов.
                </li>
                <li className="pb-2">
                  Участок штамповки – изготовление якорных, полюсных листов,
                  коллекторных пластин и других деталей.
                </li>
                <li className="pb-2">
                  Участок сборки – сборка узлов и полная сборка электрических
                  машин.
                </li>
                <li className="pb-2">
                  Участок электрических аппаратов – производство
                  пускорегулирующей аппаратуры для резисторов, трамвайных
                  панелей, ящиков сопротивлений и т.д. Вся выпускаемая участком
                  продукция проходит испытания на стендах.
                </li>
                <li className="pb-2">
                  Цех покрытий – имеются участки гальванопокрытий и пластмасс.
                </li>
                <li className="pb-2">
                  Инструментальный цех - изготовления режущего, мерительного
                  инструмента, штампов холодной и горячей штамповки, пресс –
                  форм, также нестандартного оборудования.
                </li>
                <li className="pb-2">
                  Ремонтно-строительный цех – изготовление деревянной тары для
                  упаковки выпускаемой продукции.
                </li>
                <li className="pb-2">
                  Заготовительно-складской корпус – изготовление сварных узлов и
                  отдельных заготовок деталей электрических машин и аппаратов.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End Content Section */}
    </Layout>
  );
}
