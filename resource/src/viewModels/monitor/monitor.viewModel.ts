import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
import MonitorListDto from "../../dto/monitor/monitorList.dto";
import { AxiosError, AxiosResponse } from "axios";
import { ServerUrlType } from "../../../config/constants";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { DropResult } from "react-beautiful-dnd";
import { MouseEvent } from "react";
import { Alert } from "../../modules/alert.module";
import MonitorDto from "../../dto/monitor/monitor.dto";
import MachineSummaryDto from "../../dto/machine/machineSummary.dto";

export default class MonitorViewModel extends DefaultViewModel {
  public list: MonitorListDto[] = [];
  public machineList: MachineSummaryDto[] = [];

  constructor(props: IDefaultProps) {
    super(props);

    makeObservable(this, {
      list: observable,
      machineList: observable,

      getList: action,
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
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
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
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  delete = async (targetId: number) => {
    await this.api
      .delete(ServerUrlType.BARO, `/mon/mon/${targetId}`)
      .then((result: AxiosResponse) => {
        this.getList();
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
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
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
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
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  deleteMachine = async (targetId: number) => {
    await this.api
      .delete(ServerUrlType.BARO, `/mon/machine/${targetId}`)
      .then((result: AxiosResponse) => {
        this.getList();
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  updateMachineLocation = async (targets: any) => {
    console.log(targets);
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

    Alert.confirm({
      title: "이 모니터를 삭제합니다",
      callback: () => {
        console.log("삭제 OK");
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
      callback: (result: string) => {
        this.updateMachine(+value, +this.machineList[+result].id);
      },
    });
  };

  handleClickDeleteMachine = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    Alert.confirm({
      title: "이 기계를 모니터에서 삭제합니다",
      callback: () => {
        this.deleteMachine(+value);
      },
      confirm: "삭제",
      cancel: "취소",
    });
  };
}
