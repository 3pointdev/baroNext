import Alert from "components/alert/alert";
import DefaultButton from "components/button/defaultButton";
import PageContainer from "components/container/pageContainer";
import BigInput from "components/input/bigInput";
import CardLayout from "components/layout/cardLayout";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import WorkerViewModel from "src/viewModels/worker/worker.viewModel";
import styled from "styled-components";

interface IProps {
  workerViewModel: WorkerViewModel;
}

function NotificationView({ workerViewModel }: IProps) {
  useEffect(() => {
    workerViewModel.initializeSocket(
      workerViewModel.onMessage,
      workerViewModel.onOpen
    );
    workerViewModel.getMonitorList();

    return () => {
      if (workerViewModel.socket?.socket?.readyState === WebSocket.OPEN) {
        workerViewModel.socket.disconnect();
      }
    };
  }, []);

  return (
    <PageContainer>
      <CardLayout style={{ height: "100%" }}>
        <LayoutTitle>공지사항 관리</LayoutTitle>
        <BigInput
          type="text"
          placeholder="변경 할 공지사항을 입력해 주세요."
          onChange={workerViewModel.handleChangeNotice}
          name="notification"
          validState={workerViewModel.noticeValid}
          validText={"한글 최대 50자까지 입력 가능합니다."}
          value={workerViewModel.notice}
        />
        <DefaultButton
          title="저장"
          onClick={workerViewModel.handleClickNotice}
        />
      </CardLayout>
      <Alert
        title={workerViewModel.alertState.title}
        isActive={workerViewModel.alertState.isActive}
        isPositive={workerViewModel.alertState.isPositive}
      />
    </PageContainer>
  );
}

export default inject("workerViewModel")(observer(NotificationView));

const LayoutTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;
