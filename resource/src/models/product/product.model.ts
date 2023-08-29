import dayjs from "dayjs";

export default class ProductModel {
  public day: string = dayjs(new Date()).format("YYYY-MM-DD");
  public mkey: string = "%";
}
