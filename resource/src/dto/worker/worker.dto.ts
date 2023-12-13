import { Expose } from "class-transformer";

export default class WorkerDto {
  @Expose({ name: "id" })
  public readonly id: number;

  @Expose({ name: "name" })
  public readonly name: string;

  @Expose({ name: "machine_no" })
  public readonly machineNo: string;

  @Expose({ name: "worker" })
  public worker: string;
}
