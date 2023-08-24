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
import { Alert } from "../../modules/alert.module";
import Swal from "sweetalert2";
import pageUrlConfig from "../../../config/pageUrlConfig";
import MountedDto from "../../dto/monitor/mounted.dto";

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
  public mountedList: MountedDto = new MountedDto();

  public unMount: boolean = false;

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
      mountedList: observable,

      onMessage: action,
      getMachineList: action,
      getProcessedQuantity: action,
      setChart: action,
      getMounted: action,
    });
  }

  getMounted = async (monitorName: string | string[]) => {
    await this.api
      .post(ServerUrlType.APIS, "/api/cloud/monitorList", {
        monitor: monitorName,
      })
      .then((result: AxiosResponse<ServerResponse<MountedDto>>) => {
        runInAction(() => {
          this.mountedList = plainToInstance(MountedDto, result.data.data);
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

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
          this.initializeSocket(this.onMessage, this.onOpen);
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
      .get(ServerUrlType.BARO, "/machine")
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

  insertListNotification = async () => {
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

        let filterData = this.searchKeywordFilter(
          this.notiModel.searchKeyword,
          data
        );

        if (filterData.length < 1) {
          filterData = [
            { mid: "-", date: "-", message: "검색 된 데이터가 없습니다." },
          ];
        }

        runInAction(() => {
          this.notiList = plainToInstance(NotificationListDto, {
            sort: SortType.DESCENDING,
            notifications: filterData,
          });
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  update = async (updateModel) => {
    await this.api
      .patch(ServerUrlType.BARO, "/machine", updateModel)
      .then((result: AxiosResponse) => {
        this.getList();
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
        sort: value,
      };
      this.notiModel = { ...this.notiModel, mkey: 0 };
    });
  };

  handleChangeMachineFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (+value === this.notiModel.mkey) return;

    runInAction(() => {
      this.notiModel = { ...this.notiModel, mkey: +value };
      this.insertListNotification();
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

  handleClickEdit = (event: MouseEvent<HTMLDivElement>) => {
    const { id } = event.currentTarget.dataset;
    const target = this.machineSummary.find(
      (machine: MachineSummaryDto) => machine.id === +id
    );

    Alert.freeFormat({
      title: "기계 정보 수정",
      html:
        '<input type="number" id="numberInput" class="swal2-input" placeholder="기계 번호" value="' +
        target.machineNo +
        '" required>' +
        '<input type="text" id="textInput" class="swal2-input" placeholder="기계 이름" value="' +
        target.mid +
        '" required>',
      cancel: "취소",
      confirm: "저장",
      callback: () => {
        const numberInput = document.getElementById(
          "numberInput"
        ) as HTMLInputElement;
        const textInput = document.getElementById(
          "textInput"
        ) as HTMLInputElement;

        // 유효성 검사
        if (!numberInput.value && !textInput.value) {
          Swal.showValidationMessage("입력 된 정보가 없습니다.");
        }

        return { numberInput: numberInput.value, textInput: textInput.value };
      },
    }).then(
      (result: {
        isConfirmed: boolean;
        isDenied: boolean;
        isDismissed: boolean;
        value: { numberInput: number; textInput: string };
      }) => {
        if (result.isConfirmed) {
          this.update({
            active: false,
            id: id,
            machine_no: result.value.numberInput,
            name: result.value.textInput,
          });
        }
      }
    );
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
    if (typeof response.data === "object" && this.machines.length > 0) {
      //바이너리 메시지
      const updateData = await response.data.text();
      const dataArray = updateData.split("|");
      switch (dataArray[1]) {
        case BinaryMessageType.NOTI:
          const matchDataForNoti = this.machines.find(
            (data) => +data?.id === +dataArray[4]
          );
          const matchRTDataForNoti = this.realTimeData.find(
            (data) => +data?.id === +dataArray[4]
          );

          if (matchDataForNoti) {
            const mappingNoti = mapperModule.notiMapper(
              dataArray,
              matchDataForNoti,
              matchRTDataForNoti
            );
            this.handleNoti(mappingNoti);
          }
          break;
        case BinaryMessageType.PART_COUNT:
          const matchDataForPartCount = this.machines.find(
            (data) => +data.id === +dataArray[13]
          );

          if (matchDataForPartCount) {
            const mappingPartCount = mapperModule.partCountMapper(
              dataArray,
              matchDataForPartCount
            );
            this.handlePartCount(mappingPartCount);
          }
          break;
        case BinaryMessageType.MESSAGE || BinaryMessageType.ALARM:
          const matchDataForMessage = this.machines.find(
            (data) => +data.id === +dataArray[6]
          );

          if (matchDataForMessage) {
            this.handleMessage(matchDataForMessage);
          }
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
          runInAction(() => {
            this.unMount = false;
          });
          break;
        case SocketResponseType.CLOSED:
          if (!this.unMount) {
            this.initializeSocket(this.onMessage, this.onOpen);
          }
          break;
      }
    }
  };

  socketDisconnect = () => {
    runInAction(() => {
      this.unMount = true;
      if (this.socket?.socket?.readyState === WebSocket.OPEN) {
        this.socket.disconnect();
      }
    });
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
      this.machines = newMachinesByNoti;
      this.realTimeData = newRealTimeDataByNoti;
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
      this.machines = newMachinesByPartCount;
    });
  };

  handleMachineStat = (statArray) => {
    const newMachines: MachineDto[] = [];
    const newRealTimeData: RealTimeDataDto[] = [];
    for (let i = 0; i < statArray.length; i++) {
      const matchData = this.machines.find(
        (data) => +data.id === +statArray[i].Id
      );
      if (matchData) {
        const result = mapperModule.machineStatMapper(statArray[i], matchData);
        newMachines.push(result.machine);
        newRealTimeData.push(result.rtd);
      }
    }

    runInAction(() => {
      this.machines = newMachines.sort((a, b) => a.machineNo - b.machineNo);
      this.realTimeData = newRealTimeData.sort(
        (a, b) => a.machineNo - b.machineNo
      );
      if (this.router.pathname === pageUrlConfig.monitor2) {
        this.setMountByMonitor();
      }
    });
  };

  handleMessage = (matchData: MachineDto) => {
    const newMachinesByMessage: MachineDto[] = [];

    for (let i = 0; i < this.machines.length; i++) {
      if (this.machines[i].id === matchData.id) {
        newMachinesByMessage[i] = { ...matchData, isReceiveMessage: true };
      } else {
        newMachinesByMessage[i] = this.machines[i];
      }
    }

    runInAction(() => {
      this.machines = newMachinesByMessage;
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
            callbacks: {
              title: () => "",
              label: (context) => {
                const target = data[context.dataIndex];
                const label = `${target.mid} : ${target.count}`;

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

  setMountByMonitor = () => {
    const newMachines = this.mountedList.machines.map((order: number) => {
      return this.machines.find((machine: MachineDto) => +machine.id === order);
    });
    const newRTDatas = this.mountedList.machines.map((order: number) => {
      return this.realTimeData.find(
        (machine: RealTimeDataDto) => +machine.id === order
      );
    });

    runInAction(() => {
      this.machines = newMachines;
      this.realTimeData = newRTDatas;
    });
  };
}
