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
  public compareDifferentCount: number = 0;
  public compareTarget: [boolean[]] = [[]];

  constructor(props: IDefaultProps) {
    super(props);

    makeObservable(this, {
      isLoading: observable,
      target: observable,
      data: observable,
      compareDifferentCount: observable,
      compareTarget: observable,

      handleChangeDate: action,
      handleClickMachine: action,
      handleClickProgram: action,
      dataReset: action,
    });
  }

  dataReset = () => {
    runInAction(() => {
      this.isLoading = { machine: true, code: false };
      this.target = new CompareModel();
      this.data = new CompareDto();
      this.compareDifferentCount = 0;
      this.compareTarget = [[]];
    });
  };

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

        if (type === CompareType.CRITERIA) {
          runInAction(() => {
            this.data = { ...this.data, criteriaProgram: data };
          });
        } else {
          runInAction(() => {
            this.data = { ...this.data, compareProgram: data };
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
        if (type === CompareType.CRITERIA) {
          runInAction(() => {
            this.data = {
              ...this.data,
              criteriaCode: result.data[0].program_code.split("\n"),
            };
          });
        } else {
          runInAction(() => {
            this.data = {
              ...this.data,
              compareCode: result.data[0].program_code.split("\n"),
            };
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
          criteriaProgram: 0,
        };
        this.data = { ...this.data, criteriaProgram: [], criteriaCode: [] };
        this.compareDifferentCount = 0;
        this.compareTarget = [[]];
      });
    } else {
      runInAction(() => {
        this.target = {
          ...this.target,
          compareDate: formattingDate,
          compareProgram: 0,
        };
        this.data = { ...this.data, compareProgram: [], compareCode: [] };
        this.compareDifferentCount = 0;
        this.compareTarget = [[]];
      });
    }
    this.getListProgram(type);
  };

  /**
   * 기준 프로그램 내 기계명 변경함수
   */
  handleClickMachine = (event: MouseEvent<HTMLDivElement>) => {
    const { id, type } = event.currentTarget.dataset;

    if (+type === CompareType.CRITERIA) {
      runInAction(() => {
        this.target = {
          ...this.target,
          criteriaMachine: +id,
          criteriaProgram: 0,
        };
        this.data = {
          ...this.data,
          criteriaCode: [],
          criteriaProgram: [],
        };
      });
    } else {
      runInAction(() => {
        this.target = {
          ...this.target,
          compareMachine: +id,
          compareProgram: 0,
        };
        this.data = {
          ...this.data,
          compareCode: [],
          compareProgram: [],
        };
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
      });
    } else {
      runInAction(() => {
        this.target = {
          ...this.target,
          compareProgram: +id,
        };
      });
    }
    this.getCode(+type);
  };

  handleClickCompare = () => {
    let result: [boolean[]] = [[]];
    let compareDifferentCount: number = 0;
    const { criteriaCode, compareCode } = this.data;
    const longLength =
      criteriaCode.length > compareCode.length
        ? criteriaCode.length
        : compareCode.length;
    for (let index = 0; index < longLength; index++) {
      result[index] = [];
      const criteriaCodeArray = criteriaCode[index]?.split("");
      const compareCodeArray = compareCode[index]?.split("");

      const innerLength =
        criteriaCodeArray?.length > compareCodeArray?.length
          ? criteriaCodeArray?.length
          : compareCodeArray?.length;
      for (let innerIndex = 0; innerIndex < innerLength; innerIndex++) {
        if (
          criteriaCodeArray?.[innerIndex] === compareCodeArray?.[innerIndex]
        ) {
          result[index].push(false);
        } else {
          result[index].push(true);
          compareDifferentCount++;
        }
      }
    }
    runInAction(() => {
      this.compareTarget = result;
      this.compareDifferentCount = compareDifferentCount;
    });
  };
}
