import { faUser } from "@fortawesome/free-solid-svg-icons";
import { makeObservable, observable } from "mobx";
import ListIcon from "public/images/icons/listIcon";
import NotificationIcon from "public/images/icons/notificationIcon";
import WorkerIcon from "public/images/icons/workerIcon";
import pageUrlConfig from "../../../config/pageUrlConfig";
import HomeIcon from "../../../public/images/icons/homeIcon";
import MagnifyGlassIcon from "../../../public/images/icons/magnifyGlassIcon";
import MonitorIcon from "../../../public/images/icons/monitorIcon";
import ScheduleIcon from "../../../public/images/icons/scheduleIcon";
import ToolsIcon from "../../../public/images/icons/toolsIcon";
import AlarmListDto from "../../dto/alarm/alarmList.dto";
import MenuModel from "../../models/menu/menu.model";
import UserMenuModel from "../../models/menu/userMenu.model";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";

export default class MainViewModel extends DefaultViewModel {
  public menus: MenuModel[] = [];
  public userMenu: UserMenuModel[] = [];
  public alarm: AlarmListDto = new AlarmListDto();

  constructor(props: IDefaultProps) {
    super(props);
    this.menus = [
      {
        name: "home",
        path: pageUrlConfig.main,
        title: "메인 홈",
        icon: HomeIcon,
        size: 24,
        subMenu: [],
      },
      {
        name: "production_record",
        path: pageUrlConfig.productionRecord,
        title: "생산이력",
        icon: ListIcon,
        size: 20,
        subMenu: [],
      },
      {
        name: "production_report",
        path: pageUrlConfig.productionReport,
        title: "생산분석",
        icon: MagnifyGlassIcon,
        size: 20,
        subMenu: [],
      },
      {
        name: "schedule",
        path: pageUrlConfig.workSchedule,
        title: "스케쥴관리",
        icon: ScheduleIcon,
        size: 22,
        subMenu: [],
      },
      {
        name: "machine_manage",
        path: pageUrlConfig.machine,
        title: "기계관리",
        icon: ToolsIcon,
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
        path: pageUrlConfig.monitorSetting,
        title: "화면관리",
        icon: MonitorIcon,
        size: 20,
        subMenu: [],
      },
      {
        name: "worker_manage",
        path: pageUrlConfig.worker,
        title: "작업자관리",
        icon: WorkerIcon,
        size: 20,
        subMenu: [],
      },
      {
        name: "notification_manage",
        path: pageUrlConfig.notification,
        title: "공지사항관리",
        icon: NotificationIcon,
        size: 20,
        subMenu: [],
      },
    ];

    this.userMenu = [
      {
        title: "계정정보",
        icon: faUser,
        path: pageUrlConfig.my,
      },
    ];

    this.alarm = {
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
    makeObservable(this, {
      menus: observable,
      userMenu: observable,
      alarm: observable,
    });
  }
}
