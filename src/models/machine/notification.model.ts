import { Expose } from "class-transformer";
import moment from "moment";

export default class NotificationModel {
  public startDay: string = moment(new Date()).format("YYYY-MM-DD");
  public endDay: string = moment(new Date()).format("YYYY-MM-DD");
  public mkey: number | string = 0;
  public searchKeyword: string = "";
}
