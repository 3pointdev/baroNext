import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import dayjs from "dayjs";
import { action, makeObservable, observable, runInAction } from "mobx";
import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import Swal from "sweetalert2";

import { IAlertState } from "components/alert/alert";
import TableModel from "src/models/table/table.model";
import {
  BinaryMessageType,
  ServerUrlType,
  SocketBroadcastType,
  SocketResponseType,
  SortType,
} from "../../../config/constants";
import pageUrlConfig from "../../../config/pageUrlConfig";
import MachineDto from "../../dto/machine/machine.dto";
import MachineSummaryDto from "../../dto/machine/machineSummary.dto";
import NotificationDto from "../../dto/machine/notification.dto";
import RealTimeDataDto from "../../dto/machine/realTimeData.dto";
import MonitorListDto from "../../dto/monitor/monitorList.dto";
import MountedDto from "../../dto/monitor/mounted.dto";
import MonitorNoticeDto from "../../dto/monitor/notice.dto";
import TransmitterDto from "../../dto/transmitters/transmitters.dto";
import NotificationModel from "../../models/machine/notification.model";
import { Alert } from "../../modules/alert.module";
import { ServerResponse } from "../../modules/api.module";
import mapperModule from "../../modules/mapper.module";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";

export default class MachineViewModel extends DefaultViewModel {
  public machines: MachineDto[] = [];
  public realTimeData: RealTimeDataDto[] = [];
  public processChart: any = false;
  public edgeData: TransmitterDto[] = [];

  public machineSummary: MachineSummaryDto[] = [];
  public tableHeader: TableModel[] = [];
  public notiList: NotificationDto[] = [];
  public notiModel: NotificationModel = new NotificationModel();
  public mountedList: MountedDto = new MountedDto();

  public notice: string = "";
  public unMount: boolean = false;

  public alertState: IAlertState = {
    isPositive: true,
    isActive: false,
    title: "string",
  };

