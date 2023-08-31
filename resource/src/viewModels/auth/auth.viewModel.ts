import sha256 from "sha256";
import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
import AccountModel from "../../models/login/account.model";
import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { ServerUrlType } from "../../../config/constants";
import FindAccountModel from "../../models/login/contact.model";
import { Alert } from "../../modules/alert.module";

export default class AuthViewModel extends DefaultViewModel {
  public account: AccountModel = new AccountModel();
  public findAccount: FindAccountModel = new FindAccountModel();
  public isContactReady: boolean = false;
  public isAutoLogin: boolean = true;

  constructor(props: IDefaultProps) {
    super(props);
    makeObservable(this, {
      account: observable,
      findAccount: observable,
      isContactReady: observable,
      isAutoLogin: observable,

      checkContactReady: action,
      handleChangeContact: action,
      handleClickCategory: action,
      handleChangeAccount: action,
      handleChangeAutoLogin: action,
    });
  }

  handleChangeAccount = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    runInAction(() => {
      this.account = { ...this.account, [name]: value };
    });
  };

  handleChangeContact = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    runInAction(() => {
      this.findAccount = { ...this.findAccount, [name]: value };
      this.checkContactReady();
    });
  };

  handleClickCategory = (event: MouseEvent<HTMLSelectElement>) => {
    const { id } = event.currentTarget.dataset;

    runInAction(() => {
      this.findAccount = { ...this.findAccount, inquiry: id };
      this.checkContactReady();
    });
  };

  handleChangeAutoLogin = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    runInAction(() => {
      this.isAutoLogin = checked;
    });
  };

  insertContact = async (): Promise<boolean> => {
    return await this.api
      .post(ServerUrlType.BARO, "/login/findId", {
        ...this.findAccount,
        sender: window.localStorage.sender,
      })
      .then((result: any) => {
        if (result.data.code === 500) {
          Alert.alert("요청하신 계정 또는 연락처를 찾을 수 없습니다.");
          return false;
        } else {
          return Alert.alert("계정을 문자메시지로 전송하였습니다.").then(() => {
            return true;
          });
        }
      });
  };

  handleLogin = async () => {
    const params = {
      username: this.account.account,
      password: sha256(this.account.password),
      sender: window.localStorage.sender,
    };

    this.insertLogin(params);
  };

  checkContactReady = () => {
    runInAction(() => {
      if (
        this.findAccount.company.length > 0 &&
        this.findAccount.contact.length > 9 &&
        this.findAccount.inquiry !== ""
      ) {
        this.isContactReady = true;
      } else {
        this.isContactReady = false;
      }
    });
  };

  handleKeyDownEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === "Enter") {
      this.handleLogin();
    }
  };
}
