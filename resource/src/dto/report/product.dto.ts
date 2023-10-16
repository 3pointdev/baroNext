import { Expose, Type } from "class-transformer";
import ProductDataDto from "./productData.dto";

export default class ProductDto {
  @Expose({ name: "data" })
  @Type(() => ProductDataDto)
  public readonly data: ProductDataDto[] = [];

  @Expose({ name: "mid" })
  public readonly mid: string = "";

  @Expose({ name: "mkey" })
  public readonly mkey: number = 0;

  @Expose({ name: "start_time" })
  public readonly startTime: string = "";

  @Expose({ name: "end_time" })
  public readonly endTime: string = "";

  @Expose({ name: "total_time" })
  public readonly totalTime: number = 0;

  @Expose({ name: "work_time" })
  public readonly workTime: number = 0;

  @Expose({ name: "brk_time" })
  public readonly breakTime: number = 0;

  @Expose({ name: "eat_time" })
  public readonly eatTime: number = 0;
}
