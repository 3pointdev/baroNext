import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { Options } from "components/input/customSelector";
import dayjs from "dayjs";
import { action, makeObservable, observable, runInAction } from "mobx";
import { ChangeEvent, MouseEvent } from "react";
import TableModel from "src/models/table/table.model";
import { ServerUrlType, TableFormatType } from "../../../config/constants";
import RecordDto from "../../dto/record/record.dto";
import RecordModel from "../../models/record/record.model";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";

export default class RecordViewModel extends DefaultViewModel {
  public tableHeader: TableModel[] = [];
  public recordModel: RecordModel = new RecordModel();
  public list: RecordDto[] = [];
  public dataFilter: Options[] = [];

  constructor(props: IDefaultProps) {
    super(props);
    this.tableHeader = [
      {
        title: "날짜",
        column: "date",
        align: "center",
        size: "4",
        rowSpan: true,
      },
      {
        title: "기계명",
        column: "mid",
        align: "left",
        size: "16",
        rowSpan: true,
      },
      {
        title: "가공명",
        column: "program",
        align: "left",
        size: "40",
        rowSpan: false,
      },
      {
        title: "목표량",
        column: "planCount",
        align: "center",
        size: "8",
        rowSpan: false,
      },
      {
        title: "생산량",
        column: "partCount",
        align: "center",
        size: "8",
        rowSpan: false,
      },
      {
        title: "달성률(%)",
        column: "achieve",
        align: "center",
        size: "8",
        rowSpan: false,
      },
      {
        title: "설비가동률(%)",
        column: "uptime",
        align: "center",
        size: "8",
        rowSpan: true,
      },
      {
        title: "LOT완료\n예측시간 오차율",
        column: "tolerance",
        align: "center",
        size: "8",
        rowSpan: false,
      },
    ];
    makeObservable(this, {
      recordModel: observable,
      list: observable,
      tableHeader: observable,
      dataFilter: observable,

      handleChangeDay: action,
    });
  }

  dataReset = () => {
    runInAction(() => {
      this.recordModel = new RecordModel();
    });
  };

  handleChangeDay = (date: string, type: string) => {
    runInAction(() => {
      this.recordModel = {
        ...this.recordModel,
        [type]: dayjs(date).format("YYYY-MM-DD"),
      };

      this.getList();
    });
  };

  getList = async () => {
    await this.api
      .get(
        ServerUrlType.BARO,
        `report/selectRecord/${this.recordModel.startDay}/${this.recordModel.endDay}`
      )
      .then((result: AxiosResponse) => {
        if (result.data.length <= 0) {
          runInAction(() => {
            this.recordModel = {
              ...this.recordModel,
              startDay: dayjs(this.recordModel.startDay)
                .subtract(1, "day")
                .format("YYYY-MM-DD"),
              endDay: dayjs(this.recordModel.endDay)
                .subtract(1, "day")
                .format("YYYY-MM-DD"),
            };
          });
          this.getList();
        }

        const data = result.data.map((item) =>
          plainToInstance(RecordDto, {
            ...item,
            started_at: dayjs(item.started_at).format("MM/DD"),
            program: item.program?.includes("(")
              ? item.program.split("(")[1].replace(")", "")
              : item.program === ""
              ? "Unknown Lot"
              : item.program,
            rate: item.rate ? `${item.rate}%` : `-`,
            oper_rate: `${item.oper_rate}% isNotViewAble`,
            prdct_rate: item.prdct_rate ? `${item.prdct_rate}%` : `-`,
          })
        );
        runInAction(() => {
          this.list = data;
          this.setSort(TableFormatType.ALL);
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  handleChangeTableFormat = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setHeader(+value);

    runInAction(() => {
      this.recordModel = {
        ...this.recordModel,
        format: +value,
        filter: "all",
      };
    });
    this.setSort(+value);
    this.setFilterOptions(+value);
  };

  setFilterOptions = (value: number) => {
    switch (value) {
      case TableFormatType.ALL:
        runInAction(() => {
          this.dataFilter = [];
        });
        break;
      case TableFormatType.MACHINE:
        const uniqueDataForMachine = this.list.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.mid === item.mid)
        );
        runInAction(() => {
          this.dataFilter = uniqueDataForMachine.map((data) => {
            return { title: data.mid, id: data.mid };
          });
        });
        break;
      case TableFormatType.PROGRAM:
        const uniqueDataForProgram = this.list.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.program === item.program)
        );
        runInAction(() => {
          this.dataFilter = uniqueDataForProgram.map((data) => {
            return { title: data.program, id: data.program };
          });
        });
        break;
    }
  };

