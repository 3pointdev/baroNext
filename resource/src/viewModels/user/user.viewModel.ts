import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { action, makeObservable, observable, runInAction } from "mobx";
import { ChangeEvent, MouseEvent } from "react";
import { Address } from "react-daum-postcode";
import sha256 from "sha256";
import {
  ServerUrlType,
  UserDataUpdateType,
  ValidType,
} from "../../../config/constants";
import UserDto from "../../dto/user/user.dto";
import AdminAccountModel from "../../models/account/adminAccount.model";
import BillInformationModel from "../../models/account/billInformation.model";
import LoginAccountModel from "../../models/account/loginAccount.model";
import MonitorAccountModel from "../../models/account/monitorAccount.model";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";

export default class UserViewModel extends DefaultViewModel {
  public user: UserDto = new UserDto();
  public smsChecked: boolean = true;
  public loginAccountModel: LoginAccountModel = new LoginAccountModel();
  public adminAccountModel: AdminAccountModel = new AdminAccountModel();
  public monitorAccountModel: MonitorAccountModel = new MonitorAccountModel();
  public isOpenAddress: boolean = false;
  public billInformationModel: BillInformationModel =
    new BillInformationModel();
  public isOpenAlert: boolean = false;

  constructor(props: IDefaultProps) {
    super(props);
    makeObservable(this, {
      user: observable,
      smsChecked: observable,
      loginAccountModel: observable,
      adminAccountModel: observable,
      monitorAccountModel: observable,
      isOpenAddress: observable,
      billInformationModel: observable,
      isOpenAlert: observable,

      getMe: action,
      handleChangeSmsCheck: action,
      handleChangeLoginAccount: action,
      handleChangeAdminAccount: action,
      handleChangeMonitorAccount: action,
      handleChangeBillInfomation: action,
      handleClickAccountUpdate: action,
      handleClickOpenAddressModal: action,
      handleClickPasswordUpdate: action,
      handleClickUserUpdate: action,
    });
  }

