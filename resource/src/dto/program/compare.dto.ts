import { Expose, Type } from "class-transformer";
import FunctionDto from "./function.dto";

export default class CompareDto {
  @Expose({ name: "criteriaProgram" })
  @Type(() => FunctionDto)
  public readonly criteriaProgram: FunctionDto[] = [];

  @Expose({ name: "compareProgram" })
  @Type(() => FunctionDto)
  public readonly compareProgram: FunctionDto[] = [];

  @Expose({ name: "criteriaCode" })
  public readonly criteriaCode: string[] = [];

  @Expose({ name: "compareCode" })
  public readonly compareCode: string[] = [];
}
