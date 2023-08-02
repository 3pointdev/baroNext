import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
import LotDto from "../../dto/report/lot.dto";
import RecordModel from "../../models/record/record.model";
import moment from "moment";
import { ServerUrlType } from "../../../config/constants";
import { AxiosError, AxiosResponse } from "axios";
import MachineDto from "../../dto/machine/machine.dto";
import { plainToInstance } from "class-transformer";
import RecordDto from "../../dto/record/record.dto";
import { ITableHeader } from "../../../components/table/defaultTable";
import { Ref } from "react";

export default class RecordViewModel extends DefaultViewModel {
  public recordModel: RecordModel = new RecordModel();
  public tableHeader: ITableHeader[] = [];
  public list: RecordDto[] = [];

  constructor(props: IDefaultProps) {
    super(props);
    this.tableHeader = [
      { title: "기계명", column: "mid", align: "center" },
      { title: "품명", column: "program", align: "left" },
      { title: "생산/목표", column: "count", align: "center" },
    ];
    makeObservable(this, {
      recordModel: observable,
      list: observable,

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
        [type]: moment(date).format("YYYY-MM-DD"),
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
        const data = result.data.map((item) =>
          plainToInstance(RecordDto, {
            mid: item.mid,
            program: item.program,
            count: `${item.count} / ${item.plan_count}`,
          })
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
}
