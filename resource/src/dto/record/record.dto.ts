import { Expose } from "class-transformer";

export default class RecordDto {
  @Expose({ name: "started_at" })
  public readonly date: string = "";

  @Expose({ name: "mkey" })
  public readonly mkey: number = 0;

  @Expose({ name: "mid" })
  public readonly mid: string = "";

  @Expose({ name: "program" })
  public readonly program: string = "";

  @Expose({ name: "plan" })
  public readonly planCount: number = 0;

  @Expose({ name: "count" })
  public readonly partCount: number = 0;

  @Expose({ name: "rate" })
  public achieve: string = "";

  @Expose({ name: "oper_rate" })
  public uptime: string = "";

  @Expose({ name: "prdct_rate" })
  public tolerance: string = "";

  @Expose({ name: "lot" })
  public readonly lot: number = 0;
}
