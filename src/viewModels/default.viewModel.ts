import { makeObservable, observable, runInAction } from "mobx";
import AuthDto from "../dto/auth/auth.dto";
import { ApiModule } from "../modules/api.module";
import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import DefaultProfile from "public/images/profile/default-profile.jpg";
import authModule from "../modules/auth.module";
import { ServerUrlType } from "../../config/constants";
import { SocketModule } from "../modules/socket.module";
import { NextRouter } from "next/router";

export interface IDefaultProps {
  headers: any;
  host: string;
  router: NextRouter;
  userAgent: string;
}

interface ILogin {
  username: string;
  password: string;
  sender: string;
}
export default class DefaultViewModel {
  protected api: ApiModule;
  public auth: AuthDto = new AuthDto();
  public socket: SocketModule;
  public router: NextRouter;
  constructor(props: IDefaultProps) {
    this.api = ApiModule.getInstance();
    this.router = props.router;
    makeObservable(this, {
      auth: observable,
    });
  }

  initializeAuth = () => {
    runInAction(() => {
      const storage = {
        account: window.localStorage.account,
        enterprise: window.localStorage.enterprise,
        enterprise_id: window.localStorage.enterprise_id,
        token: window.localStorage.token,
        name: window.localStorage.name,
        profile_image: DefaultProfile.src,
      };
      this.auth = plainToInstance(AuthDto, storage);
    });
  };

  //socket 1689811584467
  //api 1689811584466

  insertLogin = async (params: ILogin) => {
    await this.api
      .post(ServerUrlType.BARO, "/login/login", params)
      .then((result: AxiosResponse<any>) => {
        const auth = plainToInstance(AuthDto, {
          ...result.data,
          account: params.username,
          profile_image: DefaultProfile.src,
          sender: params.sender,
        });
        runInAction(() => {
          this.auth = auth;
          authModule.saveStorage(auth);
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  insertLogout = () => {
    runInAction(() => {
      authModule.destroyStorage();
      this.auth = new AuthDto();
    });
  };

  initializeSocket = (onMessage: (response: MessageEvent) => void) => {
    this.socket = new SocketModule({
      onMessage: onMessage,
      company: this.auth.enterprise,
      isAll: false,
    });
    this.socket.connect();
  };
}
