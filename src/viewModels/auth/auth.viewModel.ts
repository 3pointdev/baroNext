import DefaultProfile from "public/images/profile/default-profile.jpg";
import sha256 from "sha256";
import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel from "../default.viewModel";
import AccountModel from "../../models/login/account.model";
import { ChangeEvent } from "react";
import ContactModel from "../../models/login/contact.model";
import UserDto from "../../dto/user/user.dto";
import AuthModule from "../../modules/auth.module";
import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { ApiResponse } from "../../modules/api.module";

interface IProps {}

export default class AuthViewModel extends DefaultViewModel {
  public account: AccountModel = new AccountModel();
  public contact: ContactModel = new ContactModel();
  public isContactReady: boolean = false;
  public isAutoLogin: boolean = false;
  public user: UserDto = new UserDto();

  constructor(props: IProps) {
    super(props);
    makeObservable(this, {
      account: observable,
      contact: observable,
      isContactReady: observable,
      isAutoLogin: observable,
      user: observable,

      checkContactReady: action,
      handleChangeContact: action,
      handleChangeContactCategory: action,
      handleChangeAccount: action,
      handleChangeAutoLogin: action,
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

  handleChangeAccount = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    runInAction(() => {
      this.account = { ...this.account, [name]: value };
    });
  };

  handleChangeContact = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    runInAction(() => {
      this.contact = { ...this.contact, [name]: value };
      this.checkContactReady();
    });
  };

  handleChangeContactCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    runInAction(() => {
      this.contact = { ...this.contact, category: +value };
      this.checkContactReady();
    });
  };

  handleChangeAutoLogin = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    console.log(checked);
    runInAction(() => {
      this.isAutoLogin = checked;
    });
  };

  insertContact = () => {
    //api contact
  };

  insertLogin = async () => {
    const params = {
      username: this.account.account,
      password: sha256(this.account.password),
      sender: "/admin/id:1689298220196",
    };

    await this.api
      .post("/login/login", params)
      .then((result: AxiosResponse<any>) => {
        const user = plainToInstance(UserDto, {
          ...result.data,
          account: this.account.account,
          profile_image: DefaultProfile.src,
        });
        runInAction(() => {
          this.user = user;
          AuthModule.saveStorage(user);
          console.log(this.user);
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  checkContactReady = () => {
    runInAction(() => {
      if (
        this.contact.company.length > 0 &&
        this.contact.phone.length > 9 &&
        this.contact.category !== 0
      ) {
        this.isContactReady = true;
      } else {
        this.isContactReady = false;
      }
    });
  };

  insertLogout = () => {
    runInAction(() => {
      AuthModule.destroyStorage();
      this.user = new UserDto();
    });
  };
}
