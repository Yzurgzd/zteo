import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="w-md-80 w-lg-50 text-center mx-md-auto">
      <figure className="max-w-10rem max-w-sm-15rem mx-auto mb-3">
        <img
          className="img-fluid"
          src="/assets/svg/illustrations/empty-cart.svg"
          alt="SVG"
        />
      </figure>
      <div className="mb-5">
        <h1 className="h2">Ваша корзина в данный момент пуста</h1>
        <p>
          Прежде чем приступить к оформлению заказа, вы должны добавить
          некоторые товары в свою корзину покупок. Вы найдете много интересных
          товаров на нашем сайте "Digital World".
        </p>
      </div>
      <Link href={`/`}>
        <a className="btn btn-primary btn-pill transition-3d-hover px-5">
          Приступить к покупкам
        </a>
      </Link>
    </div>
  );
}
