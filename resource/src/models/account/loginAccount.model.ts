import { ValidType } from "config/constants";

export default class LoginAccountModel {
  public name: string = "";
  public phone: string = "";
  public nameValid: ValidType = ValidType.DEFAULT;
  public phoneValid: ValidType = ValidType.DEFAULT;
}
