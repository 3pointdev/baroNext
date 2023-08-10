import "reflect-metadata";
import { Provider } from "mobx-react";
import App from "next/app";
import React from "react";
import initializeStore, { RootStore } from "../src/mobx/store";
import "styles/globals.css";
import Header from "../components/header/header";
import { IDefaultProps } from "../src/viewModels/default.viewModel";
import authModule from "../src/modules/auth.module";
import { Router } from "next/router";
import pageUrlConfig from "../config/pageUrlConfig";
import LoadingIndicator from "../components/indicator/loadingIndicator";

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
      indicatorViewModel: props.indicatorViewModel,
    });
  }

  componentDidMount(): void {
    window.localStorage.sender = `/admin/id:${new Date().getTime()}`;
    this.mobxStore.mainViewModel.popAuth();

    if (!authModule.isLogin() && this.props.router.pathname !== "/login") {
      this.props.router.push(pageUrlConfig.login);
    }
  }

  render() {
    const { Component, pageProps, headers } = this.props;
    const notUseHeader = ["/login", "/monitoring/mon3", "/monitoring/mon2"];
    return (
      <Provider {...this.mobxStore}>
        {!notUseHeader.includes(this.props.router.pathname) && (
          <Header mainViewModel={this.mobxStore.mainViewModel} />
        )}
        <LoadingIndicator
          indicatorViewModel={this.mobxStore.indicatorViewModel}
        />
        <Component {...pageProps} headers={headers} />
      </Provider>
    );
  }
}

export default MyApp;
