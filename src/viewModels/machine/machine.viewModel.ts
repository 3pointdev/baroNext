import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
import MachineDto from "../../dto/machine/machine.dto";
import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import ProcessedQuantityDto from "../../dto/machine/processedQuantity.dto";
import {
  BinaryMessageType,
  ServerUrlType,
  SocketResponseType,
  SortType,
} from "../../../config/constants";
import RealTimeDataDto from "../../dto/machine/realTimeData.dto";
import TransmitterDto from "../../dto/transmitters/transmitters.dto";
import { ServerResponse } from "../../modules/api.module";
import chartModule from "../../modules/chart.module";
import mapperModule from "../../modules/mapper.module";
import { ITableHeader } from "../../../components/table/defaultTable";
import MachineSummaryDto from "../../dto/machine/machineSummary.dto";
import NotificationDto from "../../dto/machine/notification.dto";
import NotificationModel from "../../models/machine/notification.model";
import NotificationListDto from "../../dto/machine/notificationList.dto";
import moment from "moment";
import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";

export default class MachineViewModel extends DefaultViewModel {
  public machines: MachineDto[] = [];
  public realTimeData: RealTimeDataDto[] = [];
  public processedQuantity: ProcessedQuantityDto[] = [];
  public processChart: any = false;
  public edgeData: TransmitterDto[] = [];

  public machineSummary: MachineSummaryDto[] = [];
  public tableHeader: ITableHeader[] = [];
  public notiList: NotificationListDto = new NotificationListDto();
  public notiModel: NotificationModel = new NotificationModel();

  constructor(props: IDefaultProps) {
    super(props);
    this.tableHeader = [
      { title: "기계명", column: "mid", align: "center", size: "20vw" },
      { title: "알람일자", column: "date", align: "left", size: "20vw" },
      { title: "알람내용", column: "message", align: "left", size: "55vw" },
    ];
    makeObservable(this, {
      machines: observable,
      realTimeData: observable,
      processedQuantity: observable,
      processChart: observable,
      edgeData: observable,
      machineSummary: observable,
      tableHeader: observable,
      notiList: observable,
      notiModel: observable,

      onMessage: action,
      getMachineList: action,
      getProcessedQuantity: action,
      setChart: action,
    });
  }

  insertInstalledTransmitters = async () => {
    await this.api
      .post(ServerUrlType.APIS, "/api/cloud/installedTransmitters")
      .then((result: AxiosResponse<ServerResponse<TransmitterDto[]>>) => {
        const data = result.data.data.map((item) =>
          plainToInstance(TransmitterDto, item)
        );
        runInAction(() => {
          this.edgeData = data;
        });

        data.forEach((item: TransmitterDto) => {
          this.insertMachineStat(item);
        });
      });
  };

  public insertMachineStat = async (item: TransmitterDto) => {
    await this.api.post(ServerUrlType.EDGE, "/api/edge/edge_machine_stat", {
      transmitter: item.id,
    });
  };

  // 모니터번호(path)에 따라 렌더링할 인덱스 범위를 계산
  setRenderRange = () => {
    const monitor = +this.router.query.monitor;
    const start = (monitor - 1) * 4;
    const end = monitor * 4;
    return { start, end };
  };