  setHeader = (value: number) => {
    const fixHeader: TableModel[] = [
      {
        title: "목표량",
        column: "planCount",
        align: "center",
        size: "8",
        rowSpan: false,
      },
      {
        title: "생산량",
        column: "partCount",
        align: "center",
        size: "8",
        rowSpan: false,
      },
      {
        title: "달성률(%)",
        column: "achieve",
        align: "center",
        size: "8",
        rowSpan: false,
      },
      {
        title: "설비가동률(%)",
        column: "uptime",
        align: "center",
        size: "8",
        rowSpan: true,
      },
      {
        title: "LOT완료\n예측시간 오차율",
        column: "tolerance",
        align: "center",
        size: "8",
        rowSpan: false,
      },
    ];
    switch (value) {
      case TableFormatType.ALL:
        runInAction(() => {
          this.tableHeader = [
            {
              title: "날짜",
              column: "date",
              align: "center",
              size: "4",
              rowSpan: true,
            },
            {
              title: "기계명",
              column: "mid",
              align: "left",
              size: "16",
              rowSpan: true,
            },
            {
              title: "가공명",
              column: "program",
              align: "left",
              size: "40",
              rowSpan: false,
            },
            ...fixHeader,
          ];
        });
        break;
      case TableFormatType.MACHINE:
        runInAction(() => {
          this.tableHeader = [
            {
              title: "기계명",
              column: "mid",
              align: "left",
              size: "20",
              rowSpan: true,
            },
            {
              title: "날짜",
              column: "date",
              align: "center",
              size: "8",
              rowSpan: true,
            },
            {
              title: "가공명",
              column: "program",
              align: "left",
              size: "32",
              rowSpan: false,
            },
            ...fixHeader,
          ];
        });
        break;
      case TableFormatType.PROGRAM:
        runInAction(() => {
          this.tableHeader = [
            {
              title: "가공명",
              column: "program",
              align: "left",
              size: "30",
              rowSpan: true,
            },
            {
              title: "날짜",
              column: "date",
              align: "center",
              size: "8",
              rowSpan: true,
            },
            {
              title: "기계명",
              column: "mid",
              align: "left",
              size: "22",
              rowSpan: false,
            },
            ...fixHeader,
          ];
        });
        break;
    }
  };

  handleClickFilter = (e: MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget.dataset;
    runInAction(() => {
      this.recordModel = {
        ...this.recordModel,
        filter: id,
      };
    });
  };

  /**
   * 전체 평균 row 추가하는 함수
   * @param data 전체 데이터
   */
  setAverage = (data: RecordDto[]) => {
    let newData = data;

    // row 추가함수 (포멧탭 전체인경우만)
    if (this.recordModel.format === TableFormatType.ALL) {
      for (let i = newData.length - 1; i >= 0; i--) {
        if (newData[i].mid !== newData[i + 1]?.mid) {
          newData.splice(
            i + 1,
            0,
            plainToInstance(RecordDto, {
              started_at: newData[i].date,
              mkey: newData[i].mkey,
              mid: newData[i].mid,
              program: "전체",
              plan: -1,
              count: -1,
              rate: 0,
              oper_rate: 0,
              prdct_rate: "isNotViewAble",
              lot: newData[i].lot,
            })
          );
        }
      }

      // 평균값 계산 및 해당 평균을 나타내는 row에 적용하는 함수
      let uptimeRecord = [];
      let achieveRecord = [];
      for (let j = 0; j < newData.length; j++) {
        //전체row인 경우 recording된 값 평균계산 후 적용 recording 초기화
        if (newData[j].program === "전체") {
          const uptimeAverage =
            uptimeRecord.reduce((acc, cur, idx) => {
              return (acc += cur);
            }, 0) / uptimeRecord.length;
          const achieveAverage =
            achieveRecord.reduce((acc, cur, idx) => {
              return (acc += cur);
            }, 0) / achieveRecord.length;
          newData[j].uptime = uptimeAverage
            ? `${(+uptimeAverage.toFixed(2) * 10000) / 10000}%`
            : "-";
          newData[j].achieve = achieveAverage
            ? `${(+achieveAverage.toFixed(2) * 10000) / 10000}%`
            : "-";

          uptimeRecord = [];
          achieveRecord = [];
        } else {
          //전체row가 아닌 경우 uptime과 achieve 값을 recording
          newData[j].uptime !== "null% isNotViewAble" &&
            uptimeRecord.push(
              +newData[j].uptime.replace("% isNotViewAble", "")
            );
          newData[j].achieve !== "-" &&
            achieveRecord.push(+newData[j].achieve.replace("%", ""));
        }
      }
    } else {
      //포멧탭 전체가 아닌경우 전체row 삭제
      newData = newData.filter((data) => data.program !== "전체");
    }
    return newData;
  };

  setSort = (value: number) => {
    switch (value) {
      case TableFormatType.ALL:
        // this.sortProgram();
        this.sortMachine();
        this.sortDate();
        runInAction(() => {
          this.list = this.setAverage(this.list);
        });
        break;
      case TableFormatType.MACHINE:
        runInAction(() => {
          this.list = this.setAverage(this.list);
        });
        // this.sortProgram();
        this.sortDate();
        this.sortMachine();
        break;
      case TableFormatType.PROGRAM:
        runInAction(() => {
          this.list = this.setAverage(this.list);
        });
        this.sortMachine();
        this.sortDate();
        this.sortProgram();
        break;
    }
  };

  sortProgram() {
    runInAction(() => {
      this.list = this.list.sort((a, b) => {
        if (
          +a.program.match(/(\d+)/g)?.[0] - +b.program.match(/(\d+)/g)?.[0] !==
          0
        ) {
          return (
            +a.program.match(/(\d+)/g)?.[0] - +b.program.match(/(\d+)/g)?.[0]
          );
        } else {
          return (
            +a.program.match(/(\d+)/g)?.[1] - +b.program.match(/(\d+)/g)?.[1]
          );
        }
      });
    });
  }

  sortMachine() {
    runInAction(() => {
      this.list = this.list.slice().sort((a, b) => a.mid.localeCompare(b.mid));
    });
  }

  sortDate() {
    runInAction(() => {
      this.list = this.list.sort(
        (a, b) => +a.date.replace("/", "") - +b.date.replace("/", "")
      );
    });
  }
}
