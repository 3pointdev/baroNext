import { runInAction } from "mobx";
import { ApiModule, ServerResponse } from "./api.module";
import { ServerUrlType } from "../../config/constants";
import { AxiosResponse } from "axios";
import SocketHandlerModule from "./socketTransform.module";
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
  public edgeData: TransmitterDto[] = [];
  public sender: string;
  public onMessage: (response: MessageEvent) => void;

  constructor({ onMessage, company, isAll = false }: IProps) {
    this.api = ApiModule.getInstance();
    this.sender = window.localStorage.sender;
    this.url = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}${
      this.sender
    }?ent=${company}&view=${isAll ? "all" : "noti"}`;
    this.connect = this.connect.bind(this);
    this.token = window.localStorage.token;
    this.onMessage = onMessage;
  }

  public connect() {
    runInAction(() => {
      this.socket = new WebSocket(this.url, "transmitter");
      this.socket.onopen = this.onOpen;
      this.socket.onmessage = this.onMessage;
      this.socket.onerror = this.onError;
      this.socket.onclose = this.onClose;
    });
  }

  public onOpen = () => {
    console.log("WebSocket connected");

    if (this.socket.readyState !== WebSocket.OPEN) {
      return false;
    }
    //소켓 연결완료 후 사용자가 소켓서버 이용을 시작함을 서버에 알리는 이벤트
    this.sendEvent({ token: this.token });
    this.getMachineStat();
  };

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

  public getMachineStat = () => {
    // setTimeout(() => {
    this.api
      .post(ServerUrlType.APIS, "/api/cloud/installedTransmitters")
      .then((result: AxiosResponse<ServerResponse<TransmitterDto[]>>) => {
        const data = result.data.data.map((item) =>
          plainToInstance(TransmitterDto, item)
        );
        runInAction(() => {
          this.edgeData = data;
        });
        data.forEach((item: TransmitterDto) => {
          this.api
            .post(ServerUrlType.EDGE, "/api/edge/edge_machine_stat", {
              transmitter: item.id,
            })
            .then((result: AxiosResponse) => {
              // console.log(result);
            });
        });
      });
    // }, 2000);
  };
}
