import { action, makeObservable, observable, runInAction } from "mobx";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";
import LotDto from "../../dto/report/lot.dto";
import RecordModel from "../../models/record/record.model";
import moment from "moment";
import { ServerUrlType } from "../../../config/constants";
import { AxiosError, AxiosResponse } from "axios";
import MachineDto from "../../dto/machine/machine.dto";
import { plainToInstance } from "class-transformer";

export interface ILotData {
  [key: string]: LotDto[];
}

export default class RecordViewModel extends DefaultViewModel {
  public recordModel: RecordModel = new RecordModel();
  public tableHeader: string[] = ["기계명", "품명", "생산/목표"];
  public tableData: string[][] = [
    ["abc", "aa", "cc/cc"],
    ["abc", "aa", "cc/cc"],
    ["abc", "aa", "cc/cc"],
  ];

  constructor(props: IDefaultProps) {
    super(props);

    makeObservable(this, {
      recordModel: observable,

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
      .then((result: AxiosResponse<MachineDto[]>) => {
        console.log(result.data);
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };
}
