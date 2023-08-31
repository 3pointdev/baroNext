import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
import RecordModel from "../../models/record/record.model";
import dayjs from "dayjs";
import { ServerUrlType, TableFormatType } from "../../../config/constants";
import { AxiosError, AxiosResponse } from "axios";
import RecordDto from "../../dto/record/record.dto";
import { ITableHeader } from "../../../components/table/defaultTable";
import { ChangeEvent, MouseEvent } from "react";
import { Options } from "components/input/customSelector";

export default class RecordViewModel extends DefaultViewModel {
  public tableHeader: ITableHeader[] = [];
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
        rowSpan: false,
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
        `report/${this.recordModel.startDay}/${this.recordModel.endDay}`
      )
      .then((result: AxiosResponse) => {
        // const data = result.data.map((item) =>
        //   plainToInstance(RecordDto, {
        //     mid: item.mid,
        //     program: item.program?.includes("(")
        //       ? item.program.split("(")[1].replace(")", "")
        //       : item.program,
        //     count: `${item.count} / ${item.plan_count}`,
        //   })
        // );

        runInAction(() => {
          // this.list = data;

          // mock data
          const mockData = [
            ...Array.from({ length: 10 }, (mock, key) => {
              return {
                date: `07/0${key + 1 > 9 ? 8 : key + 1}`,
                mid: `Puma94`,
                program: `O1234(program_name)_25`,
                planCount: 99,
                partCount: 99,
                achieve: "100%",
                uptime: "62%",
                tolerance: "2%",
              };
            }),
            ...Array.from({ length: 10 }, (mock, key) => {
              return {
                date: `08/0${key + 1 > 9 ? 8 : key + 1}`,
                mid: `Puma9${key}`,
                program: `O1234(program_name)_${30 - key}`,
                planCount: 99,
                partCount: 99,
                achieve: "100%",
                uptime: "62%",
                tolerance: "2%",
              };
            }),
          ];

          this.list = this.setAverage(mockData);
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
    this.setSort(+value);
    this.setFilterOptions(+value);

    runInAction(() => {
      this.recordModel = {
        ...this.recordModel,
        format: +value,
        filter: "all",
      };
      this.list = this.setAverage(this.list);
    });
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
    const fixHeader: ITableHeader[] = [
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
        rowSpan: false,
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

  setAverage = (data: RecordDto[]) => {
    let newData = data;
    if (this.recordModel.format === TableFormatType.ALL) {
      for (let i = newData.length - 1; i >= 0; i--) {
        if (newData[i].mid !== newData[i + 1]?.mid) {
          newData.splice(i + 1, 0, {
            achieve: "100%",
            date: newData[i].date,
            mid: newData[i].mid,
            partCount: -1,
            planCount: -1,
            tolerance: "2%",
            uptime: "62%",
            program: "전체",
          });
        }
      }
    } else {
      newData = newData.filter((data) => data.program !== "전체");
    }
    return newData;
  };

  setSort = (value: number) => {
    switch (value) {
      case TableFormatType.ALL:
        runInAction(() => {
          this.list = this.list.sort(
            (a, b) => +a.date.replace("/", "") - +b.date.replace("/", "")
          );
        });
        break;
      case TableFormatType.MACHINE:
        runInAction(() => {
          this.list = this.list
            .slice()
            .sort((a, b) => a.mid.localeCompare(b.mid));
        });
        break;
      case TableFormatType.PROGRAM:
        runInAction(() => {
          this.list = this.list
            .slice()
            .sort((a, b) => a.program.localeCompare(b.program));
        });
        break;
    }
  };
}
