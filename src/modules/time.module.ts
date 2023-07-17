import moment from "moment";

class TimeModule {
  public format(time: string) {
    const date = moment(time);
    const now = moment();

    if (now.diff(date, "minutes") <= 10) {
      return "방금 전";
    }

    if (now.isSame(date, "day")) {
      return "오늘";
    }

    if (now.subtract(1, "days").isSame(date, "day")) {
      return "어제";
    }

    if (now.diff(date, "days") >= 10 && now.diff(date, "days") < 365) {
      const monthsDiff = now.diff(date, "months");
      return `${monthsDiff}개월 전`;
    }

    if (now.diff(date, "days") >= 365) {
      const yearsDiff = now.diff(date, "years");
      return `${yearsDiff}년 전`;
    }

    const daysDiff = now.diff(date, "days");
    return `${daysDiff}일 전`;
  }
}

export default new TimeModule();
