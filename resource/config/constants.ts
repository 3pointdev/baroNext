export const NUMBERSEENMONITORING2 = 4;

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
 * 색상
 */
export const StyleColor = {
  PRIMARY: "#3A79EC",
  EMPHASIS: "#E7EFFD",
  BRIGHTEMPHASIS: "#F5F8FE",
  INFOMATION: "#FFEAE9",
  HOVER: "#F0F0F0",
  DISABLE: "#9C9C9C",
  LIGHT: "#FFFFFF",
  DARK: "#000000",
  WARNNING: "#FF4D49",
  BACKGROUND: "#F7F7F9",
  POSITIVE: "#71E61A",
  BORDER: "#D9D9D9",
} as const;
export type StyleColor = (typeof StyleColor)[keyof typeof StyleColor];

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
  BROADCAST: "BROADCAST",
} as const;
export type SocketResponseType =
  (typeof SocketResponseType)[keyof typeof SocketResponseType];

/**
 * Socket Broadcast 타입
 */
export const SocketBroadcastType = {
  NOTICE: "notice",
  RELOAD: "reload",
} as const;
export type SocketBroadcastType =
  (typeof SocketBroadcastType)[keyof typeof SocketBroadcastType];

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

/**
 * 유효성 검사 타입
 */
export const ValidType = {
  PASS: 0,
  DEFAULT: 1,
  FAIL: 2,
} as const;
export type ValidType = (typeof ValidType)[keyof typeof ValidType];

/**
 * 기계 상황별 색상 타입
 */
export const MachineColorType = {
  GREEN: "#2F983E",
  YELLOW: "#F2994A",
  RED: "#D11313",
  GRAY: "#777",
} as const;
export type MachineColorType =
  (typeof MachineColorType)[keyof typeof MachineColorType];

/**
 * 기계 상황별 텍스트 타입
 */
export const MachineTextType = {
  ACTIVE: "가공 중",
  SUCCESS: "가공완료",
  READY: "대기 중",
  MODIFY: "수정 중",
  PAUSE: "일시정지",
  EMERGENCY: "비상정지",
  ALARM: "알람발생",
  OFF: "전원꺼짐",
} as const;
export type MachineTextType =
  (typeof MachineTextType)[keyof typeof MachineTextType];

/**
 * 특수 블럭 코드 타입
 */
export const ExceptionBlockType = {
  PAUSE: ["M0", "M00", "M1", "M01", "M61", "M62"],
  PALETTE: ["M61", "M62"],
} as const;
export type ExceptionBlockType =
  (typeof ExceptionBlockType)[keyof typeof ExceptionBlockType];

/**
 * 표 포멧 타입
 */
export const TableFormatType = {
  ALL: 0,
  MACHINE: 1,
  PROGRAM: 2,
} as const;
export type TableFormatType =
  (typeof TableFormatType)[keyof typeof TableFormatType];

/**
 * 유저 정보 변경 타입
 */
export const UserDataUpdateType = {
  USERINFOMATION: 0,
  ACCOUNT: 1,
  PASSWORD: 2,
} as const;
export type UserDataUpdateType =
  (typeof UserDataUpdateType)[keyof typeof UserDataUpdateType];

/**
 * 코드비교 타입
 */
export const CompareType = {
  CRITERIA: 0,
  COMPARE: 1,
} as const;
export type CompareType = (typeof CompareType)[keyof typeof CompareType];
