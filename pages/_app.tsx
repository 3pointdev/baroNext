import "reflect-metadata";
import { Provider } from "mobx-react";
import App from "next/app";
import React from "react";
import initializeStore, { RootStore } from "../src/mobx/store";
import "styles/globals.css";
import Header from "../components/header/header";
import { IDefaultProps } from "../src/viewModels/default.viewModel";

class MyApp extends App<any, any, any> {
  public mobxStore: RootStore;

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

  constructor(props: IDefaultProps) {
    super(props);

    this.mobxStore = initializeStore({
      headers: props.headers,
      host: props.headers.host,
      userAgent: props.headers["user-agent"],
      router: props.router,
    });
  }

  componentDidMount(): void {
    window.localStorage.sender = `/admin/id:${new Date().getTime()}`;
    this.mobxStore.mainViewModel.initializeAuth();
  }

  render() {
    const { Component, pageProps, headers } = this.props;
    const notUseHeader = ["/login", "/monitoring3", "/monitoring2"];
    return (
      <Provider {...this.mobxStore}>
        {!notUseHeader.includes(this.props.router.pathname) && (
          <Header mainViewModel={this.mobxStore.mainViewModel} />
        )}

        <Component {...pageProps} headers={headers} />
      </Provider>
    );
  }
}

export default MyApp;
