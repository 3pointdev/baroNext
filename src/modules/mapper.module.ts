import { plainToInstance } from "class-transformer";
import MachineDto from "../dto/machine/machine.dto";
import RealTimeDataDto from "../dto/machine/realTimeData.dto";

class MapperModule {
  public currentListMapper(plainData) {
    const mapping = {
      active: plainData.active_time,
      machine_no: plainData.machine_no,
      Mid: plainData.mid,
      Id: plainData.mkey,
      PartCount: plainData.process_count,
      PlanCount: plainData.plan_count,
      prdct_end: plainData.prdct_end,
      start_ymdt: plainData.start_ymdt,
      Block: plainData.process,
      Program: plainData.process?.includes("(")
        ? plainData.process.split("(")[1].replace(")", "")
        : plainData.process,
      wait: plainData.wait,
      pause: false,
    };

    return plainToInstance(MachineDto, mapping);
  }

  public machineStatMapper(plainData, currentData: MachineDto[]) {
    const matchData = currentData.find((data) => +data.id === +plainData.Id);

    const plainMachineData = {
      Alarm: plainData.Alarm,
      active: matchData.active,
      wait: matchData.wait,
      Block: plainData.Block,
      CycleTime: plainData.CycleTime,
      Estop: plainData.Estop,
      Execution: plainData.Execution,
      ExecutionTime: plainData.ExecutionTime,
      Id: plainData.Id,
      Mcode: plainData.Mcode,
      Message: plainData.Message,
      MessageTime: plainData.MessageEvent,
      Mid: plainData.Mid,
      Mode: plainData.Mode,
      ModeTime: plainData.ModeTime,
      PartCount: plainData.PartCount,
      PlanCount: plainData.PlanCount,
      Power: plainData.Power,
      Program: plainData.Program.includes("(")
        ? plainData.Program.split("(")[1].replace(")", "")
        : plainData.Program,
      machine_no: matchData.machineNo,
      prdct_end: matchData.prdctEnd,
      start_ymdt: matchData.startYmdt,
      pause: matchData.pause,
      doneTime: matchData.active * (plainData.PlanCount - plainData.PartCount),
    };

    const plainRealTimeData = {
      Id: plainData.Id,
      machineNo: matchData.machineNo,
      S1load: plainData.Data.S1load,
      S1speed: plainData.Data.S1speed,
      Xact: plainData.Data.Xact,
      Xload: plainData.Data.Xload,
      Zact: plainData.Data.Zact,
      Zload: plainData.Data.Zload,
      f_command: plainData.Data.f_command,
      line: plainData.Data.line,
      path_feedrate: plainData.Data.path_feedrate,
      path_position: plainData.Data.path_position,
      program_comment: plainData.Data.program_comment,
      tool_id: plainData.Data.tool_id,
      Bact: plainData.Data.Bact,
      Bload: plainData.Data.Bload,
      Cact: plainData.Data.Cact,
      Cload: plainData.Data.Cload,
      S2load: plainData.Data.S2load,
      S2speed: plainData.Data.S2speed,
      S320load: plainData.Data.S320load,
      S320speed: plainData.Data.S320speed,
      Yact: plainData.Data.Yact,
      Yload: plainData.Data.Yload,
      path_position2: plainData.Data.path_position2,
      program_comment2: plainData.Data.program_comment2,
      tool_id2: plainData.Data.tool_id2,
    };

    return {
      machine: plainToInstance(MachineDto, plainMachineData),
      rtd: plainToInstance(RealTimeDataDto, plainRealTimeData),
    };
  }

  public notiMapper(
    dataArray: string[],
    currentMachineData: MachineDto[],
    currentRealTimeData: RealTimeDataDto[]
  ): {
    machine: MachineDto;
    rtd: RealTimeDataDto;
  } {
    const matchData = currentMachineData.find(
      (data) => +data.id === +dataArray[4]
    );
    const matchRTData = currentRealTimeData.find(
      (data) => +data.id === +dataArray[4]
    );

    if (matchData === undefined || matchRTData === undefined) {
      throw "아직 머신상태가 수신되지 않았습니다.";
    }

    for (let i = 6; i < dataArray.length; i = i + 2) {
      const targetKey = dataArray[i].toLowerCase().replace("_", "");
      const RtKey = Object.keys(matchRTData).find(
        (key: string) => key.toLowerCase().replace("_", "") === targetKey
      );
      if (RtKey) {
        matchRTData[RtKey] = dataArray[i + 1];
      } else {
        const MachineKey = Object.keys(matchData).find(
          (key) => key.toLowerCase().replace("_", "") === targetKey
        );
        if (MachineKey) {
          matchData[MachineKey] = dataArray[i + 1];
        }
      }
    }

    matchData.doneTime =
      matchData.active * (matchData.planCount - matchData.partCount);
    console.log(matchData, matchRTData);
    return { machine: matchData, rtd: matchRTData };
  }

  public partCountMapper(dataArray: string[], currentData: MachineDto[]) {
    const matchData = currentData.find((data) => +data.id === +dataArray[13]);

    matchData.active = +dataArray[11];
    matchData.partCount = +dataArray[5];
    matchData.planCount = +dataArray[6];
    matchData.wait = +dataArray[10];

    return matchData;
  }
}

const mapperInstance = new MapperModule();
export default mapperInstance;
