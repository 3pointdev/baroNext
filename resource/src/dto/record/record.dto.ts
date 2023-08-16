import { Expose } from "class-transformer";

export default class RecordDto {
  @Expose({ name: "mid" })
  public readonly mid: string = "";
  @Expose({ name: "program" })
  public readonly program: string = "";
  @Expose({ name: "count" })
  public readonly count: string = "";
}
