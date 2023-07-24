import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
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
import {
  BinaryMessageType,
  ServerUrlType,
  SocketResponseType,
} from "../../../config/constants";
import SocketTransformModule from "../../modules/socketTransform.module";
import dataTransformModule from "../../modules/dataTransform.module";
import RealTimeDataDto from "../../dto/machine/realTimeData.dto";
import timeModule from "../../modules/time.module";

export default class MainViewModel extends DefaultViewModel {
  public menus: MenuModel[] = [];
  public userMenu: UserMenuModel[] = [];
  public machines: MachineDto[] = [];
  public processedQuantity: ProcessedQuantityDto[] = [];
  public processChart: any = false;
  public alarm: AlarmListDto = new AlarmListDto();

  constructor(props: IDefaultProps) {
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
        path: pageUrlConfig.my,
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
      machines: observable,
      processedQuantity: observable,
      processChart: observable,
      alarm: observable,

      getMachineList: action,
      getProcessedQuantity: action,
      setChart: action,
      setMachineData: action,
      updateMachineData: action,
    });
  }

  async initialize() {
    this.getProcessedQuantity();
    await this.getMachineList();
    this.initializeSocket(this.onMessage);
  }

  onMessage = async (response: MessageEvent) => {
    const message = await SocketTransformModule(response);

    switch (message?.response) {
      case SocketResponseType.MACHINE:
        //object
        this.setMachineData(message.data);
        break;
      case SocketResponseType.CONNECT:
        break;
      case SocketResponseType.CLOSED:
        break;
      default:
        //binary
        this.updateMachineData(message);
        break;
    }
  };

  getMachineList = async () => {
    await this.api
      .get(ServerUrlType.BARO, "/machine/currentList")
      .then((result: AxiosResponse<any[]>) => {
        runInAction(() => {
          const newMachines = result.data.map((item) => {
            const matchMachine = this.machines.find(
              (machine) => machine.id === item.mkey
            );
            return dataTransformModule(item, matchMachine, true);
          });

          this.machines = newMachines.sort((a, b) => a.machineNo - b.machineNo);
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  getProcessedQuantity = async () => {
    await this.api
      .get(ServerUrlType.BARO, "/baro")
      .then((result: AxiosResponse<ProcessedQuantityDto[]>) => {
        runInAction(() => {
          const data = result.data.map((data: ProcessedQuantityDto) =>
            plainToInstance(ProcessedQuantityDto, data)
          );
          this.setChart(data);
          this.processedQuantity = data;
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  setChart = (data: ProcessedQuantityDto[]) => {
    runInAction(() => {
      this.processChart = {
        options: {
          maxBarThickness: 80,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                title: (context) => {
                  return "";
                },
                label: (context) => {
                  let label = `${data[context.dataIndex].mid} : ${
                    context.formattedValue
                  }`;
                  return label;
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
                tickLength: 8, // 눈금 길이를 지정합니다.
              },
              title: {
                align: "end",
                display: true,
                text: "호기",
              },
              ticks: { padding: 0 },
            },
            y: {
              title: {
                align: "end",
                display: true,
                text: "총 가공 수량(개)",
              },
              ticks: {
                padding: 0,
                margin: 0,
              },
            },
          },
        },
        data: {
          labels: data.map((item) => item.machineNo),
          datasets: [
            {
              data: data.map((item) => item.count),
              backgroundColor: "rgba(0, 143, 251, 0.4)",
            },
          ],
        },
      };
    });
  };

  setMachineData = (data) => {
    runInAction(() => {
      const newMachines = data.map((item) => {
        const matchMachine = this.machines.find(
          (machine) => +machine.id === +item.Id
        );

        return dataTransformModule(item, matchMachine, false);
      });
      this.machines = newMachines.sort((a, b) => a.machineNo - b.machineNo);
    });
  };

  updateMachineData = (message) => {
    switch (message.type) {
      case BinaryMessageType.NOTI:
        const newMachineList = this.machines;
        const targetIndex = newMachineList.findIndex(
          (machine: MachineDto) => machine.id === message.target
        );

        // MachineDto에 해당하는 키와 값을 업데이트
        const machineData = newMachineList[targetIndex];
        for (const key in message.updates) {
          const matchingMachineKey = Object.keys(machineData).find(
            (realTimeKey) => realTimeKey.toLowerCase() === key
          );
          machineData[matchingMachineKey] = message.updates[key].value;
        }

        // RealTimeDataDto에 해당하는 키와 값을 업데이트
        const realTimeData = newMachineList[targetIndex].data;

        for (const key in message.rtd) {
          const matchingRealTimeKey = Object.keys(realTimeData).find(
            (realTimeKey) => realTimeKey.toLowerCase() === message.rtd[key].key
          );

          realTimeData[matchingRealTimeKey] = message.rtd[key].value;
        }

        newMachineList[targetIndex] = machineData;
        newMachineList[targetIndex].data = realTimeData;

        runInAction(() => {
          this.machines = newMachineList;
        });

        break;
      case BinaryMessageType.PART_COUNT:
        break;
      case BinaryMessageType.MESSAGE:
        break;
      case BinaryMessageType.ALARM:
        break;
    }
  };
}
