import { Expose, Type } from "class-transformer";
import ProductDataDto from "./productData.dto";

export default class ProductDto {
  @Expose({ name: "toggle" })
  public readonly toggle: number = 0;

  @Expose({ name: "name" })
  public readonly name: string = "";

  @Expose({ name: "machine_no" })
  public readonly machineNo: string = "";

  @Expose({ name: "data" })
  @Type(() => ProductDataDto)
  public readonly data: ProductDataDto[] = [];
}
