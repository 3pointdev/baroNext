import { Expose, Type } from "class-transformer";
import MachineDto from "./machine.dto";

export default class MachineStatDto {
  @Expose({ name: "data" })
  @Type(() => MachineDto)
  public readonly data: MachineDto[] = [];

  @Expose({ name: "recv" })
  public readonly recv: string = "";

  @Expose({ name: "sender" })
  public readonly sender: string = "";

  @Expose({ name: "enterprise" })
  public readonly enterprise: string = "";

  @Expose({ name: "response" })
  public readonly response: string = "";

  @Expose({ name: "request" })
  public readonly request: any;
}
