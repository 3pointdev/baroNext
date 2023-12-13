import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "components/alert/alert";
import DefaultButton from "components/button/defaultButton";
import PageContainer from "components/container/pageContainer";
import BigInput from "components/input/bigInput";
import CardLayout from "components/layout/cardLayout";
import { StyleColor } from "config/color";
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

const MachineWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media screen and (max-width: 1258px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 950px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MachineItem = styled.div`
  position: relative;
  box-shadow: ${StyleColor.BOXSHADOW};
  background: ${StyleColor.EMPHASIS};
  display: flex;
  align-items: center;
  width: calc(100% - 16px);
  height: 64px;
  padding: 8px;
  gap: 32px;
  font-weight: 600;
  font-size: 16px;
  line-height: 1;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const MachineNumber = styled.p`
  background: ${StyleColor.BRIGHTEMPHASIS};
  width: 72px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconBox = styled.div`
  cursor: pointer;
  transition: all 0.4s;
  border-radius: 50%;
  position: absolute;
  right: 8px;
  top: 8px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${StyleColor.DARK}20;
  }
`;
const EditIcon = styled(FontAwesomeIcon)`
  width: 16px;
  height: 16px;
`;
