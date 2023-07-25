import { Expose, Type } from "class-transformer";
import RealTimeDataDto from "./realTimeData.dto";

export default class MachineDto {
  @Expose({ name: "Alarm" })
  public alarm: string = "";

  @Expose({ name: "active" })
  public active: number = 0;

  @Expose({ name: "wait" })
  public wait: number = 0;

  @Expose({ name: "Block" })
  public block: string = "";

  @Expose({ name: "CycleTime" })
  public cycleTime: number = 0;

  @Expose({ name: "Estop" })
  public estop: string = "";

  @Expose({ name: "Execution" })
  public execution: string = "";

  @Expose({ name: "ExecutionTime" })
  public executionTime: number = 0;

  @Expose({ name: "Id" })
  public id: string = "";

  @Expose({ name: "Mcode" })
  public mcode: string = "";

  @Expose({ name: "Message" })
  public message: string = "";

  @Expose({ name: "MessageTime" })
  public messageTime: number = 0;

  @Expose({ name: "Mid" })
  public mid: string = "";

  @Expose({ name: "Mode" })
  public mode: string = "";

  @Expose({ name: "ModeTime" })
  public modeTime: number = 0;

  @Expose({ name: "PartCount" })
  public partCount: number = 0;

  @Expose({ name: "PlanCount" })
  public planCount: number = 0;

  @Expose({ name: "Power" })
  public power: boolean;

  @Expose({ name: "Program" })
  public program: string = "";

  @Expose({ name: "machine_no" })
  public machineNo: number = 0;

  @Expose({ name: "prdct_end" })
  public prdctEnd: string = "";

  @Expose({ name: "start_ymdt" })
  public startYmdt: string = "";

  @Expose({ name: "pause" })
  public pause: boolean = false;

  @Expose({ name: "doneTime" })
  public doneTime?: number = 0;
}
