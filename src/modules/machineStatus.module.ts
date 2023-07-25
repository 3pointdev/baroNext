import { MachineExecutionType, MachineStateType } from "../../config/constants";

class MachineStatusModule {
  public ToStringStatus(
    power: boolean,
    mode: string,
    execution: string,
    isDone: boolean,
    isAlert?: boolean
  ) {
    if (!power) {
      return "전원꺼짐";
    }

    if (mode !== "AUTOMATIC") {
      return "수정 중";
    }

    if (isAlert) {
      return "알람발생";
    }

    switch (execution) {
      case MachineExecutionType.ACTIVE:
        return "가공중";
      case MachineExecutionType.READY:
        return "READY";
      case MachineExecutionType.TRIGGERED:
        return "비상정지";
      case MachineExecutionType.STOPPED || MachineExecutionType.INTERRUPTED:
        if (isDone) {
          return "가공완료";
        } else {
          return "대기 중";
        }
    }
  }

  public ToColorStatus(execution: string) {
    switch (execution) {
      case MachineExecutionType.ACTIVE:
        return "#6ebd33";

      case MachineExecutionType.OFF:
        return "#d5d7da";

      case MachineExecutionType.TRIGGERED:
        return "#e8661c";

      case MachineExecutionType.STOPPED:
        return "#f5b117";

      case MachineExecutionType.READY:
        return "#f5b117";

      case MachineExecutionType.INTERRUPTED:
        return "#f5b117";

      default:
        return "#d5d7da";
    }
  }

  public ToClassStatus(
    power: boolean,
    mode: string,
    execution: string,
    isDone: boolean,
    isAlert?: boolean
  ) {
    if (!power) {
      return MachineStateType.OFF;
    }

    if (mode !== "AUTOMATIC") {
      return MachineStateType.MODIFY;
    }

    if (isAlert) {
      return MachineStateType.ALARM;
    }

    switch (execution) {
      case MachineExecutionType.ACTIVE:
        return MachineStateType.RUNNING;
      case MachineExecutionType.READY:
        return MachineStateType.READY;
      case MachineExecutionType.TRIGGERED:
        return MachineStateType.EMERGENCY_STOP;
      case MachineExecutionType.STOPPED || MachineExecutionType.INTERRUPTED:
        if (isDone) {
          return MachineStateType.SUCCESS;
        } else {
          return MachineStateType.WAIT;
        }
    }
  }
}

export default new MachineStatusModule();
