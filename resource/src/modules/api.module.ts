import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  RawAxiosRequestHeaders,
} from "axios";
import { plainToInstance } from "class-transformer";
import { ServerUrlType } from "config/constants";
import authModule from "src/modules/auth.module";
import IndicatorViewModel from "src/viewModels/indicator/indicator.viewModel";

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: AxiosResponseHeaders;
  config: any;
  request?: any;
}

export interface ServerResponse<T> {
  data: T;
}

export class ApiModule {
  private static instance: ApiModule;
  private axios: AxiosInstance = axios.create({});
  private indicatorViewModel: IndicatorViewModel;
  private token: string | null = "";
  private commonHeader: RawAxiosRequestHeaders;

  private constructor(indicatorViewModel?: IndicatorViewModel) {
    this.indicatorViewModel = indicatorViewModel;
    this.commonHeader = {
      "Content-Type": "application/json",
      "X-Access-Token": "",
    };
  }

  private setToken(): void {
    this.token = window.localStorage.getItem("token");
    this.commonHeader["X-Access-Token"] = this.token;
  }

  private setAxiosInstance(server: ServerUrlType) {
    this.setToken();
    this.axios = axios.create({
      baseURL: server,
      headers: this.commonHeader,
      responseType: "json",
    });

    if (typeof this.indicatorViewModel !== "undefined") {
      this.indicatorViewModel.useIndicator(true);
    }
  }

  public static getInstance(
    indicatorViewModel?: IndicatorViewModel
  ): ApiModule {
    return this.instance || (this.instance = new this(indicatorViewModel));
  }

  async get<T>(server: ServerUrlType, url: string, params?: T) {
    if (
      !authModule.isLogin() &&
      url !== "/login/login" &&
      url !== "/login/findId" &&
      url !== "/login/findPass"
    ) {
      throw "please login";
    }
    const sender = window.localStorage.sender;
    this.commonHeader["Content-Type"] = "application/json";
    this.setAxiosInstance(server);
    return await this.axios
      .get(url, {
        params: { ...params, sender: sender },
      })
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  async post<T>(
    server: ServerUrlType,
    url: string,
    params?: T,
    config?: AxiosRequestConfig
  ) {
    if (
      !authModule.isLogin() &&
      url !== "/login/login" &&
      url !== "/login/findId" &&
      url !== "/login/findPass"
    )
      throw "please login";
    const sender = window.localStorage.sender;

    this.setAxiosInstance(server);
    return await this.axios
      .post(url, { ...params, sender: sender }, config)
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  async put<T>(server: ServerUrlType, url: string, params?: T) {
    if (
      !authModule.isLogin() &&
      url !== "/login/login" &&
      url !== "/login/findId" &&
      url !== "/login/findPass"
    )
      throw "please login";
    const sender = window.localStorage.sender;

    this.commonHeader["Content-Type"] = "application/json";
    this.setAxiosInstance(server);
    return await this.axios
      .put(url, { params: { ...params, sender: sender } })
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  async patch<T>(server: ServerUrlType, url: string, params?: T) {
    if (
      !authModule.isLogin() &&
      url !== "/login/login" &&
      url !== "/login/findId"
    )
      throw "please login";
    // const sender = window.localStorage.sender;

    this.commonHeader["Content-Type"] = "application/json";
    this.setAxiosInstance(server);
    return await this.axios
      .patch(url, params)
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  async delete(server: ServerUrlType, url: string) {
    if (
      !authModule.isLogin() &&
      url !== "/login/login" &&
      url !== "/login/findId" &&
      url !== "/login/findPass"
    )
      throw "please login";
    this.commonHeader["Content-Type"] = "application/json";
    this.setAxiosInstance(server);
    return await this.axios
      .delete(url)
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  private handleSuccess = <T>(response: AxiosResponse<T>): AxiosResponse<T> => {
    this.indicatorViewModel.useIndicator(false);

    return response;
  };

  private handleError = (error: any): AxiosError => {
    const { data } = error.response;
    this.indicatorViewModel.useIndicator(false);
    const errorDto = plainToInstance(AxiosError, data);

    throw errorDto;
  };
}
