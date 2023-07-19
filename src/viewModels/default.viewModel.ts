import { makeObservable, observable, runInAction } from "mobx";
import UserDto from "../dto/user/user.dto";
import { ApiModule } from "../modules/api.module";
import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import DefaultProfile from "public/images/profile/default-profile.jpg";
import authModule from "../modules/auth.module";
import { ServerUrlType } from "../../config/constants";
import { SocketModule } from "../modules/socket.module";
import SocketTransformModule from "../modules/socketTransform.module";

interface IProps {}

interface ILogin {
  username: string;
  password: string;
  sender: string;
}
export default class DefaultViewModel {
  protected api: ApiModule;
  public senderId: string = `/admin/id:${new Date().getTime()}`;
  public user: UserDto = new UserDto();
  public socket: SocketModule;
  constructor(props: IProps) {
    this.api = ApiModule.getInstance(this.senderId);
    makeObservable(this, {
      user: observable,
    });
  }

  initializeUser = () => {
    runInAction(() => {
      const storage = {
        account: window.localStorage.account,
        enterprise: window.localStorage.enterprise,
        enterprise_id: window.localStorage.enterprise_id,
        token: window.localStorage.token,
        name: window.localStorage.name,
        profile_image: DefaultProfile.src,
      };
      this.user = plainToInstance(UserDto, storage);
    });
  };

  insertLogin = async (params: ILogin) => {
    await this.api
      .post(ServerUrlType.BARO, "/login/login", params)
      .then((result: AxiosResponse<any>) => {
        const user = plainToInstance(UserDto, {
          ...result.data,
          account: params.username,
          profile_image: DefaultProfile.src,
          sender: params.sender,
        });
        runInAction(() => {
          this.user = user;
          authModule.saveStorage(user);
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
      this.user = new UserDto();
    });
  };

  initializeSocket = (onMessage: (response: MessageEvent) => void) => {
    this.socket = new SocketModule({
      onMessage: onMessage,
      senderId: this.senderId,
      company: this.user.enterprise,
      isAll: false,
    });
    this.socket.connect();
  };
}
