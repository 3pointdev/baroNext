import { plainToInstance } from "class-transformer";
import MachineDto from "../dto/machine/machine.dto";
import RealTimeDataDto from "../dto/machine/realTimeData.dto";

export default function DataTransformModule(
  newData: any,
  existingData: MachineDto,
  isCurrent: boolean
) {
  let result;

  if (isCurrent) {
    result = {
      Alarm: "",
      CountTime: 0,
      CycleTime: 0,
      Data: new RealTimeDataDto(),
      Ent: "",
      Estop: "",
      Execution: "",
      ExecutionTime: "",
      HasDataModi: "",
      Mcode: "",
      Message: "",
      MessageTime: 0,
      Mode: "",
      ModeTime: 0,
      SendByte: 0,
      State: 0,
      StopTime: 0,
      TActiveTime: 0,
      Time: "",
      WorkTime: 0,
      active: newData.active,
      wait: newData.wait,
      ActiveTime: newData.active_time,
      Id: newData.mkey,
      IdleTime: newData.wait,
      PartCount: newData.process_count,
      PlanCount: newData.plan_count,
      Power: newData.status === "on" ? true : false,
      Mid: newData.mid,
      machine_no: newData.machine_no,
      lot: newData.lot,
      prdct_end: newData.prdct_end,
      start_ymdt: newData.start_ymdt,
      Block: newData.process,
      Program: newData.process.match(/\(/)
        ? newData.process.split("(")[1].replace(")", "")
        : newData.process,
      doneTime:
        (newData.active + newData.wait) *
        (newData.plan_count - newData.part_count),
    };
  } else {
    result = {
      ...newData,
      Program: newData.Program.match(/\(/)
        ? newData.Block.split("(")[1]?.replace(")", "")
        : newData.Block,
      wait: existingData?.wait,
      machine_no: existingData?.machineNo,
      lot: existingData?.lot,
      prdct_end: existingData?.prdctEnd,
      start_ymdt: existingData?.startYmdt,
      active: existingData?.active,
      doneTime:
        (existingData.active + existingData.wait) *
        (newData.PlanCount - newData.PartCount),
    };
  }
  return plainToInstance(MachineDto, result);
}
