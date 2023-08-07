import { Expose } from "class-transformer";

export default class UserDto {
  @Expose({ name: "address" })
  public readonly address: string = "";

  @Expose({ name: "ent_number" })
  public readonly entNumber: string = "";

  @Expose({ name: "id" })
  public readonly id: number = 0;

  @Expose({ name: "manager" })
  public readonly manager: string = "";

  @Expose({ name: "name" })
  public readonly name: string = "";

  @Expose({ name: "part" })
  public readonly part: string = "";

  @Expose({ name: "phone" })
  public readonly phone: number = 0;

  @Expose({ name: "rank" })
  public readonly rank: string = "";

  @Expose({ name: "role" })
  public readonly role: string = "";

  @Expose({ name: "profile_image" })
  public readonly profileImage: string = "";
}
