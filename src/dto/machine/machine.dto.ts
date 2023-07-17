import { Expose } from "class-transformer";

export default class MachineDto {
  @Expose({ name: "active" })
  public readonly active: number = 0;

  @Expose({ name: "active_time" })
  public readonly activeTime: number = 0;

  @Expose({ name: "lot" })
  public readonly lot: number = 0;

  @Expose({ name: "machine_no" })
  public readonly machineNo: string = "";

  @Expose({ name: "mid" })
  public readonly mid: string = "";

  @Expose({ name: "mkey" })
  public readonly mkey: number = 0;

  @Expose({ name: "plan_count" })
  public readonly planCount: number = 0;

  @Expose({ name: "prdct_end" })
  public readonly prdctEnd: string = "";

  @Expose({ name: "process" })
  public readonly process: string = "";

  @Expose({ name: "process_count" })
  public readonly processCount: number = 0;

  @Expose({ name: "start_ymdt" })
  public readonly startYmdt: string = "";

  @Expose({ name: "status" })
  public readonly status: string = "";

  @Expose({ name: "wait" })
  public readonly wait: number = 0;
}
