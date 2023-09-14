import { UserAgentType } from "config/constants";

export default class UserAgentModule {
  static getUserAgent(userAgent: string = ""): string {
    if (/IPHONE/gi.test(userAgent)) {
      return UserAgentType.IOS;
    } else if (/ANDROID/gi.test(userAgent)) {
      return UserAgentType.ANDROID;
    } else if (/\[(ANDROID|IPHONE)\_(.*)\]/gi.test(userAgent)) {
      return UserAgentType.APP;
    }
    return UserAgentType.DESKTOP;
  }
}
