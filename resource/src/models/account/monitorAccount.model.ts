import { ValidType } from "../../../config/constants";

export default class MonitorAccountModel {
  public id: string = "";
  public password: string = "";
  public passwordCheck: string = "";
  public passwordValid: ValidType = ValidType.DEFAULT;
  public passwordCheckValid: ValidType = ValidType.DEFAULT;
  public isViewPassword: boolean = false;
}
