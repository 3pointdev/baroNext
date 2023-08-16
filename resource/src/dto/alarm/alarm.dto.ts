import { Expose } from "class-transformer";

export default class AlarmDto {
  @Expose({ name: "id" })
  public readonly id: number = 0;

  @Expose({ name: "thumb_image" })
  public readonly thumbImage: string = "";

  @Expose({ name: "title" })
  public readonly title: string = "";

  @Expose({ name: "content" })
  public readonly content: string = "";

  @Expose({ name: "created_at" })
  public readonly createdAt: string = "";

  @Expose({ name: "is_read" })
  public readonly isRead: boolean = false;
}
