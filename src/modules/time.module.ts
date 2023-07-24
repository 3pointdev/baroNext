import moment from "moment";

class TimeModule {
  public toString(time: string) {
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

  public getRemainingTime(targetDateTime: string) {
    const targetMoment = moment(targetDateTime, "YYYY-MM-DD HH:mm:ss");
    const currentMoment = moment();

    const duration = moment.duration(targetMoment.diff(currentMoment));
    const hours = Math.floor(duration.asHours());
    const minutes = Math.floor(duration.asMinutes()) % 60;
    const seconds = Math.floor(duration.asSeconds()) % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  public msToHHMM(ms: number) {
    const duration = moment.duration(ms);
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }
  }
}

export default new TimeModule();