  getMe = async () => {
    await this.api
      .get(ServerUrlType.BARO, "/mypage")
      .then((result: AxiosResponse<any>) => {
        runInAction(() => {
          this.user = plainToInstance(UserDto, {
            ...result.data[0],
            profile_image: this.auth.profileImage,
            enterprise: this.auth.name,
          });
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  updateManager = async () => {
    const params = {
      manager: this.loginAccountModel.name,
      phone: this.loginAccountModel.phone,
    };
    await this.api
      .patch(ServerUrlType.BARO, "/mypage/modiManager", params)
      .then((result: AxiosResponse<any>) => {})
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  updateAccount = async () => {
    const params = {
      id: this.adminAccountModel.id,
    };
    await this.api
      .patch(ServerUrlType.BARO, "/mypage/modiId", params)
      .then((result: AxiosResponse<any>) => {})
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  updatePassword = async () => {
    const params = {
      password: sha256(this.adminAccountModel.password),
    };
    await this.api
      .patch(ServerUrlType.BARO, "/mypage/modiPass", params)
      .then((result: AxiosResponse<any>) => {})
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  handleChangeSmsCheck = (event: ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      this.smsChecked = !this.smsChecked;
    });
  };

  handleChangeLoginAccount = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const targetKey = name.split("_")[1];

    const validState = this.accountValid(targetKey, value);

    runInAction(() => {
      this.loginAccountModel = {
        ...this.loginAccountModel,
        [targetKey]: value,
        [`${targetKey}Valid`]: validState,
      };
    });
  };

  handleChangeAdminAccount = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const targetKey = name.split("_")[2];

    const validState = this.accountValid(targetKey, value);

    runInAction(() => {
      this.adminAccountModel = {
        ...this.adminAccountModel,
        [targetKey]: value,
        [`${targetKey}Valid`]: validState,
      };
    });
  };

  handleChangeMonitorAccount = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const targetKey = name.split("_")[2];

    const validState = this.accountValid(targetKey, value);

    runInAction(() => {
      this.monitorAccountModel = {
        ...this.monitorAccountModel,
        [targetKey]: value,
        [`${targetKey}Valid`]: validState,
      };
    });
  };

  handleClickOpenAddressModal = (event: MouseEvent<HTMLInputElement>) => {
    runInAction(() => {
      this.isOpenAddress = !this.isOpenAddress;
    });
  };

  setSearchAddress = (event: Address) => {
    const { address, roadAddress, zonecode } = event;

    runInAction(() => {
      this.isOpenAddress = !this.isOpenAddress;
      this.billInformationModel = {
        ...this.billInformationModel,
        address: roadAddress ? roadAddress : address,
        zip: zonecode,
      };
    });
  };

  handleChangeBillInfomation = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const targetKey = name.split("_")[1];

    if (!this.billInformationValid(targetKey, value)) {
      return false;
    }

    runInAction(() => {
      this.billInformationModel = {
        ...this.billInformationModel,
        [targetKey]: value,
      };
    });
  };

  billInformationValid = (key: string, value: string) => {
    if (value === "") {
      return true; // 빈 문자열은 항상 허용
    }

    switch (key) {
      case "name":
        // 숫자, 영문 대소문자, 한글, 특수문자 '(', ')' 허용
        return /^[0-9a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣()]+$/.test(value);
      case "license":
        // 숫자만 허용
        return /^[0-9]+$/.test(value);
      case "president":
        // 영문과 한글만 허용
        return /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣ]+$/.test(value);
      case "email":
        // 영문, @, dot(.)만 허용
        return /^[a-zA-Z@.]+$/.test(value);
      case "contact":
        // 숫자만 허용
        return /^[0-9]+$/.test(value);
      default:
        return false; // 지정된 키가 아닌 경우는 유효하지 않음
    }
  };

  accountValid = (key: string, newValue: string): ValidType => {
    if (newValue === "") {
      return ValidType.DEFAULT; // 빈 문자열은 항상 허용
    }

    switch (key) {
      case "id":
        return newValue.length > 3
          ? ValidType.PASS
          : newValue.length < 1
          ? ValidType.DEFAULT
          : ValidType.FAIL;
      case "password":
        return newValue.length > 3
          ? ValidType.PASS
          : newValue.length < 1
          ? ValidType.DEFAULT
          : ValidType.FAIL;

      case "passwordCheck":
        return this.adminAccountModel.password === newValue
          ? ValidType.PASS
          : newValue.length < 1
          ? ValidType.DEFAULT
          : ValidType.FAIL;

      case "name":
        return newValue.length > 1
          ? ValidType.PASS
          : newValue.length < 1
          ? ValidType.DEFAULT
          : ValidType.FAIL;

      case "phone":
        return newValue.length > 9
          ? ValidType.PASS
          : newValue.length < 1
          ? ValidType.DEFAULT
          : ValidType.FAIL;

      default:
        return ValidType.FAIL; // 지정된 키가 아닌 경우는 유효하지 않음
    }
  };

  handleToggleViewPassword = (event: MouseEvent<HTMLOrSVGElement>) => {
    const { id } = event.currentTarget.dataset;

    if (id === "admin") {
      runInAction(() => {
        this.adminAccountModel = {
          ...this.adminAccountModel,
          isViewPassword: !this.adminAccountModel.isViewPassword,
        };
      });
    } else {
      runInAction(() => {
        this.monitorAccountModel = {
          ...this.monitorAccountModel,
          isViewPassword: !this.monitorAccountModel.isViewPassword,
        };
      });
    }
  };

  handleClickUserUpdate = (event: MouseEvent<HTMLButtonElement>) => {
    const valid = this.checkValidation(UserDataUpdateType.USERINFOMATION);
    if (valid === "") {
      this.updateManager();
      runInAction(() => {
        this.loginAccountModel = {
          name: "",
          phone: "",
          nameValid: ValidType.DEFAULT,
          phoneValid: ValidType.DEFAULT,
        };
        this.isOpenAlert = true;
        setTimeout(() => {
          runInAction(() => {
            this.isOpenAlert = false;
          });
        }, 3000);
      });
    } else {
      runInAction(() => {
        this.loginAccountModel = {
          ...this.loginAccountModel,
          [valid]: ValidType.FAIL,
        };
      });
    }
  };

  handleClickAccountUpdate = (event: MouseEvent<HTMLButtonElement>) => {
    const valid = this.checkValidation(UserDataUpdateType.ACCOUNT);
    if (valid === "") {
      this.updateAccount();
      runInAction(() => {
        this.adminAccountModel = {
          ...this.adminAccountModel,
          id: "",
          idValid: ValidType.DEFAULT,
        };
        this.isOpenAlert = true;
        setTimeout(() => {
          runInAction(() => {
            this.isOpenAlert = false;
          });
        }, 3000);
      });
    } else {
      runInAction(() => {
        this.adminAccountModel = {
          ...this.adminAccountModel,
          idValid: ValidType.FAIL,
        };
      });
    }
  };

  handleClickPasswordUpdate = (event: MouseEvent<HTMLButtonElement>) => {
    const valid = this.checkValidation(UserDataUpdateType.PASSWORD);
    if (valid === "") {
      this.updatePassword();
      runInAction(() => {
        this.adminAccountModel = {
          ...this.adminAccountModel,
          password: "",
          passwordCheck: "",
          passwordValid: ValidType.DEFAULT,
          passwordCheckValid: ValidType.DEFAULT,
        };
        this.isOpenAlert = true;
        setTimeout(() => {
          runInAction(() => {
            this.isOpenAlert = false;
          });
        }, 3000);
      });
    } else {
      runInAction(() => {
        this.adminAccountModel = {
          ...this.adminAccountModel,
          [valid]: ValidType.FAIL,
        };
      });
    }
  };

  checkValidation = (type: UserDataUpdateType) => {
    switch (type) {
      case UserDataUpdateType.USERINFOMATION:
        if (this.loginAccountModel.name.length < 2) return "nameValid";
        if (this.loginAccountModel.phone.length < 10) return "phoneValid";
        return "";

      case UserDataUpdateType.ACCOUNT:
        if (this.adminAccountModel.id.length < 4) return "idValid";
        return "";

      case UserDataUpdateType.PASSWORD:
        if (this.adminAccountModel.password.length < 4) return "passwordValid";
        if (
          this.adminAccountModel.password !==
          this.adminAccountModel.passwordCheck
        )
          return "passwordCheckValid";
        return "";
    }
  };
}
