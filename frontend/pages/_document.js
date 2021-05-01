import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,600&amp;display=swap"
            rel="stylesheet"
          />
          <script
            type="text/javascript"
            src="/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js"
          />
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}
