import { SortType } from "config/constants";

export default class TableModel {
  public title: string = "";
  public column: string = "";
  public align: "left" | "center" | "right" | "justify" | "char" | undefined =
    "left";
  public size?: string = "";
  public rowSpan?: boolean = false;
  public isSort?: boolean = false;
  public sortState?: SortType = SortType.DEFAULT;
}

[
  {
    mid: "PumaV400",
    date: "2023-09-07 13:26:39",
    message: "칩 CONVEYOR에 문제가 발생하였습니다.",
  },
  {
    mid: "PumaV400",
    date: "2023-09-07 09:47:27",
    message:
      "척 클램프압 하이/로우 절환 중이거나 척 클램프 모드가 변경되었습니다.",
  },
  {
    mid: "PumaV400",
    date: "2023-09-07 09:47:24",
    message: "척 언클램프 상태입니다.",
  },
  {
    mid: "PumaV400",
    date: "2023-09-07 09:14:42",
    message: "주축 오버라이드 스위치가 0% 입니다.",
  },
  {
    mid: "PumaV400",
    date: "2023-09-07 08:54:32",
    message:
      "척 클램프압 하이/로우 절환 중이거나 척 클램프 모드가 변경되었습니다.",
  },
  {
    mid: "PumaV400",
    date: "2023-09-07 08:42:28",
    message: "척 언클램프 상태입니다.",
  },
  {
    mid: "PumaV400",
    date: "2023-09-07 07:35:04",
    message: "원점 위치에서 원점 복귀 지령이 되었습니다.",
  },
  {
    mid: "Lynx220LC",
    date: "2023-09-07 13:01:05",
    message: "PARTS COUNT END ALARM",
  },
  {
    mid: "Lynx220LC",
    date: "2023-09-07 09:27:05",
    message: "CHUCK UNCLAMP STATUS",
  },
  {
    mid: "Lynx220LC",
    date: "2023-09-07 09:21:29",
    message: "SPINDLE ALARM IS DETECTED",
  },
  {
    mid: "Lynx220LSY",
    date: "2023-09-07 09:23:23",
    message: "Q-SETTER SWING ARM UP/DOWN SWITCH CHECK ERROR",
  },
  {
    mid: "Lynx220LSY",
    date: "2023-09-07 07:36:26",
    message: "REF.RETURN COMMANDED AT REF.POSITION",
  },
  {
    mid: "Lynx220LSY",
    date: "2023-09-07 07:34:57",
    message: "TOOL FIX CHECK SWITCH ALARM",
  },
  {
    mid: "Puma280",
    date: "2023-09-07 11:37:48",
    message: "PARTS COUNT END ALARM",
  },
];

[
  {
    mid: "PumaV400",
    date: "2023-09-07 13:26:39",
    message: "칩 CONVEYOR에 문제가 발생하였습니다.",
  },
  {
    mid: "Lynx220LC",
    date: "2023-09-07 13:01:05",
    message: "PARTS COUNT END ALARM",
  },
  {
    mid: "Puma280",
    date: "2023-09-07 11:37:48",
    message: "PARTS COUNT END ALARM",
  },
  {
    mid: "PumaV400",
    date: "2023-09-07 09:47:27",
    message:
      "척 클램프압 하이/로우 절환 중이거나 척 클램프 모드가 변경되었습니다.",
  },
  {
    mid: "PumaV400",
    date: "2023-09-07 09:47:24",
    message: "척 언클램프 상태입니다.",
  },
  {
    mid: "Lynx220LC",
    date: "2023-09-07 09:27:05",
    message: "CHUCK UNCLAMP STATUS",
  },
  {
    mid: "Lynx220LSY",
    date: "2023-09-07 09:23:23",
    message: "Q-SETTER SWING ARM UP/DOWN SWITCH CHECK ERROR",
  },
  {
    mid: "Lynx220LC",
    date: "2023-09-07 09:21:29",
    message: "SPINDLE ALARM IS DETECTED",
  },
  {
    mid: "PumaV400",
    date: "2023-09-07 09:14:42",
    message: "주축 오버라이드 스위치가 0% 입니다.",
  },
  {
    mid: "PumaV400",
    date: "2023-09-07 08:54:32",
    message:
      "척 클램프압 하이/로우 절환 중이거나 척 클램프 모드가 변경되었습니다.",
  },
  {
    mid: "PumaV400",
    date: "2023-09-07 08:42:28",
    message: "척 언클램프 상태입니다.",
  },
  {
    mid: "Lynx220LSY",
    date: "2023-09-07 07:36:26",
    message: "REF.RETURN COMMANDED AT REF.POSITION",
  },
  {
    mid: "PumaV400",
    date: "2023-09-07 07:35:04",
    message: "원점 위치에서 원점 복귀 지령이 되었습니다.",
  },
  {
    mid: "Lynx220LSY",
    date: "2023-09-07 07:34:57",
    message: "TOOL FIX CHECK SWITCH ALARM",
  },
];