  constructor(props: IDefaultProps) {
    super(props);
    this.tableHeader = [
      plainToInstance(TableModel, {
        title: "기계명",
        column: "mid",
        align: "center",
        size: "20vw",
        isSort: true,
        sortState: SortType.DEFAULT,
      }),
      plainToInstance(TableModel, {
        title: "알람일자",
        column: "date",
        align: "left",
        size: "20vw",
        isSort: true,
        sortState: SortType.DESCENDING,
      }),
      plainToInstance(TableModel, {
        title: "알람내용",
        column: "message",
        align: "left",
        size: "55vw",
        isSort: false,
      }),
    ];
    makeObservable(this, {
      machines: observable,
      realTimeData: observable,
      processChart: observable,
      edgeData: observable,
      machineSummary: observable,
      tableHeader: observable,
      notiList: observable,
      notiModel: observable,
      mountedList: observable,
      notice: observable,
      alertState: observable,

      onMessage: action,
      getMachineList: action,
      getMounted: action,
      handleClickSort: action,
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
        setTimeout(() => {
          data.forEach((item: TransmitterDto) => {
            this.insertMachineStat(item);
          });
        }, 100);
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
        if (result.data.length <= 0) {
          runInAction(() => {
            this.notiModel = {
              ...this.notiModel,
              startDay: dayjs(this.notiModel.startDay)
                .subtract(1, "day")
                .format("YYYY-MM-DD"),
              endDay: dayjs(this.notiModel.endDay)
                .subtract(1, "day")
                .format("YYYY-MM-DD"),
            };
          });
          this.insertListNotification();
        }
        const data = result.data.map((item: NotificationDto) => {
          return plainToInstance(NotificationDto, {
            date: item.date,
            message: item.message,
            mid: item.mid,
          });
        });

        let filterData = this.searchKeywordFilter(
          this.notiModel.searchKeyword,
          data
        );

        if (filterData.length < 1) {
          filterData = [
            plainToInstance(NotificationDto, {
              mid: "-",
              date: "-",
              message: "검색 된 데이터가 없습니다.",
            }),
          ];
        }

        runInAction(() => {
          this.notiList = filterData;
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
        runInAction(() => {
          this.alertState = {
            title: "기기정보를 저장하였습니다.",
            isActive: true,
            isPositive: true,
          };
        });
        setTimeout(() => {
          runInAction(() => {
            this.alertState = {
              title: "",
              isActive: false,
              isPositive: true,
            };
          });
        }, 3000);
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        runInAction(() => {
          this.alertState = {
            title: "실패했습니다.\n잠시 후 다시 시도해주세요.",
            isActive: true,
            isPositive: false,
          };
        });
        setTimeout(() => {
          runInAction(() => {
            this.alertState = {
              title: "",
              isActive: false,
              isPositive: true,
            };
          });
        }, 3000);
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
        [type]: dayjs(date).format("YYYY-MM-DD"),
      };
      this.insertListNotification();
    });
  };

  /**
   * 테이블 내 헤더 별 정렬 변경 함수
   * @id 헤더 index
   */
  handleClickSort = (event: MouseEvent<HTMLTableCellElement>) => {
    const { id } = event.currentTarget.dataset;
    let newHeader = this.tableHeader;
    let targetHeader = newHeader[+id];
    let newList = this.notiList;
    newHeader[+id] = targetHeader;

    if (targetHeader.sortState === SortType.DESCENDING) {
      targetHeader.sortState = SortType.ASCENDING;
      if (targetHeader.column === "date") {
        newList.sort(
          (a, b) =>
            +new Date(a[targetHeader.column]) -
            +new Date(b[targetHeader.column])
        );
        newHeader[0].sortState = SortType.DEFAULT;
      } else if (targetHeader.column === "mid") {
        newList.sort((a, b) => a.mid.localeCompare(b.mid));
        newHeader[1].sortState = SortType.DEFAULT;
      }
    } else {
      targetHeader.sortState = SortType.DESCENDING;
      if (targetHeader.column === "date") {
        newList.sort(
          (a, b) =>
            +new Date(b[targetHeader.column]) -
            +new Date(a[targetHeader.column])
        );
        newHeader[0].sortState = SortType.DEFAULT;
      } else if (targetHeader.column === "mid") {
        newList.sort((a, b) =>
          b.mid.toLowerCase().localeCompare(a.mid.toLowerCase())
        );
        newHeader[1].sortState = SortType.DEFAULT;
      }
    }

    runInAction(() => {
      this.tableHeader = plainToInstance(TableModel, newHeader);
      this.notiList = newList;
    });
  };

  handleClickFilter = (event: MouseEvent<HTMLDivElement>) => {
    const { id } = event.currentTarget.dataset;
    if (+id === this.notiModel.mkey) return;

    runInAction(() => {
      this.notiModel = { ...this.notiModel, mkey: +id };
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
        '<input type="number" id="numberInput" class="swal2-input" placeholder="기계 번호" min="1" value="' +
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
        if (+numberInput.value < 1 || +numberInput.value > 999) {
          Swal.showValidationMessage(
            "기기번호는 1부터 999까지 입력 가능합니다."
          );
        }
        if (/[^a-zA-Z0-9]/.test(textInput.value)) {
          Swal.showValidationMessage("기계명은 영문, 숫자만 입력 가능합니다.");
        }
        if (textInput.value.length > 15) {
          Swal.showValidationMessage("기계명은 15자 이내로 입력 가능합니다.");
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

  getNotice = async (monitorList: MonitorListDto[], monitorName: string) => {
    const monitorId = monitorList.find(
      (monitor: MonitorListDto) => monitor.name === monitorName
    ).id;
    await this.api
      .get(ServerUrlType.APIS, `/api/noti/id/${monitorId}`)
      .then((result: AxiosResponse<MonitorNoticeDto>) => {
        runInAction(() => {
          this.notice = result.data[0].noti;
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  insertBroadcast = async (value: string, type: string) => {
    const params = {
      enterprise: this.auth.enterprise,
      data: {
        noti: value,
      },
    };

    if (type === "monitor") {
      params.data["monitor"] = this.mountedList.id.toString();
      params.data["type"] = SocketBroadcastType.NOTICE;
    } else {
      params.data["type"] = SocketBroadcastType.RELOAD;
    }

    await this.api
      .post(ServerUrlType.EDGE, "/api/edge/broadcast", params)
      .then((result: AxiosResponse) => {})
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  insertNotice = async (value: string) => {
    await this.api
      .post(ServerUrlType.APIS, "/api/noti/", {
        monitor_id: this.mountedList.id.toString(),
        noti: value,
      })
      .then((result: AxiosResponse) => {
        this.insertBroadcast(value, "monitor");
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  insertNoticeAll = async (value: string) => {
    this.insertBroadcast(value, "all");
    await this.api
      .post(ServerUrlType.APIS, "/api/noti/al", {
        noti: value,
      })
      .then((result: AxiosResponse) => {})
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
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
    runInAction(() => {
      this.unMount = false;
    });
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
        default:
          // let realTimeData = this.realTimeData;
          // let updateData: { [key: string]: string } | RealTimeDataDto = {
          //   Id: dataArray[2],
          // };
          // for (let i = 4; i < dataArray.length; i = i + 2) {
          //   if (["Xact", "Yact", "Zact"].includes(dataArray[i]))
          //     updateData[dataArray[i]] = dataArray[i + 1];
          // }
          // updateData = plainToInstance(RealTimeDataDto, updateData, {
          //   exposeUnsetFields: false,
          // });

          // for (let i = 0; i < realTimeData.length; i++) {
          //   if (realTimeData[i].id === updateData.id) {

          //   }
          // }

          // if (dataArray[1] === "VC430-2") {
          //   let dataObject: { [key: string]: string } = {
          //     company: dataArray[0],
          //     mid: dataArray[1],
          //   };

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
        case SocketResponseType.BROADCAST:
          if (objectMessage.data.type === SocketBroadcastType.NOTICE) {
            if (this.checkNoticeUpdate(objectMessage)) {
              runInAction(() => {
                this.notice = objectMessage.data.noti;
              });
            }
          } else {
            location.reload();
          }
          break;
        case SocketResponseType.CONNECT:
          runInAction(() => {
            this.unMount = false;
          });
          break;
        case SocketResponseType.CLOSED:
          if (!this.unMount) {
            location.reload();
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

  checkNoticeUpdate = (objectMessage) => {
    let result = true;

    if (objectMessage.enterprise !== this.auth.enterprise) {
      result = false;
    }

    if (+objectMessage.data.monitor !== this.mountedList.id) {
      result = false;
    }
    return result;
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
