import { Expose, Type } from "class-transformer";
import RealTimeDataDto from "./realTimeData.dto";

export default class MachineDto {
  @Expose({ name: "active" })
  public active: number = 0;

  @Expose({ name: "wait" })
  public wait: number = 0;

  @Expose({ name: "ActiveTime" })
  public activeTime: number = 0;

  @Expose({ name: "Alarm" })
  public alarm: string = "";

  @Expose({ name: "Block" })
  public block: string = "";

  @Expose({ name: "CountTime" })
  public countTime: number = 0;

  @Expose({ name: "CycleTime" })
  public cycleTime: number = 0;

  @Expose({ name: "Data" })
  @Type(() => RealTimeDataDto)
  public data: RealTimeDataDto = new RealTimeDataDto();

  @Expose({ name: "Ent" })
  public ent: string = "";

  @Expose({ name: "Estop" })
  public estop: string = "";

  @Expose({ name: "Execution" })
  public execution: string = "";

  @Expose({ name: "ExecutionTime" })
  public executionTime: number = 0;

  @Expose({ name: "HasDataModi" })
  public hasDataModi: boolean;

  @Expose({ name: "Id" })
  public id: string = "";

  @Expose({ name: "IdleTime" })
  public idleTime: number = 0;

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

  @Expose({ name: "SendByte" })
  public sendByte: number = 0;

  @Expose({ name: "State" })
  public state: number = 0;

  @Expose({ name: "StopTime" })
  public stopTime: number = 0;

  @Expose({ name: "TActiveTime" })
  public tActiveTime: number = 0;

  @Expose({ name: "Time" })
  public time: string = "";

  @Expose({ name: "WorkTime" })
  public workTime: number = 0;

  @Expose({ name: "machine_no" })
  public machineNo: number = 0;

  @Expose({ name: "lot" })
  public lot: number = 0;

  @Expose({ name: "prdct_end" })
  public prdctEnd: string = "";

  @Expose({ name: "start_ymdt" })
  public startYmdt: string = "";

  @Expose({ name: "doneTime" })
  public doneTime?: number = 0;
}
