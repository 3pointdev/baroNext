import moment from "moment";

export default class ProductModel {
  public day: string = moment(new Date()).format("YYYY-MM-DD");
  public mkey: string = "%";
}
