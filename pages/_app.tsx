// import { Provider } from "mobx-react";
// import Header from "../components/header/header";
// import initializeStore from "../src/mobx/store";
// import "../styles/globals.css";
// import type { AppProps } from "next/app";
// import App from "next/app";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { fas } from "@fortawesome/free-solid-svg-icons";
// import { far } from "@fortawesome/free-regular-svg-icons";
// import { faFontAwesome } from "@fortawesome/free-brands-svg-icons";
// import { Router, useRouter } from "next/router";

// library.add(fas, far, faFontAwesome);

// class MyApp extends App<AppProps> {
//   public mobxStore;
//   public router;
//   static async getInitialProps(appContext: any) {
//     const appProps = await App.getInitialProps(appContext);
//     return {
//       ...appProps,
//     };
//   }

//   constructor(props: any) {
//     super(props);
//     this.mobxStore = initializeStore({});
//     this.router = this.props.router;
//   }

//   render() {
//     const { Component, pageProps } = this.props;

//     return (
//       <Provider {...this.mobxStore}>
//         {this.router.pathname !== "/login" && (
//           <Header mainViewModel={this.mobxStore.mainViewModel} />
//         )}
//         <Component {...pageProps} />
//       </Provider>
//     );
//   }
// }

// export default MyApp;

import { Provider } from "mobx-react";
import App from "next/app";
import Head from "next/head";
import React from "react";
import initializeStore from "../src/mobx/store";
import "styles/globals.css";
import Header from "../components/header/header";

class MyApp extends App<any, any, any> {
  public mobxStore;

  static async getInitialProps(appContext: any) {
    const appProps = await App.getInitialProps(appContext);
    const headers =
      typeof window === "undefined"
        ? appContext.ctx.req.headers
        : window.navigator?.userAgent;

    return {
      ...appProps,
      headers: headers,
    };
  }

  constructor(props: any) {
    super(props);

    this.mobxStore = initializeStore({
      headers: props.headers,
      host: props.headers.host,
      userAgent: props.headers["user-agent"],
      env: props.env,
      router: props.router,
    });
  }

  render() {
    const { Component, pageProps, headers } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          />
        </Head>
        <Provider {...this.mobxStore}>
          {this.props.router.pathname !== "/login" && (
            <Header
              mainViewModel={this.mobxStore.mainViewModel}
              authViewModel={this.mobxStore.authViewModel}
            />
          )}
          <Component {...pageProps} headers={headers} />
        </Provider>
      </>
    );
  }
}

export default MyApp;
