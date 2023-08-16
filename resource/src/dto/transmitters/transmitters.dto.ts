import { Expose } from "class-transformer";

export default class TransmitterDto {
  @Expose({ name: "connect" })
  public readonly connect: string = "";

  @Expose({ name: "disconnect" })
  public readonly disconnect: string = "";

  @Expose({ name: "edge_id" })
  public readonly edgeId: number = 0;

  @Expose({ name: "enterprise" })
  public readonly enterprise: string = "";

  @Expose({ name: "enterprise_id" })
  public readonly enterpriseId: number = 0;

  @Expose({ name: "id" })
  public readonly id: string = "";

  @Expose({ name: "ip" })
  public readonly ip: string = "";

  @Expose({ name: "modtime" })
  public readonly modtime: string = "";

  @Expose({ name: "status" })
  public readonly status: string = "";
}
