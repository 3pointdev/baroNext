import { Expose } from "class-transformer";

export default class RealTimeDataDto {
  @Expose({ name: "Id" })
  public id: string;

  @Expose({ name: "machineNo" })
  public machineNo: number;

  @Expose({ name: "line" })
  public line: string;

  @Expose({ name: "f_command" })
  public fCommand: string;

  @Expose({ name: "path_position" })
  public pathPosition: string;

  @Expose({ name: "path_position2" })
  public pathFeedrate: string;

  @Expose({ name: "path_feedrate" })
  public pathPosition2: string;

  @Expose({ name: "path_feedrate2" })
  public pathFeedrate2: string;

  @Expose({ name: "Xact" })
  public xAct: string;

  @Expose({ name: "Xload" })
  public xLoad: string;

  @Expose({ name: "Yact" })
  public yAct: string;

  @Expose({ name: "Yload" })
  public yLoad: string;

  @Expose({ name: "Zact" })
  public zAct: string;

  @Expose({ name: "Zload" })
  public zLoad: string;

  @Expose({ name: "Aact" })
  public aAct: string;

  @Expose({ name: "Aload" })
  public aLoad: string;

  @Expose({ name: "Bact" })
  public bAct: string;

  @Expose({ name: "Bload" })
  public bLoad: string;

  @Expose({ name: "Cact" })
  public cAct: string;

  @Expose({ name: "Cload" })
  public cLoad: string;

  @Expose({ name: "S1load" })
  public s1Load: string;

  @Expose({ name: "S1speed" })
  public s1Speed: string;

  @Expose({ name: "S2load" })
  public s2Load: string;

  @Expose({ name: "S2speed" })
  public s2Speed: string;

  @Expose({ name: "S320load" })
  public s320Load: string;

  @Expose({ name: "S320speed" })
  public s320Speed: string;

  @Expose({ name: "program_comment" })
  public programComment: string;

  @Expose({ name: "program_comment2" })
  public programComment2: string;

  @Expose({ name: "tool_id" })
  public toolId: string;

  @Expose({ name: "tool_id2" })
  public toolId2: string;
}
