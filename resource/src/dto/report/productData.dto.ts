import { Expose } from "class-transformer";

export default class ProductDataDto {
  @Expose({ name: "avg_active" })
  public readonly averageActive: number = 0;

  @Expose({ name: "avg_idle" })
  public readonly averageIdle: number = 0;

  @Expose({ name: "count" })
  public readonly count: number = 0;

  @Expose({ name: "lot" })
  public readonly lot: number = 0;

  @Expose({ name: "lot_end" })
  public readonly lotEnd: string = "2023-10-13 16:50:00";

  @Expose({ name: "lot_start" })
  public readonly lotStart: string = "2023-10-13 07:38:26";

  @Expose({ name: "plan" })
  public readonly plan: number = 0;

  @Expose({ name: "program" })
  public readonly program: string = "O4024(CS104D40H40-02-1) (2023.10.12)";

  @Expose({ name: "setting_end" })
  public readonly settingEnd: string = "2023-10-12 09:36:09";

  @Expose({ name: "setting_start" })
  public readonly settingStart: string = "2023-10-11 15:46:07";

  @Expose({ name: "setting_time" })
  public readonly settingTime: number = 0;

  @Expose({ name: "std_active" })
  public readonly standardActive: number = 0;
}
