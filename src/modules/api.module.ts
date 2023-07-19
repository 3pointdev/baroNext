import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  RawAxiosRequestHeaders,
} from "axios";
import { plainToInstance } from "class-transformer";
import { serialize } from "object-to-formdata";
import { ServerUrlType } from "../../config/constants";

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
  private token: string | null = "";
  private commonHeader: RawAxiosRequestHeaders;
  public senderId: string;

  private constructor(senderId: string) {
    this.commonHeader = {
      "Content-Type": "application/json",
      "X-Access-Token": "",
    };
    this.senderId = senderId;
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
  }

  public static getInstance(senderId: string): ApiModule {
    return this.instance || (this.instance = new this(senderId));
  }

  async get<T>(server: ServerUrlType, url: string, params?: T) {
    this.commonHeader["Content-Type"] = "application/json";
    this.setAxiosInstance(server);
    return await this.axios
      .get(url, {
        params: { ...params, sender: this.senderId },
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
    let data;
    data = { ...params, sender: this.senderId };

    // 대상이 파일이라면 콘텐츠타입을 변경해주는 로직
    // if (this.isFileParams(params)) {
    //   data = serialize(params);
    // }

    this.setAxiosInstance(server);
    return await this.axios
      .post(url, data, config)
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  async put<T>(server: ServerUrlType, url: string, params?: T) {
    this.commonHeader["Content-Type"] = "application/json";
    this.setAxiosInstance(server);
    return await this.axios
      .put(url, { ...params, sender: this.senderId })
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  async patch<T>(server: ServerUrlType, url: string, params?: T) {
    this.commonHeader["Content-Type"] = "application/json";
    this.setAxiosInstance(server);
    return await this.axios
      .patch(url, { ...params, sender: this.senderId })
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  async delete(server: ServerUrlType, url: string) {
    this.commonHeader["Content-Type"] = "application/json";
    this.setAxiosInstance(server);
    return await this.axios
      .delete(url)
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  // isFileParams(params: any): boolean {
  //   // params가 단순 변수일때 파일인지 구분해서 true 리턴
  //   if (params instanceof File) {
  //     return true;
  //   }

  //   // params가 배열일때
  //   if (Array.isArray(params)) {
  //     // 배열 내 file이 존재하면 true 리턴
  //     for (let i = 0; i < params.length; i++) {
  //       if (this.isFileParams(params[i])) {
  //         return true;
  //       }
  //       // 배열 내 배열 또는 객체 존재하는지 확인
  //       if (Array.isArray(params[i]) || typeof params[i] === "object") {
  //         const keys = Object.keys(params[i]);
  //         // 배열 내 배열 또는 객체 하나씩 재확인 file이라면 true 리턴
  //         for (let j = 0; j < keys.length; j++) {
  //           if (this.isFileParams(params[i][keys[j]])) {
  //             return true;
  //           }
  //         }
  //       }
  //     }
  //     // params가 객체일때
  //   } else if (typeof params === "object" && params !== null) {
  //     // 객체 내 file이 존재하면 true 리턴
  //     const keys = Object.keys(params);
  //     for (let i = 0; i < keys.length; i++) {
  //       if (this.isFileParams(params[keys[i]])) {
  //         return true;
  //       }
  //       // 객체 내 배열 또는 객체가 존재하는지 확인
  //       if (
  //         Array.isArray(params[keys[i]]) ||
  //         typeof params[keys[i]] === "object"
  //       ) {
  //         if (!params[keys[i]]) {
  //           continue;
  //         }
  //         const subKeys = Object.keys(params[keys[i]]);
  //         // 객체 내 배열 또는 객체 하나씩 재확인 file이라면 true 리턴
  //         for (let j = 0; j < subKeys.length; j++) {
  //           if (this.isFileParams(params[keys[i]][subKeys[j]])) {
  //             return true;
  //           }
  //         }
  //       }
  //     }
  //   }

  //   //모든 조건에 실패하면 false 리턴
  //   return false;
  // }

  private handleSuccess = <T>(response: AxiosResponse<T>): AxiosResponse<T> => {
    return response;
  };

  private handleError = (error: any): AxiosError => {
    const { data } = error.response;
    const errorDto = plainToInstance(AxiosError, data);

    throw errorDto;
  };
}
