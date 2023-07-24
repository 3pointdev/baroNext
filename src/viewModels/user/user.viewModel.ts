import sha256 from "sha256";
import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
import AccountModel from "../../models/login/account.model";
import { ChangeEvent } from "react";
import ContactModel from "../../models/login/contact.model";
import { ServerUrlType } from "../../../config/constants";
import { AxiosError, AxiosResponse } from "axios";
import UserDto from "../../dto/user/user.dto";
import { plainToInstance } from "class-transformer";

export default class UserViewModel extends DefaultViewModel {
  public user: UserDto = new UserDto();

  constructor(props: IDefaultProps) {
    super(props);
    makeObservable(this, {
      user: observable,

      getMe: action,
    });
  }

  getMe = async () => {
    await this.api
      .get(ServerUrlType.BARO, "/mypage")
      .then((result: AxiosResponse<any>) => {
        runInAction(() => {
          this.user = plainToInstance(UserDto, result.data[0]);
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };
}
