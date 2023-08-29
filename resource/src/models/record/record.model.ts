import dayjs from "dayjs";

export default class RecordModel {
  public startDay: string = dayjs(new Date()).format("YYYY-MM-DD");
  public endDay: string = dayjs(new Date()).format("YYYY-MM-DD");
}
