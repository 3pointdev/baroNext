import sha256 from "sha256";
import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
import AccountModel from "../../models/login/account.model";
import { ChangeEvent } from "react";
import ContactModel from "../../models/login/contact.model";

export default class AuthViewModel extends DefaultViewModel {
  public account: AccountModel = new AccountModel();
  public contact: ContactModel = new ContactModel();
  public isContactReady: boolean = false;
  public isAutoLogin: boolean = false;

  constructor(props: IDefaultProps) {
    super(props);
    makeObservable(this, {
      account: observable,
      contact: observable,
      isContactReady: observable,
      isAutoLogin: observable,

      checkContactReady: action,
      handleChangeContact: action,
      handleChangeContactCategory: action,
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
    runInAction(() => {
      this.isAutoLogin = checked;
    });
  };

  insertContact = () => {
    //api contact
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
}
