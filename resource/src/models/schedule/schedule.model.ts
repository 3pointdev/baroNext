import { Expose } from "class-transformer";
import { ScheduleType } from "config/constants";

export default class ScheduleModel {
  @Expose({ name: "id" })
  public id: number = 0;

  @Expose({ name: "description" })
  public columnTitle: string = "";

  @Expose({ name: "start_time" })
  public startTime: string = "";

  @Expose({ name: "end_time" })
  public endTime: string = "";

  @Expose({ name: "type" })
  public type: string = ScheduleType.STD;

  public startTimePlaceholder?: string = "";

  public endTimePlaceholder?: string = "";

  public isAddColumn?: boolean = false;

  public isEditMode?: boolean = false;
}
