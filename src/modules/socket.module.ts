import { makeAutoObservable, runInAction } from "mobx";
import { ApiModule, ServerResponse } from "./api.module";
import {
  EdgeMachineSocketDataType,
  ServerUrlType,
} from "../../config/constants";
import { AxiosResponse } from "axios";
import TransmitterDto from "../dto/transmitters/transmitters.dto";
import { plainToInstance } from "class-transformer";

interface IProps {
  onMessage: (response: MessageEvent) => void;
  company: string;
  isAll?: boolean;
}

export class SocketModule {
  protected api: ApiModule;
  public socket: WebSocket;
  public url: string;
  public readyState: number;
  public pingIntervalSeconds: number = 20000;
  public intervalId: any;
  public token: string = "";
  public sender: string;
  public onMessage: (response: MessageEvent) => void;

  constructor({ onMessage, company, isAll = false }: IProps) {
    this.api = ApiModule.getInstance();
    this.sender = window.localStorage.sender;
    this.url = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}${
      this.sender
    }?ent=${company}&view=${
      isAll ? EdgeMachineSocketDataType.ALL : EdgeMachineSocketDataType.NOTI
    }`;
    this.connect = this.connect.bind(this);
    this.token = window.localStorage.token;
    this.onMessage = onMessage;
  }

  public connect(onOpen: () => void) {
    runInAction(() => {
      this.socket = new WebSocket(this.url, "transmitter");
      this.socket.onopen = onOpen;
      this.socket.onmessage = this.onMessage;
      this.socket.onerror = this.onError;
      this.socket.onclose = this.onClose;
    });
  }

  public onClose = () => {
    console.log("WebSocket closed");
  };

  public onError = (error) => {
    console.error("WebSocket error:", error);
  };

  public disconnect = () => {
    this.socket.close(); // 소켓 연결 해제
  };

  public sendEvent = <T>(data: T) => {
    this.socket.send(JSON.stringify(data));
  };
}
