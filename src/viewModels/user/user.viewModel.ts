import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
import { ServerUrlType, ValidType } from "../../../config/constants";
import { AxiosError, AxiosResponse } from "axios";
import UserDto from "../../dto/user/user.dto";
import { plainToInstance } from "class-transformer";
import { ChangeEvent, MouseEvent } from "react";
import LoginAccountModel from "../../models/account/loginAccount.model";
import AdminAccountModel from "../../models/account/adminAccount.model";
import MonitorAccountModel from "../../models/account/monitorAccount.model";
import BillInformationModel from "../../models/account/billInformation.model";
import { Address } from "react-daum-postcode";

export default class UserViewModel extends DefaultViewModel {
  public user: UserDto = new UserDto();
  public smsChecked: boolean = true;
  public loginAccountModel: LoginAccountModel = new LoginAccountModel();
  public adminAccountModel: AdminAccountModel = new AdminAccountModel();
  public monitorAccountModel: MonitorAccountModel = new MonitorAccountModel();
  public isOpenAddress: boolean = false;
  public billInformationModel: BillInformationModel =
    new BillInformationModel();

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

      getMe: action,
      handleChangeSmsCheck: action,
      handleChangeLoginAccount: action,
      handleChangeAdminAccount: action,
      handleChangeMonitorAccount: action,
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

  handleChangeSmsCheck = (event: ChangeEvent<HTMLInputElement>) => {
    runInAction(() => {
      this.smsChecked = !this.smsChecked;
    });
  };

  handleChangeLoginAccount = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    runInAction(() => {
      this.loginAccountModel = {
        ...this.loginAccountModel,
        [name.split("_")[1]]: value,
      };
    });
  };

  handleChangeAdminAccount = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const targetKey = name.split("_")[2];

    const validState = this.passwordValid(
      targetKey,
      value,
      this.adminAccountModel[targetKey]
    );

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

    const validState = this.passwordValid(
      targetKey,
      value,
      this.monitorAccountModel[targetKey]
    );

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

  passwordValid = (
    key: string,
    value: string,
    password?: string
  ): ValidType => {
    if (value === "") {
      return ValidType.DEFAULT; // 빈 문자열은 항상 허용
    }

    switch (key) {
      case "password":
        if (value.length >= 4) return ValidType.PASS;
        break;
      case "passwordCheck":
        if (value.length >= 4 && password) return ValidType.PASS;
        break;
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
}
