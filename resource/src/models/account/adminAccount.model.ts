import { ValidType } from "../../../config/constants";

export default class AdminAccountModel {
  public id: string = "";
  public idValid: ValidType = ValidType.DEFAULT;
  public password: string = "";
  public passwordCheck: string = "";
  public passwordValid: ValidType = ValidType.DEFAULT;
  public passwordCheckValid: ValidType = ValidType.DEFAULT;
  public isViewPassword: boolean = false;
}
