import { AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { CompareType, ServerUrlType } from "config/constants";
import dayjs from "dayjs";
import { action, makeObservable, observable, runInAction } from "mobx";
import { MouseEvent } from "react";
import CompareDto from "src/dto/program/compare.dto";
import FunctionDto from "src/dto/program/function.dto";
import CompareModel from "src/models/program/compare.model";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";

export interface ILoding {
  machine: boolean;
  code: boolean;
}

export default class CompareViewModel extends DefaultViewModel {
  public isLoading: ILoding = { machine: true, code: false };
  public target: CompareModel = new CompareModel();
  public data: CompareDto = new CompareDto();

  constructor(props: IDefaultProps) {
    super(props);

    makeObservable(this, {
      isLoading: observable,
      target: observable,
      data: observable,

      handleChangeDate: action,
      handleClickMachine: action,
      handleClickProgram: action,
    });
  }

  getListProgram = async (type: number) => {
    await this.api
      .get(
        ServerUrlType.BARO,
        `/program/getList/${
          type === CompareType.CRITERIA
            ? this.target.criteriaMachine
            : this.target.compareMachine
        }/${
          type === CompareType.CRITERIA
            ? this.target.criteriaDate
            : this.target.compareDate
        }`
      )
      .then((result: AxiosResponse<any>) => {
        const data = result.data.map((item) =>
          plainToInstance(FunctionDto, {
            comment: item.program,
            date: item.date,
            name: item.lot,
            len: 0,
          })
        );

        console.log(data, type);

        if (type === CompareType.CRITERIA) {
          runInAction(() => {
            this.data = { ...this.data, criteriaProgram: data };
            //   this.isLoading = { machine: false, code: false };
          });
        } else {
          runInAction(() => {
            this.data = { ...this.data, compareProgram: data };
            //   this.isLoading = { machine: false, code: false };
          });
        }
      })
      .catch((error) => {
        console.log("error : ", error);
        return false;
      });
  };

  getCode = async (type: number) => {
    await this.api
      .get(
        ServerUrlType.BARO,
        `/program/getNcCode/${
          type === CompareType.CRITERIA
            ? this.target.criteriaProgram
            : this.target.compareProgram
        }`
      )
      .then((result: AxiosResponse<any>) => {
        console.log(result, type);
        if (type === CompareType.CRITERIA) {
          runInAction(() => {
            this.data = {
              ...this.data,
              criteriaCode: result.data[0].program_code,
            };
            //   this.isLoading = { machine: false, code: false };
          });
        } else {
          runInAction(() => {
            this.data = {
              ...this.data,
              compareCode: result.data[0].program_code,
            };
            //   this.isLoading = { machine: false, code: false };
          });
        }
      })
      .catch((error) => {
        console.log("error : ", error);
        return false;
      });
  };

  /**
   * 기준 프로그램 내 날짜 변경함수
   */
  handleChangeDate = (date: string, type: CompareType) => {
    const formattingDate = dayjs(date).format("YYYY-MM-DD");
    if (type === CompareType.CRITERIA) {
      runInAction(() => {
        this.target = {
          ...this.target,
          criteriaDate: formattingDate,
        };
        //   this.isLoading = { machine: false, code: false };
      });
    } else {
      runInAction(() => {
        this.target = {
          ...this.target,
          compareDate: formattingDate,
        };
        //   this.isLoading = { machine: false, code: false };
      });
    }
    this.getListProgram(type);
  };

  /**
   * 기준 프로그램 내 기계명 변경함수
   */
  handleClickMachine = (event: MouseEvent<HTMLDivElement>) => {
    const { id, type } = event.currentTarget.dataset;
    console.log(id, type);
    if (+type === CompareType.CRITERIA) {
      runInAction(() => {
        this.target = {
          ...this.target,
          criteriaMachine: +id,
        };
        //   this.isLoading = { machine: false, code: false };
      });
    } else {
      runInAction(() => {
        this.target = {
          ...this.target,
          compareMachine: +id,
        };
        //   this.isLoading = { machine: false, code: false };
      });
    }
    this.getListProgram(+type);
  };

  /**
   * 기준 프로그램 내 프로그램 변경함수
   */
  handleClickProgram = (event: MouseEvent<HTMLDivElement>) => {
    const { id, type } = event.currentTarget.dataset;
    if (+type === CompareType.CRITERIA) {
      runInAction(() => {
        this.target = {
          ...this.target,
          criteriaProgram: +id,
        };
        //   this.isLoading = { machine: false, code: false };
      });
    } else {
      runInAction(() => {
        this.target = {
          ...this.target,
          compareProgram: +id,
        };
        //   this.isLoading = { machine: false, code: false };
      });
    }
    this.getCode(+type);
  };
}
