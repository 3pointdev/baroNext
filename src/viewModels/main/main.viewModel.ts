import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel from "../default.viewModel";
import MenuModel from "../../models/menu/menu.model";
import {
  faBoxesStacked,
  faDisplay,
  faHome,
  faScrewdriverWrench,
  faUser,
  faEnvelope,
  faBell,
  faCircleQuestion,
  faMessage,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import AlarmListDto from "../../dto/alarm/alarmList.dto";
import UserMenuModel from "../../models/menu/userMenu.model";
import pageUrlConfig from "../../../config/pageUrlConfig";
import MachineDto from "../../dto/machine/machine.dto";
import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import ProcessedQuantityDto from "../../dto/machine/processedQuantity.dto";

interface IProps {}

export default class MainViewModel extends DefaultViewModel {
  public menus: MenuModel[] = [];
  public machines: MachineDto[] = [];
  public processedQuantity: ProcessedQuantityDto[] = [];
  public alarm: AlarmListDto = {
    alarms: [
      {
        id: 0,
        thumbImage: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "알림타이틀",
        content: "공지사항과 알림내용을 표시합니다.",
        createdAt: "2022-09-14T09:25:43.511Z",
        isRead: false,
      },
      {
        id: 0,
        thumbImage: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "알림타이틀",
        content: "공지사항과 알림내용을 표시합니다.",
        createdAt: "2022-09-14T09:25:43.511Z",
        isRead: false,
      },
    ],
    unRead: 1,
  };
  public userMenu: UserMenuModel[] = [];

  constructor(props: IProps) {
    super(props);
    this.menus = [
      {
        name: "home",
        path: pageUrlConfig.main,
        title: "메인 홈",
        icon: faHome,
        size: 24,
        subMenu: [],
      },
      {
        name: "product_manage",
        path: pageUrlConfig.production,
        title: "생산관리",
        icon: faBoxesStacked,
        size: 20,
        subMenu: [
          {
            name: "production_report",
            path: pageUrlConfig.productionReport,
            title: "생산리포트",
          },
          {
            name: "production_record",
            path: pageUrlConfig.productionRecord,
            title: "생산이력",
          },
          {
            name: "production_share",
            path: pageUrlConfig.productionShare,
            title: "생산일정 공유",
          },
          {
            name: "production_status",
            path: pageUrlConfig.productionStatus,
            title: "생산공유 현황",
          },
        ],
      },
      {
        name: "work_manage",
        path: pageUrlConfig.work,
        title: "작업관리",
        icon: faClipboard,
        size: 22,
        subMenu: [
          {
            name: "program",
            path: pageUrlConfig.workProgram,
            title: "프로그램 관리",
          },
        ],
      },
      {
        name: "machine_manage",
        path: pageUrlConfig.machine,
        title: "기계관리",
        icon: faScrewdriverWrench,
        size: 20,
        subMenu: [
          {
            name: "alarm_record",
            path: pageUrlConfig.machineAlarm,
            title: "알람조회",
          },
          {
            name: "machine_info",
            path: pageUrlConfig.machineInfo,
            title: "기계정보 관리",
          },
        ],
      },
      {
        name: "screen_manage",
        path: pageUrlConfig.monitor,
        title: "화면관리",
        icon: faDisplay,
        size: 20,
        subMenu: [
          {
            name: "monitoring_setting",
            path: pageUrlConfig.monitorSetting,
            title: "모니터링 관리",
          },
        ],
      },
    ];
    this.userMenu = [
      {
        title: "계정정보",
        icon: faUser,
        path: pageUrlConfig.company,
      },
      {
        title: "청구서",
        icon: faEnvelope,
        path: pageUrlConfig.invoices,
      },
      {
        title: "알림사항",
        icon: faBell,
        path: pageUrlConfig.alarm,
      },
      {
        title: "기능설명",
        icon: faCircleQuestion,
        path: pageUrlConfig.functionExplain,
      },
      {
        title: "고객문의",
        icon: faMessage,
        path: pageUrlConfig.contact,
      },
      {
        title: "설정",
        icon: faGear,
        path: pageUrlConfig.setting,
      },
    ];
    makeObservable(this, {
      menus: observable,
      machines: observable,

      getMachineList: action,
    });
  }

  getMachineList = async () => {
    await this.api
      .get("/machine/currentList")
      .then((result: AxiosResponse<MachineDto[]>) => {
        runInAction(() => {
          this.machines = result.data.map((data: MachineDto) =>
            plainToInstance(MachineDto, data)
          );
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  getProcessedQuantity = async () => {
    await this.api
      .get("/baro")
      .then((result: AxiosResponse<ProcessedQuantityDto[]>) => {
        runInAction(() => {
          this.processedQuantity = result.data.map(
            (data: ProcessedQuantityDto) =>
              plainToInstance(ProcessedQuantityDto, data)
          );
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };
}
