import { AxiosError, AxiosResponse } from "axios";
import { plainToInstance } from "class-transformer";
import { IAlertState } from "components/alert/alert";
import { ScheduleType, ServerUrlType } from "config/constants";
import { action, makeObservable, observable, runInAction } from "mobx";
import { ChangeEvent, MouseEvent } from "react";
import ScheduleModel from "src/models/schedule/schedule.model";
import { Alert } from "src/modules/alert.module";
import DefaultViewModel, { IDefaultProps } from "../default.viewModel";

export default class ScheduleViewModel extends DefaultViewModel {
  public list: ScheduleModel[] = [];
  public isOpenAlert: IAlertState = {
    isPositive: true,
    isActive: false,
    title: "",
  };

  constructor(props: IDefaultProps) {
    super(props);

    makeObservable(this, {
      list: observable,
      isOpenAlert: observable,

      getList: action,
      handleChangeColumnTitle: action,
      handleChangeEndTime: action,
      handleChangeStartTime: action,
      handleClickAdd: action,
      handleClickEdit: action,
      handleClickSave: action,
    });
  }

  getList = async () => {
    await this.api
      .get(ServerUrlType.BARO, "/schedule/getSchedule")
      .then((result: AxiosResponse<any[]>) => {
        const data = result.data.map((schedule) => {
          const placeholder =
            schedule.type === ScheduleType.STD
              ? ["08:00", "17:00"]
              : schedule.type === ScheduleType.EAT
              ? ["12:00", "13:00"]
              : ["10:20", "10:30"];
          return plainToInstance(ScheduleModel, {
            ...schedule,
            startTimePlaceholder: placeholder[0],
            endTimePlaceholder: placeholder[1],
            isAddColumn: false,
            isEditMode: false,
          });
        });
        runInAction(() => {
          this.list = data;
        });
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        return false;
      });
  };

  insert = async (params, targetId: number) => {
    await this.api
      .post(ServerUrlType.BARO, `/schedule/insertSchedule`, params)
      .then((result: AxiosResponse) => {
        let newSchedule = this.list.map((schedule: ScheduleModel) => {
          if (schedule.id === targetId) {
            return { ...schedule, isEditMode: false, isAddColumn: false };
          } else {
            return schedule;
          }
        });

        runInAction(() => {
          this.list = newSchedule;
          this.isOpenAlert = {
            title: "저장이 완료 되었습니다.",
            isPositive: true,
            isActive: true,
          };
        });
        setTimeout(() => {
          runInAction(() => {
            this.isOpenAlert = { title: "", isPositive: true, isActive: false };
          });
        }, 3000);
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        runInAction(() => {
          this.isOpenAlert = {
            title: "실패 하였습니다.\n잠시 후 다시 시도해주세요.",
            isPositive: false,
            isActive: true,
          };
        });
        setTimeout(() => {
          runInAction(() => {
            this.isOpenAlert = { title: "", isPositive: true, isActive: false };
          });
        }, 3000);
        return false;
      });
  };

  update = async (params) => {
    await this.api
      .patch(ServerUrlType.BARO, `/schedule/updateSchedule`, params)
      .then((result: AxiosResponse) => {
        let newSchedule = this.list.map((schedule: ScheduleModel) => {
          if (schedule.id === params.id) {
            return { ...schedule, isEditMode: false };
          } else {
            return schedule;
          }
        });

        runInAction(() => {
          this.list = newSchedule;
          this.isOpenAlert = {
            title: "저장이 완료 되었습니다.",
            isPositive: true,
            isActive: true,
          };
        });
        setTimeout(() => {
          runInAction(() => {
            this.isOpenAlert = { title: "", isPositive: true, isActive: false };
          });
        }, 3000);
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        runInAction(() => {
          this.isOpenAlert = {
            title: "실패 하였습니다.\n잠시 후 다시 시도해주세요.",
            isPositive: false,
            isActive: true,
          };
        });
        setTimeout(() => {
          runInAction(() => {
            this.isOpenAlert = { title: "", isPositive: true, isActive: false };
          });
        }, 3000);
        return false;
      });
  };

  delete = async (targetId: number) => {
    await this.api
      .delete(ServerUrlType.BARO, `/schedule/deleteSchedule/${targetId}`)
      .then((result: AxiosResponse) => {
        runInAction(() => {
          this.list = this.list.filter(
            (schedule: ScheduleModel) => schedule.id !== targetId
          );

          this.isOpenAlert = {
            title: "삭제가 완료 되었습니다.",
            isPositive: true,
            isActive: true,
          };
        });
        setTimeout(() => {
          runInAction(() => {
            this.isOpenAlert = { title: "", isPositive: true, isActive: false };
          });
        }, 3000);
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        runInAction(() => {
          this.isOpenAlert = {
            title: "실패 하였습니다.\n잠시 후 다시 시도해주세요.",
            isPositive: false,
            isActive: true,
          };
        });
        setTimeout(() => {
          runInAction(() => {
            this.isOpenAlert = { title: "", isPositive: true, isActive: false };
          });
        }, 3000);
        return false;
      });
  };

  /**
   * 항목변경함수
   * @name 설정 내 컬럼 아이디 (ScheduleModel.id)
   */
  handleChangeColumnTitle = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newSchedule = this.list.map((schedule: ScheduleModel) => {
      if (schedule.id === +name) {
        return { ...schedule, columnTitle: value };
      } else {
        return schedule;
      }
    });

