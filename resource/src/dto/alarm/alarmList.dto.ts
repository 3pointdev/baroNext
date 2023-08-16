import { Expose } from "class-transformer";
import AlarmDto from "./alarm.dto";

export default class AlarmListDto {
  @Expose({ name: "un_read" })
  public readonly unRead: number = 0;

  @Expose({ name: "alarms" })
  public readonly alarms: AlarmDto[] = [];
}
