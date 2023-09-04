import dayjs from "dayjs";

export default class CompareModel {
  public criteriaMachine: number = 1;
  public compareMachine: number = 0;
  public criteriaProgram: number = 0;
  public compareProgram: number = 0;
  public criteriaDate: string = dayjs().format("YYYY-MM-DD");
  public compareDate: string = dayjs().format("YYYY-MM-DD");
}
