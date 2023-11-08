import { plainToInstance } from "class-transformer";
import { ExceptionBlockType, MachineExecutionType } from "config/constants";
import MachineDto from "src/dto/machine/machine.dto";
import RealTimeDataDto from "src/dto/machine/realTimeData.dto";

class MapperModule {
  public currentListMapper(plainData) {
    const mapping = {
      Period: plainData.active,
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

    console.log(plainToInstance(MachineDto, mapping));

    return plainToInstance(MachineDto, mapping);
  }

  public machineStatMapper(plainData, matchData: MachineDto) {
    const now = new Date().getTime();
    const activeTime = +matchData.activeTime;
    const workTime = +plainData.WorkTime;
    const tActiveTime = +plainData.TActiveTime;
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

    // 남은시간 계산
    if (workTime > 0) {
      if (tActiveTime > 0) {
        remainTime = activeTime - workTime - (now - tActiveTime);
      } else {
        remainTime = activeTime - workTime;
      }
    } else {
      remainTime = activeTime - (now - tActiveTime);
    }

    const plainMachineData = {
      Period: matchData.period,
      Alarm: plainData.Alarm,
      ActiveTime: activeTime,
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
        (activeTime + matchData.wait) *
        (plainData.PlanCount - plainData.PartCount),
      WorkTime: workTime,

      isChangePalette: ExceptionBlockType.PALETTE.includes(plainData.Block),
      isReceivePartCount:
        plainData.CountTime < plainData.ActiveTime && now > plainData.ActiveTime
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

  /**
   * extraNoti 수신 시 데이터 맵핑함수
   * @param dataArray 수신 된 바이너리 데이터 배열
   * @param matchData 기존 machineData
   * @param matchRTData 기존 realTimeData
   * @returns { machine: matchData, rtd: matchRTData }
   */
  public notiMapper(
    dataArray: any[],
    matchData: MachineDto,
    matchRTData: RealTimeDataDto
  ): {
    machine: MachineDto;
    rtd: RealTimeDataDto;
  } {
    for (let i = 6; i < dataArray.length; i = i + 2) {
      // noti로 수신 된 key를 '_'빼고 소문자로 전환
      const targetKey = dataArray[i].toLowerCase().replace("_", "");

      // 전환된 key와 기존 realTimeData에 일치하는 key가 있는지 찾아 저장
      const RtKey = matchRTData
        ? getSameKeyInObject(matchRTData, targetKey)
        : false;

      if (RtKey) {
        // realTimeData에 일치하는 key가 있다면 해당 값 업데이트
        matchRTData[RtKey] = dataArray[i + 1];
      } else {
        // machineData에 일치하는 key를 찾아 저장
        const machineKey = getSameKeyInObject(matchData, targetKey);

        // 저장된 key가 있으면서 activeTime이 아닌 경우 값 업데이트
        if (machineKey && machineKey !== "activeTime") {
          matchData[machineKey] = dataArray[i + 1];
        }

        // 일치하는 key가 block인 경우 정지신호인지 투팔레트 변경신호인지 확인하여 저장
        if (machineKey === "block") {
          matchData.pause = ExceptionBlockType.PAUSE.includes(dataArray[i + 1]);
          matchData.isChangePalette = ExceptionBlockType.PALETTE.includes(
            dataArray[i + 1]
          );
        }
      }
    }

    if (matchData.isChangePalette && matchData.isReceivePartCount) {
      // 파트카운트가 변경되었는데 테이블 멈춤중이었다가 해제되었을 경우

      var tbltime = matchData.beforePartCountTime; // 가공이 시작된 테이블코드

      if (tbltime !== undefined) {
        // 이전에 해당 테이블 코드로 가공시간이 있다면
        matchData.remainTime = tbltime;
      } else {
        // 없으면 이전 가공시간
        matchData.remainTime = +matchData.activeTime;
      }
      matchData.isReceivePartCount = false;
      matchData.pause = false;
      matchData.isChangePalette = false;
    } else if (dataArray.includes("execution")) {
      // 업데이트 후 execution이 변경된 경우 다음 조치
      // 1. execution이 active이면서 직전에 partCount가 입력된 경우 남은 작업시간 업데이트
      // 2. 메시지와 파트카운트 리시브상태 초기화
      if (
        matchData.execution === MachineExecutionType.ACTIVE &&
        matchData.isReceivePartCount
      ) {
        matchData.remainTime = +matchData.activeTime;
        matchData.isReceivePartCount = false;
      }
      matchData.isReceiveMessage = false;
    }

    if (matchData.isReceiveMessage === true && dataArray.includes("RESET")) {
      matchData.isReceiveMessage = false;
    }

    // 업데이트 후 estop이 트리거 이거나 power가 false인 경우 전원OFF 업데이트
    if (
      matchData.estop === MachineExecutionType.TRIGGERED ||
      !matchData.power
    ) {
      matchData.execution = MachineExecutionType.OFF;
    }

    return { machine: matchData, rtd: matchRTData };
  }

  public partCountMapper(dataArray: string[], matchData: MachineDto) {
    if (matchData.partCount !== +dataArray[5]) {
      matchData.beforePartCountTime = new Date().getTime();
      matchData.partCount = +dataArray[5];
      matchData.isReceivePartCount = true;
    }
    matchData.period = +dataArray[9];
    matchData.activeTime = dataArray[11];
    matchData.planCount = +dataArray[6];
    matchData.wait = +dataArray[10];
    matchData.isReceiveMessage = false;
    matchData.pause = false;
    matchData.execution = MachineExecutionType.STOPPED;
    matchData.doneTime =
      (+dataArray[11] + +dataArray[10]) * (+dataArray[6] - +dataArray[5]);

    return matchData;
  }
}

const getSameKeyInObject = (
  object: { [key: string]: any },
  targetKey: string
) => {
  return Object.keys(object).find(
    (key) => key.toLowerCase().replace("_", "") === targetKey
  );
};

const mapperInstance = new MapperModule();
export default mapperInstance;
