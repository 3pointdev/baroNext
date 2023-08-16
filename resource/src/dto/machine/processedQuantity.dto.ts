import { Expose } from "class-transformer";

export default class ProcessedQuantityDto {
  @Expose({ name: "count" })
  public readonly count: number = 0;

  @Expose({ name: "machine_no" })
  public readonly machineNo: string = "";

  @Expose({ name: "mid" })
  public readonly mid: string = "";
}
