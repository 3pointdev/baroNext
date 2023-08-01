import moment from "moment";

export default class RecordModel {
  public startDay: string = moment(new Date()).format("YYYY-MM-DD");
  public endDay: string = moment(new Date()).format("YYYY-MM-DD");
}
