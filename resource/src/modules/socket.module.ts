import { runInAction } from "mobx";
import { ApiModule } from "./api.module";
import { EdgeMachineSocketDataType } from "config/constants";

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
  public unMount: boolean = false;

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
    if (!this.unMount) {
      console.log("try reload");
      location.reload();
    }
  };

  public onError = (error) => {
    console.error("WebSocket error:", error);
  };

  public disconnect = () => {
    this.socket.close(); // 소켓 연결 해제
  };

  public sendEvent = <T>(data: T) => {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  };

  public getUnMount = () => {
    return this.unMount;
  };
}
