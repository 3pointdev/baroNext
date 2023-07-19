import { Expose } from "class-transformer";

export default class MachineStatDto {
  @Expose({ name: "command" })
  public readonly command: string = "";

  @Expose({ name: "recv" })
  public readonly recv: string = "";

  @Expose({ name: "sender" })
  public readonly sender: string = "";

  @Expose({ name: "target" })
  public readonly target: string = "";

  @Expose({ name: "transmitter" })
  public readonly transmitter: string = "";
}
