import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
import RecordModel from "../../models/record/record.model";
import dayjs from "dayjs";
import { ServerUrlType, TableFilterType } from "../../../config/constants";
import { AxiosError, AxiosResponse } from "axios";
import RecordDto from "../../dto/record/record.dto";
import { ITableHeader } from "../../../components/table/defaultTable";
import { ChangeEvent } from "react";

export default class RecordViewModel extends DefaultViewModel {
  public tableHeader: ITableHeader[] = [];
  public recordModel: RecordModel = new RecordModel();
  public list: RecordDto[] = [];

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
          this.list = Array.from({ length: 20 }, (mock, key) => {
            return {
              date: dayjs(this.recordModel.startDay).format("MM/DD"),
              mid: "Puma999",
              program: "O1234(program_name)",
              planCount: 99,
              partCount: 99,
              achieve: "100%",
              uptime: "62%",
              tolerance: "2%",
            };
          });
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  handleChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setHeader(+value);
    runInAction(() => {
      this.recordModel = {
        ...this.recordModel,
        filter: +value,
      };
    });
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
      case TableFilterType.ALL:
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
      case TableFilterType.MACHINE:
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
      case TableFilterType.PROGRAM:
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
}
