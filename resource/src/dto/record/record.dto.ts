import { Expose } from "class-transformer";

export default class RecordDto {
  @Expose({ name: "date" })
  public readonly date: string = "";

  @Expose({ name: "mid" })
  public readonly mid: string = "";

  @Expose({ name: "program" })
  public readonly program: string = "";

  @Expose({ name: "plan_count" })
  public readonly planCount: number = 0;

  @Expose({ name: "part_count" })
  public readonly partCount: number = 0;

  @Expose({ name: "achieve" })
  public readonly achieve: string = "";

  @Expose({ name: "uptime" })
  public readonly uptime: string = "";

  @Expose({ name: "tolerance" })
  public readonly tolerance: string = "";
}
