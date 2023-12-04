export const NUMBERSEENMONITORING2 = 4;

/**
 * 유저접속기기 타입
 */
export const UserAgentType = {
  IOS: "ios",
  ANDROID: "android",
  APP: "app",
  DESKTOP: "desktop",
} as const;
export type UserAgentType = (typeof UserAgentType)[keyof typeof UserAgentType];

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

/**
 * 코드비교 타입
 */
export const ScheduleType = {
  STD: "STD",
  EAT: "EAT",
  BRK: "BRK",
} as const;
export type ScheduleType = (typeof ScheduleType)[keyof typeof ScheduleType];

/**
 * 생산이력 설명서
 */
export const RecordDescription = {
  planCount: "기계에 입력 한 생산 목표량",
  partCount: "당일 생산량",
  achieve: "목표량 대비 생산 비율",
  uptime:
    "조업시간대비 절삭에 소요된 시간 비율\n- 조업시간 : 관리자페이지 내 스케줄관리에서 입력한 조업시간에서 식사 및 휴게시간을 제외한 시간\n- 절삭시간 : 조업시간 외, 식사/휴게시간 중에 발생한 절삭 시간은 제외함",
} as const;
export type RecordDescription =
  (typeof RecordDescription)[keyof typeof RecordDescription];

/**
 * 생산분석 설명서
 */
export const ReportDescription = {
  uptimeInTotalTime: "해당 기계의 당일 조업시간 대비 가동시간의 비율",
  workTimeInTotalTime:
    "해당 기계의 당일 조업시간 내 절삭에 소요된 총 시간\n- 식사/휴게시간에 진행된 절삭 시간은 제외함",
  downTimeInTotalTime:
    "조업시간에서 가동시간을 제외한 시간\n- 조업시간에는 식사/휴게시간이 포함되지 않음",
  lotChangeTime:
    "시작 : 본 가공이 시작된 시간\n종료 : 본 가공이 종료된 시간\n전체가공 : 가공종료시간에서 가공시작시간을 뺀 시간(식사, 휴게시간 포함)",
  setting:
    "해당 가공프로그램의 세팅시간\n- 이전 가공프로그램의 가공 종료 시간부터 현재 가공프로그램에서 마지막 보정이 들어간 가공이 종료된 시간\n- 마지막 보정이 들어간 가공품: 전체 생산량이 5이상이면 3번째 가공품, 5미만이면 첫번째 가공품\n- 세팅시간 산정 시 조업시간 외 이루어진 세팅은 포함\n- 식사/휴게시간에 이루어진 것은 미포함",
  averageActive: "가공시작부터 종료까지의 평균 시간",
  averageIdle:
    "이전 가공품 종료부터 현재 가공품 시작까지의 평균 시간\n- 첫번째 가공품의 준비교체 시간은 계산에서 제외",
  averageCycle: " 평균 단품 실가공 시간 + 평균 준비교체 시간",
  standardActive: "단품 가공 시 멈춤 없이 가공했을 때 걸리는 시간",
} as const;
export type ReportDescription =
  (typeof ReportDescription)[keyof typeof ReportDescription];
