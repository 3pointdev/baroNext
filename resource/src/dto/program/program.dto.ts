import { Expose } from "class-transformer";

export default class ProgramDto {
  @Expose({ name: "autostart" })
  public readonly autostart: boolean = true;

  @Expose({ name: "cnctype" })
  public readonly cnctype: string = "";

  @Expose({ name: "comment" })
  public readonly comment: string = "";

  @Expose({ name: "edge_id" })
  public readonly edgeId: number = 0;

  @Expose({ name: "enterprise_id" })
  public readonly enterpriseId: number = 0;

  @Expose({ name: "id" })
  public readonly id: string = "";

  @Expose({ name: "ip" })
  public readonly ip: string = "";

  @Expose({ name: "machine_no" })
  public readonly machineNo: string = "";

  @Expose({ name: "mode" })
  public readonly mode: string = "";

  @Expose({ name: "modtime" })
  public readonly modtime: string = "";

  @Expose({ name: "name" })
  public readonly name: string = "";

  @Expose({ name: "port" })
  public readonly port: number = 0;

  @Expose({ name: "status" })
  public readonly status: string = "";

  @Expose({ name: "transmitter" })
  public readonly transmitter: string = "";
}
