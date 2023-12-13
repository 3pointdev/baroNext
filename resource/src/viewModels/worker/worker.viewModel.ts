import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { IAlertState } from "components/alert/alert";
import {
  ServerUrlType,
  SocketBroadcastType,
  ValidType,
} from "config/constants";
import { action, makeObservable, observable, runInAction } from "mobx";
import { ChangeEvent, MouseEvent } from "react";
import MonitorNoticeDto from "src/dto/monitor/notice.dto";
import WorkerDto from "src/dto/worker/worker.dto";
import { Alert } from "src/modules/alert.module";
import Swal from "sweetalert2";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";

export default class WorkerViewModel extends DefaultViewModel {
  public notice: string = "";
  public noticeValid: ValidType = ValidType.DEFAULT;
  public list: WorkerDto[] = [];
  public alertState: IAlertState = {
    isPositive: true,
    isActive: false,
    title: "string",
  };
  constructor(props: IDefaultProps) {
    super(props);

    makeObservable(this, {
      notice: observable,
      noticeValid: observable,
      list: observable,
      alertState: observable,

      getList: action,
    });
  }

  public getList = async () => {
    await this.api
      .get(ServerUrlType.BARO, "/worker/selectWorker")
      .then((result: AxiosResponse<WorkerDto[]>) => {
        const data = result.data.map((item: WorkerDto) =>
          plainToInstance(WorkerDto, item)
        );

        runInAction(() => {
          this.list = data;
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  public insertWorker = async (params) => {
    await this.api
      .post(ServerUrlType.BARO, "/worker/insertWorker", params)
      .then(() => {
        let newList = [...this.list];
        for (let i = 0; i < newList.length; i++) {
          if (+newList[i].id === +params.id) {
            newList[i].worker = params.worker;
          }
        }
        runInAction(() => {
          this.list = newList;
          this.alertState = {
            title: "작업자를 저장하였습니다.",
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

  public updateWorker = async (params) => {
    await this.api
      .patch(ServerUrlType.BARO, "/worker/updateWorker", params)
      .then(() => {
        let newList = [...this.list];
        for (let i = 0; i < newList.length; i++) {
          if (+newList[i].id === +params.id) {
            newList[i].worker = params.worker;
          }
        }
        runInAction(() => {
          this.list = newList;
          this.alertState = {
            title: "작업자를 저장하였습니다.",
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

  handleClickEdit = (event: MouseEvent<HTMLDivElement>) => {
    const { id } = event.currentTarget.dataset;
    const target = this.list.find((machine: WorkerDto) => machine.id === +id);

    Alert.freeFormat({
      title: "작업자 변경",
      html:
        '<input type="text" id="textInput" class="swal2-input" placeholder="기계 이름" value="' +
        (target.worker === null ? "" : target.worker) +
        '" required>',
      cancel: "취소",
      confirm: "저장",
      callback: () => {
        const textInput = document.getElementById(
          "textInput"
        ) as HTMLInputElement;

        // 유효성 검사
        if (textInput.value.length > 4) {
          Swal.showValidationMessage(
            "작업자 이름은 4글자 까지 입력 가능합니다"
          );
        }

        if (!/^$|^[가-힣]+$/.test(textInput.value)) {
          Swal.showValidationMessage(
            "작업자 이름은 한글만 입력 가능합니다\n삭제 시 빈값 저장"
          );
        }

        return textInput.value;
      },
    }).then(
      (result: {
        isConfirmed: boolean;
        isDenied: boolean;
        isDismissed: boolean;
        value: string;
      }) => {
        if (result.isConfirmed) {
          if (target.worker === null) {
            this.insertWorker({
              id: id,
              worker: result.value,
            });
          } else {
            this.updateWorker({
              id: id,
              worker: result.value,
            });
          }
        }
      }
    );
  };

  public onOpen = () => {
    console.log("open socket!");
  };

  public onMessage = (message) => {
    if (typeof message.data === "object") return;

    const data = JSON.parse(message.data);

    if (data?.data?.type === "reload") {
      location.reload();
    }
  };

  getMonitorList = async () => {
    await this.api
      .get(ServerUrlType.BARO, "/mon")
      .then((result: AxiosResponse) => {
        this.getNotice(result.data[0].id);
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  getNotice = async (id: string) => {
    await this.api
      .get(ServerUrlType.APIS, `/api/noti/id/${id}`)
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

  insertBroadcast = async (value: string) => {
    const params = {
      enterprise: this.auth.enterprise,
      data: {
        noti: value,
        type: SocketBroadcastType.RELOAD,
      },
    };

    await this.api
      .post(ServerUrlType.EDGE, "/api/edge/broadcast", params)
      .then((result: AxiosResponse) => {
        runInAction(() => {
          this.alertState = {
            title: "공지사항을 저장하였습니다.",
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

  insertNotice = async () => {
    this.insertBroadcast(this.notice);
    await this.api
      .post(ServerUrlType.APIS, "/api/noti/al", {
        noti: this.notice,
      })
      .then((result: AxiosResponse) => {})
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  public handleChangeNotice = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.length > 50) {
      runInAction(() => {
        this.noticeValid = ValidType.FAIL;
      });
    } else {
      runInAction(() => {
        this.noticeValid = ValidType.DEFAULT;
        this.notice = value;
      });
    }
  };

  public handleClickNotice = () => {
    this.insertNotice();
  };
}
