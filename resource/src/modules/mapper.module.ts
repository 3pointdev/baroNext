import { plainToInstance } from "class-transformer";
import { ExceptionBlockType, MachineExecutionType } from "config/constants";
import MachineDto from "src/dto/machine/machine.dto";
import RealTimeDataDto from "src/dto/machine/realTimeData.dto";

class MapperModule {
  public currentListMapper(plainData) {
    const mapping = {
      WorkTime: plainData.active,
      ActiveTime: plainData.active_time,
      wait: plainData.wait,
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
      pause: false,
    };

    return plainToInstance(MachineDto, mapping);
  }

  public machineStatMapper(plainData, matchData: MachineDto) {
    let programName = plainData.Program ? plainData.Program : plainData.Block;
    let execution = plainData.Execution;
    let remainTime = 0;

    if (programName.includes("(")) {
      programName = programName.split("(")[1].replace(")", "");
    }

    if (programName.includes("%")) {
      programName = programName.replaceAll("%", "");
    }

    if (!plainData.Power) {
      execution = MachineExecutionType.OFF;
    }

    // 현재시각
    const now = new Date().getTime();

    // workTime, tActiveTime 모두 있는 경우
    if (+plainData.WorkTime > 0 && +plainData.TActiveTime > 0) {
      remainTime =
        +matchData.activeTime -
        +plainData.WorkTime -
        (now - +plainData.TActiveTime);
    }

    // workTime은 있으나 tActiveTime이 없는 경우
    if (+plainData.WorkTime > 0) {
      remainTime = +matchData.activeTime - +plainData.WorkTime;
    }

    // workTime과 tActiveTime 모두 없는 경우
    remainTime = +matchData.activeTime - (now - +plainData.ActiveTime);

    const plainMachineData = {
      Alarm: plainData.Alarm,
      ActiveTime: matchData.activeTime,
      remainTime: remainTime,
      wait: matchData.wait,
      Block: plainData.Block,
      CycleTime: plainData.CycleTime,
      Estop: plainData.Estop,
      Execution: execution,
      ExecutionTime: plainData.ExecutionTime,
      Id: plainData.Id,
      Mcode: plainData.Mcode,
      Message: plainData.Message,
      MessageTime: plainData.MessageTime,
      Mid: plainData.Mid,
      Mode: plainData.Mode,
      ModeTime: plainData.ModeTime,
      PartCount: plainData.PartCount,
      PlanCount: plainData.PlanCount,
      Power: plainData.Power,
      Program: programName,
      machine_no: matchData.machineNo,
      prdct_end: matchData.prdctEnd,
      start_ymdt: matchData.startYmdt,
      pause:
        ExceptionBlockType.PAUSE.includes(plainData.Mcode) ||
        ExceptionBlockType.PAUSE.includes(plainData.Block),
      doneTime:
        (+matchData.activeTime + matchData.wait) *
        (plainData.PlanCount - plainData.PartCount),
      WorkTime: plainData.WorkTime,

      isChangePalette: ExceptionBlockType.PALETTE.includes(plainData.Block),
      isReceivePartCount:
        plainData.CountTime < plainData.ActiveTime &&
        new Date().getTime() > plainData.ActiveTime
          ? false
          : true,
      CountTime: plainData.CountTime,
    };

    const plainRealTimeData = {
      Id: plainData.Id,
      machineNo: matchData.machineNo,
      line: plainData.Data.line,
      f_command: plainData.Data.f_command,
      path_position: plainData.Data.path_position,
      path_position2: plainData.Data.path_position2,
      path_feedrate: plainData.Data.path_feedrate,
      path_feedrate2: plainData.Data.path_feedrate2,
      Xact: plainData.Data.Xact,
      Xload: plainData.Data.Xload,
      Yact: plainData.Data.Yact,
      Yload: plainData.Data.Yload,
      Zact: plainData.Data.Zact,
      Zload: plainData.Data.Zload,
      Aact: plainData.Data.Aact,
      Aload: plainData.Data.Aload,
      Bact: plainData.Data.Bact,
      Bload: plainData.Data.Bload,
      Cact: plainData.Data.Cact,
      Cload: plainData.Data.Cload,
      S1load: plainData.Data.S1load,
      S1speed: plainData.Data.S1speed,
      S2load: plainData.Data.S2load,
      S2speed: plainData.Data.S2speed,
      S320load: plainData.Data.S320load,
      S320speed: plainData.Data.S320speed,
      program_comment: plainData.Data.program_comment,
      program_comment2: plainData.Data.program_comment2,
      tool_id: plainData.Data.tool_id,
      tool_id2: plainData.Data.tool_id2,
    };

    return {
      machine: plainToInstance(MachineDto, plainMachineData),
      rtd: plainToInstance(RealTimeDataDto, plainRealTimeData),
    };
  }

  public notiMapper(
    dataArray: any[],
    matchData: MachineDto,
    matchRTData: RealTimeDataDto
  ): {
    machine: MachineDto;
    rtd: RealTimeDataDto;
  } {
    for (let i = 6; i < dataArray.length; i = i + 2) {
      const targetKey = dataArray[i].toLowerCase().replace("_", "");
      const RtKey = matchRTData
        ? Object.keys(matchRTData).find(
            (key: string) => key.toLowerCase().replace("_", "") === targetKey
          )
        : false;
      if (RtKey) {
        matchRTData[RtKey] = dataArray[i + 1];
      } else {
        const machineKey = Object.keys(matchData).find(
          (key) => key.toLowerCase().replace("_", "") === targetKey
        );
        if (machineKey && machineKey !== "activeTime") {
          matchData[machineKey] = dataArray[i + 1];
        }

        if (machineKey === "block") {
          matchData.pause = ExceptionBlockType.PAUSE.includes(dataArray[i + 1]);
          matchData.isChangePalette = ExceptionBlockType.PALETTE.includes(
            dataArray[i + 1]
          );
        }
      }
    }

    if (matchData.estop === "TRIGGERED" || !matchData.power) {
      matchData.execution = MachineExecutionType.OFF;
    }

    if (dataArray.includes("execution")) {
      matchData.isReceiveMessage = false;
      if (matchData.execution === MachineExecutionType.ACTIVE) {
        matchData.remainTime = +matchData.activeTime;
      }
    }

    if (
      matchData.execution !== MachineExecutionType.STOPPED &&
      matchData.execution !== MachineExecutionType.INTERRUPTED
    ) {
      matchData.isReceivePartCount = false;
    }

    return { machine: matchData, rtd: matchRTData };
  }

  public partCountMapper(dataArray: string[], matchData: MachineDto) {
    matchData.activeTime = dataArray[11];
    matchData.partCount = +dataArray[5];
    matchData.planCount = +dataArray[6];
    matchData.wait = +dataArray[10];
    matchData.isReceivePartCount = true;
    matchData.isReceiveMessage = false;
    matchData.pause = false;
    matchData.execution = MachineExecutionType.STOPPED;
    matchData.doneTime =
      (+dataArray[11] + +dataArray[10]) * (+dataArray[6] - +dataArray[5]);

    return matchData;
  }
}

const mapperInstance = new MapperModule();
export default mapperInstance;
