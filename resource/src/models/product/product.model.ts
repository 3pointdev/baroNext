import dayjs from "dayjs";

export default class ProductModel {
  public day: string = dayjs(new Date())
    .subtract(1, "day")
    .format("YYYY-MM-DD");
  public mkey: string = "%";
}
