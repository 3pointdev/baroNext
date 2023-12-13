import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "components/alert/alert";
import PageContainer from "components/container/pageContainer";
import CardLayout from "components/layout/cardLayout";
import { StyleColor } from "config/color";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import WorkerDto from "src/dto/worker/worker.dto";
import WorkerViewModel from "src/viewModels/worker/worker.viewModel";
import styled from "styled-components";

interface IProps {
  workerViewModel: WorkerViewModel;
}

function WorkerManagerView({ workerViewModel }: IProps) {
  useEffect(() => {
    workerViewModel.getList();
  }, []);

  return (
    <PageContainer>
      <CardLayout style={{ height: "100%" }}>
        <LayoutTitle>작업자 관리</LayoutTitle>
        <MachineWrap>
          {workerViewModel.list.map((machine: WorkerDto, key: number) => {
            return (
              <MachineItem key={`machine_edit_${key}`}>
                <MachineNumber>{machine.machineNo}</MachineNumber>
                <div>
                  <p>{machine.name}</p>
                  <p>{machine.worker ? machine.worker : "미지정"}</p>
                </div>
                <IconBox
                  onClick={workerViewModel.handleClickEdit}
                  data-id={machine.id}
                >
                  <EditIcon icon={faPenToSquare} />
                </IconBox>
              </MachineItem>
            );
          })}
        </MachineWrap>
      </CardLayout>
      <Alert
        title={workerViewModel.alertState.title}
        isActive={workerViewModel.alertState.isActive}
        isPositive={workerViewModel.alertState.isPositive}
      />
    </PageContainer>
  );
}

export default inject("workerViewModel")(observer(WorkerManagerView));

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
