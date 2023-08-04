import { Expose } from "class-transformer";

export default class FunctionDto {
  @Expose({ name: "comment" })
  public readonly comment: string = "";

  @Expose({ name: "date" })
  public readonly date: string = "";

  @Expose({ name: "len" })
  public readonly len: string = "";

  @Expose({ name: "name" })
  public readonly name: string = "";
}
