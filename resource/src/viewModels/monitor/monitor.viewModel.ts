import { AxiosError, AxiosResponse } from "axios";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { IAlertState } from "components/alert/alert";
import { action, makeObservable, observable, runInAction } from "mobx";
import { MouseEvent } from "react";
import { DropResult } from "react-beautiful-dnd";
import { ServerUrlType } from "../../../config/constants";
import MachineSummaryDto from "../../dto/machine/machineSummary.dto";
import MonitorListDto from "../../dto/monitor/monitorList.dto";
import { Alert } from "../../modules/alert.module";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";

export default class MonitorViewModel extends DefaultViewModel {
  public list: MonitorListDto[] = [];
  public machineList: MachineSummaryDto[] = [];
  public alertState: IAlertState = {
    title: "",
    isActive: false,
    isPositive: true,
  };
  constructor(props: IDefaultProps) {
    super(props);

    makeObservable(this, {
      list: observable,
      machineList: observable,
      alertState: observable,

      getList: action,
      getListMachine: action,
    });
  }

  getList = async () => {
    await this.api
      .get(ServerUrlType.BARO, "/mon")
      .then((result: AxiosResponse<MonitorListDto[]>) => {
        const data = result.data.map((item: MonitorListDto) =>
          plainToInstance(MonitorListDto, item)
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

  getListMachine = async () => {
    await this.api
      .get(ServerUrlType.BARO, "/machine")
      .then((result: AxiosResponse<MachineSummaryDto[]>) => {
        const data = result.data.map((item: MachineSummaryDto) =>
          plainToInstance(MachineSummaryDto, item)
        );

        runInAction(() => {
          this.machineList = data.sort((a, b) => +a.machineNo - +b.machineNo);
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  insert = async (name: string) => {
    await this.api
      .post(ServerUrlType.BARO, "/mon/mon", { monitor_name: name })
      .then((result: AxiosResponse) => {
        this.getList();
        runInAction(() => {
          this.alertState = {
            title: "모니터를 추가했습니다.",
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
        });
        return false;
      });
  };

  update = async (targetId: number, name: string) => {
    await this.api
      .patch(ServerUrlType.BARO, "/mon/mon", {
        monitor_id: targetId,
        monitor_name: name,
      })
      .then((result: AxiosResponse) => {
        this.getList();
        runInAction(() => {
          this.alertState = {
            title: "모니터를 수정했습니다.",
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
        });
        return false;
      });
  };

  delete = async (targetId: number) => {
    await this.api
      .delete(ServerUrlType.BARO, `/mon/mon/${targetId}`)
      .then((result: AxiosResponse) => {
        this.getList();
        runInAction(() => {
          this.alertState = {
            title: "모니터를 삭제했습니다.",
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
        });
        return false;
      });
  };

  insertMachine = async (
    monitorId: number,
    targetId: number,
    index: number
  ) => {
    await this.api
      .post(ServerUrlType.BARO, "/mon/machine", {
        monitor_id: monitorId,
        mkey: targetId,
        ord: index,
      })
      .then((result: AxiosResponse) => {
        this.getList();

        runInAction(() => {
          this.alertState = {
            title: "기계를 추가했습니다.",
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
        });
        return false;
      });
  };

  updateMachine = async (location: number, newMachineId: number) => {
    await this.api
      .patch(ServerUrlType.BARO, "/mon/machine", {
        item_id: location,
        mkey: newMachineId,
      })
      .then((result: AxiosResponse) => {
        this.getList();
        runInAction(() => {
          this.alertState = {
            title: "기계를 수정했습니다.",
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
        });
        return false;
      });
  };

  deleteMachine = async (targetId: number) => {
    await this.api
      .delete(ServerUrlType.BARO, `/mon/machine/${targetId}`)
      .then((result: AxiosResponse) => {
        this.getList();
        runInAction(() => {
          this.alertState = {
            title: "기계를 삭제했습니다.",
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
        });
        return false;
      });
  };

  updateMachineLocation = async (targets: any) => {
    await this.api
      .patch(ServerUrlType.BARO, "/mon", targets)
      .then((result: AxiosResponse) => {
        this.getList();
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  handleDragEnd = ({ source, destination }: DropResult) => {
    // 드래그가 취소되거나 드랍 위치가 없을 때
    if (!destination) {
      return;
    }

    // 대상모니터
    const sourceMonitor = this.list.find(
      (monitor) => monitor.name === source.droppableId
    );

    // 같은 모니터 내에서 이동하는 경우
    if (source.droppableId === destination.droppableId) {
      const newData = Array.from(sourceMonitor.data);
      const [movedItem] = newData.splice(source.index, 1);
      newData.splice(destination.index, 0, movedItem);
      this.updateMachineLocation(instanceToPlain(newData));
    }
  };

  handleClickAddMonitor = (event: MouseEvent<HTMLDivElement>) => {
    Alert.prompt({
      title: "모니터 추가",
      inputType: "text",
      showCancel: true,
      placeholder: "영문, 숫자만 입력해주세요",
      confirm: "추가",
      cancel: "취소",
      callback: (result: string) => {
        this.insert(result);
      },
      validation: (result: string, resolve: (error?: string) => void) => {
        if (result === "") {
          resolve("새 모니터의 이름을 입력해 주세요");
        } else if (!/^[a-zA-Z0-9]+$/.test(result)) {
          resolve("숫자 또는 영문만 입력 가능합니다");
        } else {
          resolve();
        }
      },
    });
  };

  handleClickModifyMonitor = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    Alert.prompt({
      title: "모니터명 변경",
      inputType: "text",
      showCancel: true,
      placeholder: "영문, 숫자만 입력해주세요",
      confirm: "변경",
      cancel: "취소",
      callback: (result: string) => {
        this.update(+value, result);
      },
      validation: (result: string, resolve: (error?: string) => void) => {
        if (result === "") {
          resolve("모니터의 새로운 이름을 입력해 주세요");
        } else if (!/^[a-zA-Z0-9]+$/.test(result)) {
          resolve("숫자 또는 영문만 입력 가능합니다");
        } else {
          resolve();
        }
      },
    });
  };

  handleClickDeleteMonitor = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    const monitorName = this.getNameMonitor(+value);

    Alert.confirm({
      title: `모니터 ${monitorName}를 삭제합니다`,
      callback: () => {
        this.delete(+value);
      },
      confirm: "삭제",
      cancel: "취소",
    });
  };

  handleClickAddMachine = (event: MouseEvent<HTMLDivElement>) => {
    const { id, index } = event.currentTarget.dataset;
    const machineArray = this.machineList.map((machine: MachineSummaryDto) => {
      return `${machine.machineNo} ${machine.mid}`;
    });

    Alert.selector({
      title: "이곳에 보여질 기계를 선택해 주세요",
      input: "select",
      options: machineArray,
      showCancel: true,
      callback: (result: string) => {
        const targetId = this.machineList[+result].id;
        this.insertMachine(+id, targetId, +index);
      },
    });
  };

  handleClickModifyMachine = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    const machineArray = this.machineList.map((machine: MachineSummaryDto) => {
      return `${machine.machineNo} ${machine.mid}`;
    });

    Alert.selector({
      title: "이곳에 보여질 기계를 선택해 주세요",
      input: "select",
      options: machineArray,
      showCancel: true,
      callback: (result: string) => {
        this.updateMachine(+value, +this.machineList[+result].id);
      },
    });
  };

  handleClickDeleteMachine = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    const target = this.getNameMachine(+value);

    Alert.confirm({
      title: `${target.machine}을(를) ${target.monitor}에서 삭제합니다`,
      callback: () => {
        this.deleteMachine(+value);
      },
      confirm: "삭제",
      cancel: "취소",
    });
  };

  getNameMachine = (itemId: number) => {
    let monitor = "";
    let machine = "";

    for (let i = 0; i < this.list.length; i++) {
      for (let j = 0; j < this.list[i].data.length; j++) {
        if (this.list[i].data[j].itemId === +itemId) {
          monitor = this.list[i].name;
          machine = this.list[i].data[j].mid;
          break;
        }
      }
    }

    return { monitor, machine };
  };

  getNameMonitor = (itemId: number) => {
    let monitor = "";

    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id === +itemId) {
        monitor = this.list[i].name;

        break;
      }
    }

    return monitor;
  };
}
