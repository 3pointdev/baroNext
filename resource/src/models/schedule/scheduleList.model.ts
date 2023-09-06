import ScheduleModel from "./schedule.model";

export default class ScheduleListModel {
  public id: number = 0;
  public title: string = "";
  public isCanSave: boolean = false;
  public isCanAdd: boolean = false;
  public list: ScheduleModel[] = [];
}
