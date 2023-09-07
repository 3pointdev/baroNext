import Alert from "components/alert/alert";
import PageContainer from "components/container/pageContainer";
import ScheduleEditer from "components/editor/scheduleEditor";
import CardLayout from "components/layout/cardLayout";
import { ScheduleType } from "config/constants";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import ScheduleViewModel from "src/viewModels/schedule/schedule.viewModel";

interface IProps {
  scheduleViewModel: ScheduleViewModel;
}

function ScheduleView({ scheduleViewModel }: IProps) {
  useEffect(() => {
    scheduleViewModel.getList();
  }, []);

  return (
    <PageContainer>
      <CardLayout>
        <ScheduleEditer
          title="조업시간 설정"
          isCanAdd
          type={ScheduleType.STD}
          data={scheduleViewModel.list.filter(
            (model) => model.type === ScheduleType.STD
          )}
          onChangeColumnTitle={scheduleViewModel.handleChangeColumnTitle}
          onChangeStartTime={scheduleViewModel.handleChangeStartTime}
          onChangeEndTime={scheduleViewModel.handleChangeEndTime}
          onClickAdd={scheduleViewModel.handleClickAdd}
          onClickSave={scheduleViewModel.handleClickSave}
          onClickEdit={scheduleViewModel.handleClickEdit}
          onClickDelete={scheduleViewModel.handleClickDelete}
        />
      </CardLayout>
      <CardLayout>
        <ScheduleEditer
          title="식사시간 설정"
          isCanAdd
          type={ScheduleType.EAT}
          data={scheduleViewModel.list.filter(
            (model) => model.type === ScheduleType.EAT
          )}
          onChangeColumnTitle={scheduleViewModel.handleChangeColumnTitle}
          onChangeStartTime={scheduleViewModel.handleChangeStartTime}
          onChangeEndTime={scheduleViewModel.handleChangeEndTime}
          onClickAdd={scheduleViewModel.handleClickAdd}
          onClickSave={scheduleViewModel.handleClickSave}
          onClickEdit={scheduleViewModel.handleClickEdit}
          onClickDelete={scheduleViewModel.handleClickDelete}
        />
      </CardLayout>
      <CardLayout>
        <ScheduleEditer
          title="휴게시간 설정"
          isCanAdd
          type={ScheduleType.BRK}
          data={scheduleViewModel.list.filter(
            (model) => model.type === ScheduleType.BRK
          )}
          onChangeColumnTitle={scheduleViewModel.handleChangeColumnTitle}
          onChangeStartTime={scheduleViewModel.handleChangeStartTime}
          onChangeEndTime={scheduleViewModel.handleChangeEndTime}
          onClickAdd={scheduleViewModel.handleClickAdd}
          onClickSave={scheduleViewModel.handleClickSave}
          onClickEdit={scheduleViewModel.handleClickEdit}
          onClickDelete={scheduleViewModel.handleClickDelete}
        />
      </CardLayout>
      <Alert
        title={scheduleViewModel.isOpenAlert.title}
        isActive={scheduleViewModel.isOpenAlert.isActive}
        isPositive={scheduleViewModel.isOpenAlert.isPositive}
      />
    </PageContainer>
  );
}

export default inject("scheduleViewModel")(observer(ScheduleView));
