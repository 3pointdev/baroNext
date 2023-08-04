/**
 * 서버주소 타입
 */
export const ServerUrlType = {
  BARO: process.env.NEXT_PUBLIC_BARO_URL,
  APIS: process.env.NEXT_PUBLIC_APIS_URL,
  EDGE: process.env.NEXT_PUBLIC_EDGE_API_URL,
  WEBSOCKET: process.env.NEXT_PUBLIC_WEBSOCKET_URL,
} as const;
export type ServerUrlType = (typeof ServerUrlType)[keyof typeof ServerUrlType];

/**
 * 엣지머신 소켓 요청데이터 타입
 */
export const EdgeMachineSocketDataType = {
  NOTI: "noti",
  ALL: "all",
} as const;
export type EdgeMachineSocketDataType =
  (typeof EdgeMachineSocketDataType)[keyof typeof EdgeMachineSocketDataType];

/**
 * 소켓 리스폰스 타입
 */
export const SocketResponseType = {
  MACHINE: "EDGE_MACHINES_STAT",
  CALL_FUNC: "CALL_FUNC_RESULT",
  CALL_FUNC_FAIL: "CALL_FUNC_FAIL",
  CONNECT: "EDGE_CONNECT",
  CLOSED: "EDGE_CLOSED",
} as const;
export type SocketResponseType =
  (typeof SocketResponseType)[keyof typeof SocketResponseType];

/**
 * 머신상태타입
 */
export const MachineExecutionType = {
  ACTIVE: "ACTIVE",
  OFF: "POWER_OFF",
  READY: "READY",
  TRIGGERED: "TRIGGERED",
  STOPPED: "STOPPED",
  INTERRUPTED: "INTERRUPTED",
} as const;
export type MachineExecutionType =
  (typeof MachineExecutionType)[keyof typeof MachineExecutionType];

/**
 * 머신구분타입
 */
export const MachineStateType = {
  OFF: "off",
  MODIFY: "modify",
  ALARM: "alarm",
  RUNNING: "runing",
  READY: "ready",
  EMERGENCY_STOP: "emergency_stop",
  SUCCESS: "success",
  WAIT: "wait",
} as const;
export type MachineStateType =
  (typeof MachineStateType)[keyof typeof MachineStateType];

/**
 * 바이너리 메시지 타입
 */
export const BinaryMessageType = {
  PART_COUNT: "PART_COUNT",
  NOTI: "NOTI",
  MESSAGE: "MESSAGE",
  ALARM: "ALARM",
} as const;
export type BinaryMessageType =
  (typeof BinaryMessageType)[keyof typeof BinaryMessageType];

/**
 * DatePicker 버튼타입
 */
export const DatePickerButtonType = {
  TODAY: "today",
  NEXT: "next",
  PREV: "prev",
} as const;
export type DatePickerButtonType =
  (typeof DatePickerButtonType)[keyof typeof DatePickerButtonType];

/**
 * DatePickerRange 타입
 */
export const DatePickerRangeType = {
  START: "startDay",
  END: "endDay",
} as const;
export type DatePickerRangeType =
  (typeof DatePickerRangeType)[keyof typeof DatePickerRangeType];

/**
 * 정렬타입
 */
export const SortType = {
  DEFAULT: "default",
  ASCENDING: "ascending",
  DESCENDING: "descending",
} as const;
export type SortType = (typeof SortType)[keyof typeof SortType];