  getMachineList = async () => {
    await this.api
      .get(ServerUrlType.BARO, "/machine/currentList")
      .then((result: AxiosResponse<any[]>) => {
        const data = result.data;

        const newMachines = data.map((item) =>
          mapperModule.currentListMapper(item)
        );
        runInAction(() => {
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
          const data = result.data.map((item: ProcessedQuantityDto) =>
            plainToInstance(ProcessedQuantityDto, item)
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

  getList = async () => {
    await this.api
      .get(ServerUrlType.BARO, "/mon/mlist")
      .then((result: AxiosResponse<MachineSummaryDto[]>) => {
        const data = result.data.map((item: MachineSummaryDto) =>
          plainToInstance(MachineSummaryDto, item)
        );

        runInAction(() => {
          this.machineSummary = data;
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  insertListNotification = async (mid?: string) => {
    await this.api
      .post(ServerUrlType.BARO, "/alarm", {
        start: this.notiModel.startDay,
        end: this.notiModel.endDay,
        mkey: this.notiModel.mkey === 0 ? "%" : this.notiModel.mkey,
      })
      .then((result: AxiosResponse<NotificationDto[]>) => {
        const data = result.data.map((item: NotificationDto) => {
          return { date: item.date, message: item.message, mid: item.mid };
        });

        const filterData = mid
          ? this.machineFilter(mid, data)
          : this.searchKeywordFilter(this.notiModel.searchKeyword, data);

        runInAction(() => {
          this.notiList = plainToInstance(NotificationListDto, {
            sort: SortType.DESCENDING,
            notifications: filterData,
            machineFilter: "default",
          });
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  searchKeywordFilter = (keyword: string, result: NotificationDto[]) => {
    if (keyword === "") {
      return result;
    }

    return result.filter((item: NotificationDto) =>
      item.message.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())
    );
  };

  machineFilter = (mid: string, result: NotificationDto[]) => {
    return result.filter((item: NotificationDto) =>
      item.mid.toLocaleLowerCase().includes(mid.toLocaleLowerCase())
    );
  };

  handleChangeDay = (date: string, type: string) => {
    runInAction(() => {
      this.notiModel = {
        ...this.notiModel,
        [type]: moment(date).format("YYYY-MM-DD"),
      };
      this.insertListNotification();
    });
  };

  handleChangeSort = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === this.notiList.sort) return;

    runInAction(() => {
      this.notiList = {
        notifications: [...this.notiList.notifications.reverse()],
        machineFilter: "default",
        sort: value,
      };
    });
  };

  handleChangeMachineFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === this.notiList.machineFilter) return;

    runInAction(() => {
      this.notiList = {
        notifications: this.notiList.notifications,
        sort: this.notiList.sort,
        machineFilter: value,
      };
      this.insertListNotification(value);
    });
  };

  handleChangeSearchKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    runInAction(() => {
      this.notiModel = { ...this.notiModel, searchKeyword: value };
    });
  };

  handleKeyDownSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    const { key } = event;

    if (key === "Enter") {
      this.insertListNotification();
    }
  };
  handleClickSearch = (event: MouseEvent<SVGSVGElement>) => {
    this.insertListNotification();
  };

  // ********************소켓******************** //
  // ********************소켓******************** //
  // ********************소켓******************** //
  // ********************소켓******************** //
  // ********************소켓******************** //

  onOpen = () => {
    console.log("WebSocket connected!!");

    //소켓 연결완료 후 사용자가 소켓서버 이용을 시작함을 서버에 알리는 이벤트
    this.socket.sendEvent({ token: this.auth.token });

    this.insertInstalledTransmitters();
  };

  onMessage = async (response: MessageEvent) => {
    if (typeof response.data === "object") {
      //바이너리 메시지
      const updateData = await response.data.text();
      const dataArray = updateData.split("|");
      switch (dataArray[1]) {
        case BinaryMessageType.NOTI:
          const mappingNoti = mapperModule.notiMapper(
            dataArray,
            this.machines,
            this.realTimeData
          );
          this.handleNoti(mappingNoti);
          break;
        case BinaryMessageType.PART_COUNT:
          const mappingPartCount = mapperModule.partCountMapper(
            dataArray,
            this.machines
          );
          this.handlePartCount(mappingPartCount);
          break;
        case BinaryMessageType.MESSAGE:
          console.log("message");
          break;
        case BinaryMessageType.ALARM:
          console.log("alarm");
          break;
      }
    } else {
      //오브젝트 메시지
      const objectMessage = JSON.parse(response.data);

      switch (objectMessage.response) {
        case SocketResponseType.MACHINE:
          //object
          this.handleMachineStat(objectMessage.data);
          break;
        case SocketResponseType.CONNECT:
          break;
        case SocketResponseType.CLOSED:
          break;
      }
    }
  };

  handleNoti = (mappingNoti: { machine: MachineDto; rtd: RealTimeDataDto }) => {
    const newMachinesByNoti: MachineDto[] = [];
    const newRealTimeDataByNoti: RealTimeDataDto[] = [];

    for (let i = 0; i < this.machines.length; i++) {
      if (this.machines[i].id === mappingNoti.machine.id) {
        newMachinesByNoti[i] = mappingNoti.machine;
        newRealTimeDataByNoti[i] = mappingNoti.rtd;
      } else {
        newMachinesByNoti[i] = this.machines[i];
        newRealTimeDataByNoti[i] = this.realTimeData[i];
      }
    }

    runInAction(() => {
      this.machines = newMachinesByNoti.sort(
        (a, b) => a.machineNo - b.machineNo
      );
      this.realTimeData = newRealTimeDataByNoti.sort(
        (a, b) => a.machineNo - b.machineNo
      );
    });
  };

  handlePartCount = (mappingPartCount: MachineDto) => {
    const newMachinesByPartCount: MachineDto[] = [];

    for (let i = 0; i < this.machines.length; i++) {
      if (this.machines[i].id === mappingPartCount.id) {
        newMachinesByPartCount[i] = mappingPartCount;
      } else {
        newMachinesByPartCount[i] = this.machines[i];
      }
    }

    runInAction(() => {
      this.machines = newMachinesByPartCount.sort(
        (a, b) => a.machineNo - b.machineNo
      );
    });
  };

  handleMachineStat = (statArray) => {
    const newMachines: MachineDto[] = [];
    const newRealTimeData: RealTimeDataDto[] = [];
    for (let i = 0; i < statArray.length; i++) {
      const result = mapperModule.machineStatMapper(
        statArray[i],
        this.machines
      );
      newMachines.push(result.machine);
      newRealTimeData.push(result.rtd);
    }
    runInAction(() => {
      this.machines = newMachines.sort((a, b) => a.machineNo - b.machineNo);
      this.realTimeData = newRealTimeData.sort(
        (a, b) => a.machineNo - b.machineNo
      );
    });
  };

  // ********************차트******************** //
  // ********************차트******************** //
  // ********************차트******************** //
  // ********************차트******************** //
  // ********************차트******************** //

  setChart = (data: ProcessedQuantityDto[]) => {
    runInAction(() => {
      this.processChart = {
        options: chartModule.setChart({
          tooltip: {
            callback: {
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
          thickness: 80,
        }),
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
}
