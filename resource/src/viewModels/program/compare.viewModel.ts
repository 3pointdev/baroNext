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

        console.log(data, type);

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

  string =
    "%\nO2003(WGR180D45H27-02-2) \n(2023.09.01) \n \nN1G54G40 \nG99\n(OD_ROUGH&FINISH)\nT0202(CNMG_R0.8) \nG50S800M08 \nG96S200M03P11\nG00G18X93.Z30. \nZ3.\nZ.75 \nG01X41.F.16\nG00X93.W1. \nZ0.\nG01X41.F.2 \nG00X90.Z3. \nG71U1.475R0.3\nG71P200Q2000U.3W0F.2 \nN200G00X57.85\nG1Z.5\nX61.85Z-1.5\nZ-8.6\nX68.7\nX70.3Z-9.4 \nZ-18.73\nX75.8\nX76.8Z-19.23 \nZ-23.83\nX84.15 \nX86.15Z-24.83\nZ-29.\nN2000X90.\nG42\nG70P200Q2000F.25 \nG40\nG00Z30.M09 \nG28U0.W0.\nM01\n \nN2G54G40 \n(OD_GROOVE)\nT1616M08(200RK_LONG) \nG97S600M03P11\nM110 \nG99\nG00X77.8Z30. \nZ3.\nZ-18.78\nG01X76.8F.2\nG01X69.3F.06 \nG0X71.3\nG0W0.5 \nG1X70.3F.02\nG1X69.3F.06\nG0X71.3\nZ-8.65 \nG1X70.3F.2 \nG1X61.85F.06 \nG1X59.575F.06\nG1U0.5 \nG1X57.3F.06\nG0X62.85 \nG0W1.\nG1X61.85F.2\nG1X59.575F.06\nG1U0.5 \nG1X57.3F.06\nG0X71.3\nZ30.M9 \nG28U0W0\nM1 \n \nN3G54G40 \nT303M08(PF)\nG97S800M3P11 \nM110 \nG99\nG00X62.85Z30.\nZ3.\nG92X61.85Z-8.6F1.3368\nX61.65 \nX61.45 \nX61.25 \nX61.05 \nX60.85 \nX60.65 \nX60.45 \nX60.25 \nX60.19 \nX60.14 \nX60.14 \nX60.14 \nG00Z30.M09 \nG28U0.W0.\nM01\n \nN4G54G40 \n(ID_FINISH)\nT606M08(25_HOIDER_CNMG_R0.8) \nG97S800M03P11\nM110 \nG99\nG00X47.5Z30. \nZ3.\nG41\nG00X50.7 \nG01Z0.F.15 \nG02X44.7Z-3.R3.\nG01W-1.\nG00U-3.2 \nG40\nG00Z30.M09 \nG28U0.W0.\nM5P11\nM01\n \nN5G54G40 \nT1111M08(C/DR) \nG97S800M3P12 \nM110 \nM34\nM35\nG98\nG00X72.3Z30. \nZ3.\nG0C0.\nG0Z-13.6 \nG01X67.3F100 \nG00X72.3 \nG00C180. \nG01X67.3F100 \nG00X72.3 \nZ30.M9 \nM34\nM90\nG99\nG28U0.W0.\nM01\n \nN6G54G40 \nT1010M08(2.5DR)\nG97S1000M3P12\nM110 \nM34\nM35\nG98\nG00X72.3Z30. \nZ3.\nG0C0.\nG0Z-13.6 \nG87X42.R-1.Q2022F38M89 \nC180.Q2022 \nG0Z30.M9 \nM34\nM90G80 \nG28U0.W0.\nM01\nM30\n%";

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
      });
    } else {
      runInAction(() => {
        this.target = {
          ...this.target,
          compareDate: formattingDate,
        };
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
