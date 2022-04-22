import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          {/* <link rel="alternate icon" type="image/png" href="/static/favicon.png" /> */}
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <meta property="og:type" content="website" />
          {/* <meta property="og:url" content="https://nowloading.games" /> */}
          {/* <meta property="twitter:card" content="summary_large_image" /> */}
          {/* <meta property="twitter:url" content="https://nowloading.games" /> */}
          {/* <meta name="theme-color" content="#2b2b2b" /> */}

          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@700&display=swap"
            rel="stylesheet"
          /> */}
        </Head>

        <body className="bg-gray-900 text-white w-full mx-auto px-8">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
