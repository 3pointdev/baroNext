import { AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import pageUrlConfig from "config/pageUrlConfig";
import { action, makeObservable, observable, runInAction } from "mobx";
import { NextRouter } from "next/router";
import DefaultProfile from "public/images/profile/default-profile.jpg";
import { Alert } from "src/modules/alert.module";
import { ServerUrlType } from "../../config/constants";
import AuthDto from "../dto/auth/auth.dto";
import { ApiModule } from "../modules/api.module";
import authModule from "../modules/auth.module";
import { SocketModule } from "../modules/socket.module";
import IndicatorViewModel from "./indicator/indicator.viewModel";

export interface IDefaultProps {
  headers: any;
  host: string;
  router: NextRouter;
  userAgent: string;
  indicatorViewModel: IndicatorViewModel;
}

interface ILogin {
  username: string;
  password: string;
  sender: string;
}
export default class DefaultViewModel {
  protected api: ApiModule;
  protected indicatorViewModel: IndicatorViewModel;
  public auth: AuthDto = new AuthDto();
  public socket: SocketModule;
  public router: NextRouter;
  constructor(props: IDefaultProps) {
    this.api = ApiModule.getInstance(props.indicatorViewModel);
    this.router = props.router;

    makeObservable(this, {
      auth: observable,
      socket: observable,

      popAuth: action,
    });
  }

  popAuth = () => {
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

  insertLogin = async (params: ILogin, isRedirect: boolean) => {
    await this.api
      .post(ServerUrlType.BARO, "/login/login", params)
      .then((result: AxiosResponse<any>) => {
        if (result.data.success) {
          const auth = plainToInstance(AuthDto, {
            ...result.data,
            account: params.username,
            profile_image: DefaultProfile.src,
            sender: params.sender,
          });
          runInAction(() => {
            this.auth = auth;
            if (isRedirect) {
              authModule.saveStorage(auth);
              this.router.back();
            } else {
              authModule.saveStorage(auth);
              this.router.replace(pageUrlConfig.main);
            }
          });
        } else {
          Alert.alert(result.data.msg);
        }
      });
  };

  insertLogout = () => {
    runInAction(() => {
      authModule.destroyStorage();
      this.auth = new AuthDto();
    });
  };

  initializeSocket = (
    onMessage: (response: MessageEvent) => void,
    onOpen: () => void
  ) => {
    this.popAuth();
    this.socket = new SocketModule({
      onMessage: onMessage,
      company: this.auth.enterprise,
      isAll: false,
    });
    this.socket.connect(onOpen);
  };
}
