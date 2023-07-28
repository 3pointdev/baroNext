import { Expose } from "class-transformer";

export default class ProductDataDto {
  @Expose({ name: "active" })
  public readonly active: number = 0;

  @Expose({ name: "count" })
  public readonly count: number = 0;

  @Expose({ name: "end" })
  public readonly end: string = "";

  @Expose({ name: "idle" })
  public readonly idle: number = 0;

  @Expose({ name: "lot" })
  public readonly lot: number = 0;

  @Expose({ name: "machine_no" })
  public readonly machineNo: string = "";

  @Expose({ name: "mid" })
  public readonly mid: string = "";

  @Expose({ name: "mkey" })
  public readonly mkey: number = 0;

  @Expose({ name: "plan" })
  public readonly plan: number = 0;

  @Expose({ name: "program" })
  public readonly program: string = "";

  @Expose({ name: "start" })
  public readonly start: string = "";

  @Expose({ name: "total" })
  public readonly total: number = 0;
}
