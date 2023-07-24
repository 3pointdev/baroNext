import { Expose } from "class-transformer";

export default class RealTimeDataDto {
  @Expose({ name: "S1load" })
  public s1Load: string = "";

  @Expose({ name: "S1speed" })
  public s1Speed: string = "";

  @Expose({ name: "Xact" })
  public xAct: string = "";

  @Expose({ name: "Xload" })
  public xLoad: string = "";

  @Expose({ name: "Zact" })
  public zAct: string = "";

  @Expose({ name: "Zload" })
  public zLoad: string = "";

  @Expose({ name: "block" })
  public block: string = "";

  @Expose({ name: "estop" })
  public eStop: string = "";

  @Expose({ name: "execution" })
  public execution: string = "";

  @Expose({ name: "f_command" })
  public fCommand: string = "";

  @Expose({ name: "line" })
  public line: string = "";

  @Expose({ name: "mode" })
  public mode: string = "";

  @Expose({ name: "part_count" })
  public partCount: string = "";

  @Expose({ name: "path_feedrate" })
  public pathFeedrate: string = "";

  @Expose({ name: "path_position" })
  public pathPosition: string = "";

  @Expose({ name: "plan_count" })
  public planCount: string = "";

  @Expose({ name: "program_comment" })
  public programComment: string = "";

  @Expose({ name: "tool_id" })
  public toolId: string = "";

  @Expose({ name: "Bact" })
  public bact: string = "";

  @Expose({ name: "Bload" })
  public bLoad: string = "";

  @Expose({ name: "Cact" })
  public cact: string = "";

  @Expose({ name: "Cload" })
  public cLoad: string = "";

  @Expose({ name: "S2load" })
  public s2Load: string = "";

  @Expose({ name: "S2speed" })
  public s2Speed: string = "";

  @Expose({ name: "S320load" })
  public s320Load: string = "";

  @Expose({ name: "S320speed" })
  public s320Speed: string = "";

  @Expose({ name: "Yact" })
  public yact: string = "";

  @Expose({ name: "Yload" })
  public yLoad: string = "";

  @Expose({ name: "block2" })
  public block2: string = "";

  @Expose({ name: "execution2" })
  public execution2: string = "";

  @Expose({ name: "mode2" })
  public mode2: string = "";

  @Expose({ name: "path_position2" })
  public pathPosition2: string = "";

  @Expose({ name: "program_comment2" })
  public programComment2: string = "";

  @Expose({ name: "tool_id2" })
  public toolId2: string = "";
}
