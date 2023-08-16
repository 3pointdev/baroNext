import { Expose, Type } from "class-transformer";
import NotificationDto from "./notification.dto";

export default class NotificationListDto {
  @Expose({ name: "sort" })
  public sort: string = "";

  @Expose({ name: "notifications" })
  @Type(() => NotificationDto)
  public notifications: NotificationDto[] = [];
}
