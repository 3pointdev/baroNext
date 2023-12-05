import { plainToInstance } from "class-transformer";
import { IAlertState } from "components/alert/alert";
import { action, makeObservable, observable, runInAction } from "mobx";
import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import sha256 from "sha256";
import { ServerUrlType } from "../../../config/constants";
import AccountModel from "../../models/login/account.model";
import FindAccountModel from "../../models/login/contact.model";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";

export default class AuthViewModel extends DefaultViewModel {
  public account: AccountModel = new AccountModel();
  public findAccount: FindAccountModel = new FindAccountModel();
  public isContactReady: boolean = false;
  public isAutoLogin: boolean = true;
  public alertModel: IAlertState = {
    isPositive: true,
    isActive: false,
    title: "",
  };

  constructor(props: IDefaultProps) {
    super(props);
    makeObservable(this, {
      account: observable,
      findAccount: observable,
      isContactReady: observable,
      isAutoLogin: observable,
      alertModel: observable,

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
      this.account = plainToInstance(AccountModel, {
        ...this.account,
        [name]: value,
      });
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
    if (this.findAccount.inquiry === "password") {
      return await this.insertFindPw();
    } else {
      return await this.insertFindId();
    }
  };

  insertFindPw = async () => {
    return await this.api
      .post(ServerUrlType.BARO, "/login/findPass", {
        contact: this.findAccount.contact,
        sender: window.localStorage.sender,
        ...this.getNewPassword(),
      })
      .then((result: any) => {
        if (result.data.code === 500) {
          runInAction(() => {
            this.alertModel = {
              isPositive: false,
              isActive: true,
              title: "요청하신 계정 또는 연락처를 찾을 수 없습니다.",
            };
          });
          setTimeout(() => {
            runInAction(() => {
              this.alertModel = {
                title: "",
                isPositive: true,
                isActive: false,
              };
            });
          }, 3000);

          return false;
        } else {
          runInAction(() => {
            this.alertModel = {
              isPositive: true,
              isActive: true,
              title: "임시비밀번호를 문자메시지로 전송하였습니다.",
            };
          });
          setTimeout(() => {
            runInAction(() => {
              this.alertModel = {
                title: "",
                isPositive: true,
                isActive: false,
              };
            });
          }, 3000);
          return true;
        }
      });
  };

  public getNewPassword() {
    const length = 4;
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const random = Array.from(
      { length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join("");
    const password = sha256(random);
    return { random, password };
  }

  insertFindId = async () => {
    return await this.api
      .post(ServerUrlType.BARO, "/login/findId", {
        ...this.findAccount,
        sender: window.localStorage.sender,
      })
      .then((result: any) => {
        if (result.data.code === 500) {
          runInAction(() => {
            this.alertModel = {
              isPositive: false,
              isActive: true,
              title: "요청하신 계정 또는 연락처를 찾을 수 없습니다.",
            };
          });
          setTimeout(() => {
            runInAction(() => {
              this.alertModel = {
                title: "",
                isPositive: true,
                isActive: false,
              };
            });
          }, 3000);

          return false;
        } else {
          runInAction(() => {
            this.alertModel = {
              isPositive: true,
              isActive: true,
              title: "계정을 문자메시지로 전송하였습니다.",
            };
          });
          setTimeout(() => {
            runInAction(() => {
              this.alertModel = {
                title: "",
                isPositive: true,
                isActive: false,
              };
            });
          }, 3000);
          return true;
        }
      });
  };

  handleLogin = async (isRedirect: boolean) => {
    if (this.account.account.length < 4) {
      runInAction(() => {
        this.alertModel = {
          isPositive: false,
          isActive: true,
          title: "아이디를 다시 확인해 주세요.",
        };
      });
      setTimeout(() => {
        runInAction(() => {
          this.alertModel = {
            title: "",
            isPositive: true,
            isActive: false,
          };
        });
      }, 3000);
      return false;
    }

    if (this.account.password.length < 4) {
      runInAction(() => {
        this.alertModel = {
          isPositive: false,
          isActive: true,
          title: "암호를 다시 확인해 주세요.",
        };
      });
      setTimeout(() => {
        runInAction(() => {
          this.alertModel = {
            title: "",
            isPositive: true,
            isActive: false,
          };
        });
      }, 3000);
      return false;
    }

    const params = {
      username: this.account.account,
      // password: "",
      password: sha256(this.account.password),
      sender: window.localStorage.sender,
    };

    await this.insertLogin(params, isRedirect)
      .then((data: any) => {})
      .catch((error: any) => {
        runInAction(() => {
          this.alertModel = {
            isPositive: false,
            isActive: true,
            title: error.msg,
          };
        });
        setTimeout(() => {
          runInAction(() => {
            this.alertModel = {
              title: "",
              isPositive: true,
              isActive: false,
            };
          });
        }, 3000);
      });
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

  handleKeyDownEnter = (event: KeyboardEvent<Element>, isRedirect: boolean) => {
    const { key } = event;

    if (key === "Enter") {
      this.handleLogin(isRedirect);
    }
  };
}
