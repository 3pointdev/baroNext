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
} from "../../../config/constants";
import RealTimeDataDto from "../../dto/machine/realTimeData.dto";
import timeModule from "../../modules/time.module";

export default class MachineViewModel extends DefaultViewModel {
  public machines: MachineDto[] = [];
  public realTimeData: RealTimeDataDto[] = [];
  public processedQuantity: ProcessedQuantityDto[] = [];
  public processChart: any = false;

  constructor(props: IDefaultProps) {
    super(props);

    makeObservable(this, {
      machines: observable,
      realTimeData: observable,
      processedQuantity: observable,
      processChart: observable,

      onMessage: action,
      getMachineList: action,
      getProcessedQuantity: action,
      setChart: action,
    });
  }

  onMessage = async (response: MessageEvent) => {
    if (typeof response.data === "object") {
      //바이너리 메시지
      const updateData = await response.data.text();
      const dataArray = updateData.split("|");
      switch (dataArray[1]) {
        case BinaryMessageType.NOTI:
          const resultNoti = this.dataTransformForNoti(dataArray);
          const newMachinesByNoti: MachineDto[] = [];
          const newRealTimeDataByNoti: RealTimeDataDto[] = [];

          for (let i = 0; i < this.machines.length; i++) {
            if (this.machines[i].id === resultNoti.machine.id) {
              newMachinesByNoti[i] = resultNoti.machine;
              newRealTimeDataByNoti[i] = resultNoti.rtd;
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
          break;
        case BinaryMessageType.PART_COUNT:
          console.log("part", dataArray);
          const resultPartCount = this.dataTransformForPartCount(dataArray);
          const newMachinesByPartCount: MachineDto[] = [];

          for (let i = 0; i < this.machines.length; i++) {
            if (this.machines[i].id === resultPartCount.id) {
              newMachinesByPartCount[i] = resultPartCount;
            } else {
              newMachinesByPartCount[i] = this.machines[i];
            }
          }

          runInAction(() => {
            this.machines = newMachinesByPartCount.sort(
              (a, b) => a.machineNo - b.machineNo
            );
          });

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
          const newMachines: MachineDto[] = [];
          const newRealTimeData: RealTimeDataDto[] = [];
          for (let i = 0; i < objectMessage.data.length; i++) {
            const result = this.dataTransformForMachineStat(
              objectMessage.data[i]
            );
            newMachines.push(result.machine);
            newRealTimeData.push(result.rtd);
          }
          runInAction(() => {
            this.machines = newMachines.sort(
              (a, b) => a.machineNo - b.machineNo
            );
            this.realTimeData = newRealTimeData.sort(
              (a, b) => a.machineNo - b.machineNo
            );
          });
          break;
        case SocketResponseType.CONNECT:
          break;
        case SocketResponseType.CLOSED:
          break;
      }
    }
  };

  getMachineList = async () => {
    await this.api
      .get(ServerUrlType.BARO, "/machine/currentList")
      .then((result: AxiosResponse<any[]>) => {
        const data = result.data;

        const newMachines = data.map((item) =>
          this.dataTransformForCurrentList(item)
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
          const data = result.data.map((data: ProcessedQuantityDto) =>
            plainToInstance(ProcessedQuantityDto, data)
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

  setChart = (data: ProcessedQuantityDto[]) => {
    runInAction(() => {
      this.processChart = {
        options: {
          maxBarThickness: 80,
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
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
          },
          scales: {
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
          },
        },
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

  dataTransformForCurrentList(item) {
    const plainData = {
      active: item.active_time,
      machine_no: item.machine_no,
      Mid: item.mid,
      Id: item.mkey,
      PartCount: item.process_count,
      PlanCount: item.plan_count,
      prdct_end: item.prdct_end,
      start_ymdt: item.start_ymdt,
      Block: item.process,
      Program: item.process.includes("(")
        ? item.process.split("(")[1].replace(")", "")
        : item.process,
      wait: item.wait,
      pause: false,
    };

    return plainToInstance(MachineDto, plainData);
  }

  dataTransformForMachineStat(item) {
    const matchData = this.machines.find((data) => +data.id === +item.Id);

    const plainMachineData = {
      Alarm: item.Alarm,
      active: matchData.active,
      wait: matchData.wait,
      Block: item.Block,
      CycleTime: item.CycleTime,
      Estop: item.Estop,
      Execution: item.Execution,
      ExecutionTime: item.ExecutionTime,
      Id: item.Id,
      Mcode: item.Mcode,
      Message: item.Message,
      MessageTime: item.MessageEvent,
      Mid: item.Mid,
      Mode: item.Mode,
      ModeTime: item.ModeTime,
      PartCount: item.PartCount,
      PlanCount: item.PlanCount,
      Power: item.Power,
      Program: item.Program.includes("(")
        ? item.Program.split("(")[1].replace(")", "")
        : item.Program,
      machine_no: matchData.machineNo,
      prdct_end: matchData.prdctEnd,
      start_ymdt: matchData.startYmdt,
      pause: matchData.pause,
      doneTime: matchData.doneTime,
    };
    const plainRealTimeData = {
      Id: item.Id,
      machineNo: matchData.machineNo,
      S1load: item.Data.S1load,
      S1speed: item.Data.S1speed,
      Xact: item.Data.Xact,
      Xload: item.Data.Xload,
      Zact: item.Data.Zact,
      Zload: item.Data.Zload,
      f_command: item.Data.f_command,
      line: item.Data.line,
      path_feedrate: item.Data.path_feedrate,
      path_position: item.Data.path_position,
      program_comment: item.Data.program_comment,
      tool_id: item.Data.tool_id,
      Bact: item.Data.Bact,
      Bload: item.Data.Bload,
      Cact: item.Data.Cact,
      Cload: item.Data.Cload,
      S2load: item.Data.S2load,
      S2speed: item.Data.S2speed,
      S320load: item.Data.S320load,
      S320speed: item.Data.S320speed,
      Yact: item.Data.Yact,
      Yload: item.Data.Yload,
      path_position2: item.Data.path_position2,
      program_comment2: item.Data.program_comment2,
      tool_id2: item.Data.tool_id2,
    };

    return {
      machine: plainToInstance(MachineDto, plainMachineData),
      rtd: plainToInstance(RealTimeDataDto, plainRealTimeData),
    };
  }

  dataTransformForNoti(dataArray: string[]): {
    machine: MachineDto;
    rtd: RealTimeDataDto;
  } {
    const matchData = this.machines.find((data) => +data.id === +dataArray[4]);
    const matchRTData = this.realTimeData.find(
      (data) => +data.id === +dataArray[4]
    );

    for (let i = 6; i < dataArray.length; i = i + 2) {
      const targetKey = dataArray[i].toLowerCase().replace("_", "");
      const RtKey = Object.keys(matchRTData).find(
        (key) => key.toLowerCase().replace("_", "") === targetKey
      );
      if (RtKey) {
        matchRTData[RtKey] = dataArray[i + 1];
      } else {
        const MachineKey = Object.keys(matchData).find(
          (key) => key.toLowerCase().replace("_", "") === targetKey
        );
        if (MachineKey) {
          matchData[MachineKey] = dataArray[i + 1];
        }
      }
    }

    return { machine: matchData, rtd: matchRTData };
  }
  dataTransformForPartCount(dataArray: string[]) {
    const matchData = this.machines.find((data) => +data.id === +dataArray[13]);

    matchData.active = +dataArray[11];
    matchData.partCount = +dataArray[5];
    matchData.planCount = +dataArray[6];
    matchData.wait = +dataArray[10];

    return matchData;
  }
}
