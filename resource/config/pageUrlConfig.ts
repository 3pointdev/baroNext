class PageUrlConfig {
  public notFound = "*";
  public main = "/";
  public login = "/login";
  public production = "/production";
  public productionReport = "/production/report";
  public productionRecord = "/production/record";
  public productionShare = "/production/share";
  public productionStatus = "/production/status";
  public work = "/work";
  public workProgram = "/work/program";
  public workSchedule = "/work/schedule";
  public machine = "/machine";
  public machineAlarm = "/machine/notification";
  public machineInfo = "/machine/info";
  public monitorSetting = "/monitor/setting";
  public my = "/my";
  public invoices = "/";
  public alarm = "/alarm";
  public functionExplain = "/";
  public contact = "/";
  public setting = "/";

  addParams(url: string, params: Array<any>) {
    let querystring = [];
    let pageUrl = url;
    if (url.includes("?")) {
      const split = url.split("?");
      pageUrl = split[0];
      const urlParam = split[1];
      if (urlParam.includes("&")) {
        urlParam.split("&").forEach((v, k) => {
          querystring.push(`${v}${params[k]}`);
        });
      } else {
        querystring.push(`${urlParam}${params[0]}`);
      }
      return `${pageUrl}?${querystring.join("&")}`;
    }
    return pageUrl;
  }
}

export default new PageUrlConfig();