    runInAction(() => {
      this.list = newSchedule;
    });
  };

  /**
   * 시작시간변경함수
   * @name 설정 내 컬럼 아이디 (ScheduleModel.id)
   */
  handleChangeStartTime = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (
      /[^0-9:]/g.test(value) ||
      (value.length !== 3 && value.charAt(value.length - 1) === ":")
    )
      return;

    let newValue = value;

    // 만약 :를 포함해 5자가 넘는 입력이 있을 경우 마지막 글자 대체
    if (value.length > 5) {
      const sliced = newValue.slice(0, 4);
      newValue = sliced + value.charAt(value.length - 1);
    }

    // : 삭제
    newValue = newValue.replace(":", "");
    if (value.length > 2) {
      // 숫자를 시간 형식으로 변환 (예: "1234" => "12:34")
      newValue = newValue.replace(/(\d{2})(\d{0,2})/, (match, p1, p2) => {
        return p2 ? `${p1}:${p2}` : p1;
      });
    }

    let newSchedule = this.list.map((schedule: ScheduleModel) => {
      if (schedule.id === +name) {
        return { ...schedule, startTime: newValue };
      } else {
        return schedule;
      }
    });

    runInAction(() => {
      this.list = newSchedule;
    });
  };

  /**
   * 종료시간변경함수
   * @name 설정 내 컬럼 아이디 (ScheduleModel.id)
   */
  handleChangeEndTime = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    let newValue = value;

    // 만약 :를 포함해 5자가 넘는 입력이 있을 경우 마지막 글자 대체
    if (value.length > 5) {
      const sliced = newValue.slice(0, 4);
      newValue = sliced + value.charAt(value.length - 1);
    }

    // : 삭제
    newValue = newValue.replace(":", "");
    if (value.length > 2) {
      // 숫자를 시간 형식으로 변환 (예: "1234" => "12:34")
      newValue = newValue.replace(/(\d{2})(\d{0,2})/, (match, p1, p2) => {
        return p2 ? `${p1}:${p2}` : p1;
      });
    }

    let newSchedule = this.list.map((schedule: ScheduleModel) => {
      if (schedule.id === +name) {
        return { ...schedule, endTime: newValue };
      } else {
        return schedule;
      }
    });

    runInAction(() => {
      this.list = newSchedule;
    });
  };

  /**
   * 항목(컬럼)추가함수
   * @value 설정타입 (ScheduleModel.type)
   */
  handleClickAdd = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;

    let highId = this.list[0] ? this.list[0].id : 0;
    for (let index = 1; index < this.list.length; index++) {
      if (this.list[index].id > highId) {
        highId = this.list[index].id;
      }
    }

    const placeholder =
      value === ScheduleType.STD
        ? ["08:00", "17:00"]
        : value === ScheduleType.EAT
        ? ["12:00", "13:00"]
        : ["10:20", "10:30"];

    runInAction(() => {
      this.list = [
        ...this.list,
        plainToInstance(ScheduleModel, {
          id: highId + 1,
          description: "",
          start_time: "",
          end_time: "",
          type: value,
          startTimePlaceholder: placeholder[0],
          endTimePlaceholder: placeholder[1],
          isAddColumn: true,
          isEditMode: true,
        }),
      ];
    });
  };

  /**
   * 설정저장함수
   * @name 설정 내 컬럼 아이디 (ScheduleModel.id)
   */
  handleClickSave = (event: MouseEvent<HTMLElement>) => {
    const { name } = event.currentTarget.dataset;
    const target = this.list.find(
      (schedule: ScheduleModel) => schedule.id === +name
    );

    if (target.columnTitle === "")
      return Alert.alert("항목명을 설정해 주세요.");
    if (target.startTime.length < 5)
      return Alert.alert("시작시간을 설정해 주세요.");
    if (target.endTime.length < 5)
      return Alert.alert("종료시간을 설정해 주세요.");

    Alert.confirm({
      title: `"${target.columnTitle}"을 저장하시겠습니까?`,
      confirm: "저장",
      cancel: "취소",
      callback: () => {
        if (target.isAddColumn) {
          const params = {
            start_time: target.startTime,
            end_time: target.endTime,
            type: target.type,
            description: target.columnTitle,
          };
          this.insert(params, target.id);
        } else {
          const params = {
            start_time: target.startTime,
            end_time: target.endTime,
            description: target.columnTitle,
            id: target.id,
          };
          this.update(params);
        }
      },
    });
  };

  /**
   * 항목(컬럼)삭제함수
   * @name 설정 내 컬럼 아이디 (ScheduleModel.id)
   */
  handleClickDelete = (event: MouseEvent<HTMLElement>) => {
    const { name } = event.currentTarget.dataset;
    const target = this.list.find(
      (schedule: ScheduleModel) => schedule.id === +name
    );

    Alert.confirm({
      title: `"${
        target.columnTitle ? target.columnTitle : "이름없음"
      }"을 삭제하시겠습니까?`,
      confirm: "삭제",
      cancel: "취소",
      callback: () => {
        if (target.isAddColumn) {
          runInAction(() => {
            this.list = this.list.filter(
              (schedule: ScheduleModel) => schedule.id !== +name
            );

            this.isOpenAlert = {
              title: "삭제가 완료 되었습니다.",
              isPositive: true,
              isActive: true,
            };
          });
          setTimeout(() => {
            runInAction(() => {
              this.isOpenAlert = {
                title: "",
                isPositive: true,
                isActive: false,
              };
            });
          });
        } else {
          this.delete(+name);
        }
      },
    });
  };

  /**
   * 항목(컬럼)수정토글함수
   * @name 설정 내 컬럼 아이디 (ScheduleModel.id)
   */
  handleClickEdit = (event: MouseEvent<HTMLElement>) => {
    const { name } = event.currentTarget.dataset;

    let newSchedule = this.list.map((schedule: ScheduleModel) => {
      if (schedule.id === +name) {
        return { ...schedule, isEditMode: true };
      } else {
        return schedule;
      }
    });

    runInAction(() => {
      this.list = newSchedule;
    });
  };
}
