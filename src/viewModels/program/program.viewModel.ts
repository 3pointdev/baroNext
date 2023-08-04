import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
import { AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import {
  BinaryMessageType,
  DatePickerButtonType,
  ServerUrlType,
  SocketResponseType,
} from "../../../config/constants";
import TransmitterDto from "../../dto/transmitters/transmitters.dto";
import { ServerResponse } from "../../modules/api.module";
import ProgramDto from "../../dto/program/program.dto";
import FunctionDto from "../../dto/program/function.dto";
import { MouseEvent } from "react";
import moment from "moment";

export interface IActiveTarget {
  machine: number;
  code: number;
}

export interface ILoding {
  machine: boolean;
  code: boolean;
}

export default class ProgramViewModel extends DefaultViewModel {
  public edgeData: TransmitterDto[] = [];
  public activeMachineList: ProgramDto[] = [];
  public activeCallfunc: FunctionDto[] = [];
  public activeCode: string = "";
  public activeTarget: IActiveTarget = { machine: 1, code: 0 };
  public isLoading: ILoding = { machine: true, code: false };

  public targetDate: string = moment().format("YYYY-MM-DD");
  public activeComponent: number = 0;

  constructor(props: IDefaultProps) {
    super(props);

    makeObservable(this, {
      edgeData: observable,
      activeMachineList: observable,
      activeTarget: observable,
      activeCallfunc: observable,
      activeCode: observable,
      isLoading: observable,
      activeComponent: observable,
      targetDate: observable,

      insertInstalledTransmitters: action,
    });
  }

  public onOpen = () => {
    console.log("WebSocket connected");

    //소켓 연결완료 후 사용자가 소켓서버 이용을 시작함을 서버에 알리는 이벤트
    this.socket.sendEvent({ token: this.auth.token });

    this.insertInstalledTransmitters();
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
          this.insertListActiveMachine();
        });
      });
  };

  onMessage = async (response: MessageEvent) => {
    if (typeof response.data === "object") {
      //바이너리 메시지
      const updateData = await response.data.text();
      const dataArray = updateData.split("|");
      switch (dataArray[1]) {
        case BinaryMessageType.NOTI:
          console.log("noti", dataArray);
          break;
        case BinaryMessageType.PART_COUNT:
          console.log("part_count", dataArray);
          break;
        case BinaryMessageType.MESSAGE:
          console.log("message", dataArray);
          break;
        case BinaryMessageType.ALARM:
          console.log("alarm", dataArray);
          break;
      }
    } else {
      //오브젝트 메시지
      const objectMessage = JSON.parse(response.data);

      switch (objectMessage.response) {
        case SocketResponseType.CALL_FUNC:
          if (this.activeComponent !== 0) {
            return runInAction(() => {
              this.isLoading = { machine: false, code: false };
            });
          }

          if (typeof objectMessage.data === "string") {
            runInAction(() => {
              this.activeCode = objectMessage.data.replaceAll("%", "\n");
              this.isLoading = { machine: false, code: false };
            });
          } else {
            runInAction(() => {
              this.activeCallfunc = objectMessage.data.map(
                (item: FunctionDto) => plainToInstance(FunctionDto, item)
              );
              this.isLoading = { machine: false, code: false };
            });
          }
          break;
        case SocketResponseType.CALL_FUNC_FAIL:
          runInAction(() => {
            this.isLoading = { machine: false, code: false };
          });
          break;
        case SocketResponseType.CONNECT:
          break;
        case SocketResponseType.CLOSED:
          break;
      }
    }
  };

  insertListActiveMachine = async () => {
    await this.api
      .post(ServerUrlType.APIS, "/api/cloud/active_machine", {
        enterprise: this.edgeData[0].enterprise,
        transmitter: this.edgeData[0].id,
      })
      .then((result: AxiosResponse<ServerResponse<ProgramDto[]>>) => {
        const data = result.data.data.map((item: ProgramDto) =>
          plainToInstance(ProgramDto, item)
        );

        const active = data.find((item: ProgramDto) => item.status === "on");
        const targetInformation = {
          ...active,
          autostartORG: active.autostart,
          ipORG: active.ip,
          nameORG: active.name,
          portORG: active.port,
          func: "prgdir",
        };

        runInAction(() => {
          this.activeMachineList = data.sort(
            (a, b) => +a.machineNo - +b.machineNo
          );
          this.activeTarget = { machine: +active.machineNo, code: 0 };
          this.insertCallfunc(targetInformation);
        });
      })
      .catch((error) => {
        console.log("error : ", error);
        return false;
      });
  };

  insertCallfunc = async (targetInfomation) => {
    await this.api.post(
      ServerUrlType.EDGE,
      "/api/edge/callfunc",
      targetInfomation
    );
  };

  getCallFuncListByDate = async (targetMachine: number) => {
    await this.api
      .get(
        ServerUrlType.BARO,
        `/program/getList/${targetMachine}/${this.targetDate}`
      )
      .then((result: AxiosResponse<any>) => {
        const data = result.data.map((item) =>
          plainToInstance(FunctionDto, {
            comment: item.program,
            date: item.date,
            name: item.lot,
            len: 0,
          })
        );

        runInAction(() => {
          this.activeCallfunc = data;
          this.isLoading = { machine: false, code: false };
        });
      })
      .catch((error) => {
        console.log("error : ", error);
        return false;
      });
  };

  getCode = async (targetFunction: number) => {
    await this.api
      .get(ServerUrlType.BARO, `/program/getNcCode/${targetFunction}`)
      .then((result: AxiosResponse<any>) => {
        runInAction(() => {
          this.activeCode = result.data[0].program_code.replaceAll("%", "\n");
          this.isLoading = { machine: false, code: false };
        });
      })
      .catch((error) => {
        console.log("error : ", error);
        return false;
      });
  };

  handleClickFunction = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    if (+value === this.activeTarget.code) return false;

    if (this.activeComponent === 0) {
      const targetMachine = this.activeMachineList.find(
        (machine: ProgramDto) =>
          +machine.machineNo === this.activeTarget.machine
      );
      const targetInfomation = {
        ...targetMachine,
        autostartORG: targetMachine.autostart,
        ipORG: targetMachine.ip,
        nameORG: targetMachine.name,
        portORG: targetMachine.port,
        func: "loadfile",
        no: value.padStart(4, "0"),
      };

      this.insertCallfunc(targetInfomation);
    } else {
      this.getCode(+value);
    }
    runInAction(() => {
      this.activeTarget = { machine: this.activeTarget.machine, code: +value };
      this.isLoading = { machine: false, code: true };
      this.activeCode = "";
    });
  };

  handleClickMachine = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    if (+value === this.activeTarget.machine) return false;

    if (this.activeComponent === 0) {
      const targetMachine = this.activeMachineList.find(
        (machine: ProgramDto) => +machine.machineNo === +value
      );

      const targetInfomation = {
        ...targetMachine,
        autostartORG: targetMachine.autostart,
        ipORG: targetMachine.ip,
        nameORG: targetMachine.name,
        portORG: targetMachine.port,
        func: "prgdir",
      };

      this.insertCallfunc(targetInfomation);
    } else {
      this.getCallFuncListByDate(+value);
    }
    runInAction(() => {
      this.activeCallfunc = [];
      this.activeCode = "";
      this.activeTarget = { machine: +value, code: 0 };
      this.isLoading = { machine: true, code: false };
    });
  };

  handleClickDownloadText = (event: MouseEvent<HTMLButtonElement>) => {
    const fileName = `${
      this.activeCallfunc.find(
        (callfunc: FunctionDto) => +callfunc.name === this.activeTarget.code
      ).comment
    }.txt`;
    const output = this.activeCode;
    const element = document.createElement("a");
    const file = new Blob([output], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element); // FireFox
    element.click();
  };

  handleClickActiveComponent = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    if (+value === this.activeComponent) return;

    if (+value === 0) {
      const active = this.activeMachineList.find(
        (item: ProgramDto) => +item.machineNo === this.activeTarget.machine
      );
      const targetInformation = {
        ...active,
        autostartORG: active.autostart,
        ipORG: active.ip,
        nameORG: active.name,
        portORG: active.port,
        func: "prgdir",
      };

      runInAction(() => {
        this.insertCallfunc(targetInformation);
      });
    } else {
      this.getCallFuncListByDate(this.activeTarget.machine);
    }

    runInAction(() => {
      this.activeCallfunc = [];
      this.activeCode = "";
      this.isLoading = { machine: true, code: false };
      this.activeTarget = { machine: this.activeTarget.machine, code: 0 };
      this.activeComponent = +value;
    });
  };

  handleChangeDay = (date: string) => {
    runInAction(() => {
      this.targetDate = moment(date).format("YYYY-MM-DD");
      this.activeCallfunc = [];
      this.activeCode = "";
      this.isLoading = { machine: true, code: false };
      this.activeTarget = { machine: this.activeTarget.machine, code: 0 };
    });
    this.getCallFuncListByDate(this.activeTarget.machine);
  };

  handleClickDay = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    switch (value) {
      case DatePickerButtonType.TODAY:
        runInAction(() => {
          this.targetDate = moment(new Date()).format("YYYY-MM-DD");
          this.activeCallfunc = [];
          this.activeCode = "";
          this.isLoading = { machine: true, code: false };
          this.activeTarget = { machine: this.activeTarget.machine, code: 0 };
        });
        break;
      case DatePickerButtonType.NEXT:
        const newTimeMs = new Date(this.targetDate).getTime();
        const newNextDay = new Date(newTimeMs + 86400000);
        runInAction(() => {
          this.targetDate = moment(newNextDay).format("YYYY-MM-DD");
          this.activeCallfunc = [];
          this.activeCode = "";
          this.isLoading = { machine: true, code: false };
          this.activeTarget = { machine: this.activeTarget.machine, code: 0 };
        });
        break;
      case DatePickerButtonType.PREV:
        const baseDateInMillis = new Date(this.targetDate).getTime();
        const newPrevDay = new Date(baseDateInMillis - 86400000);
        runInAction(() => {
          this.targetDate = moment(newPrevDay).format("YYYY-MM-DD");
          this.activeCallfunc = [];
          this.activeCode = "";
          this.isLoading = { machine: true, code: false };
          this.activeTarget = { machine: this.activeTarget.machine, code: 0 };
        });

        break;
    }

    this.getCallFuncListByDate(this.activeTarget.machine);
  };
}
