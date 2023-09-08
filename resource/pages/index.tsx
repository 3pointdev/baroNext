import PageContainer from "components/container/pageContainer";
import CardLayout from "components/layout/cardLayout";
import DashBoardMachine from "components/machine/dashBoardMachine";
import DashBoardTimer from "components/timer/dashBoardTimer";
import { inject, observer } from "mobx-react";
import { NextRouter } from "next/router";
import { useEffect } from "react";
import MachineDto from "src/dto/machine/machine.dto";
import MachineViewModel from "src/viewModels/machine/machine.viewModel";
import styled from "styled-components";

interface IProps {
  machineViewModel: MachineViewModel;
  router: NextRouter;
}

function MainView(props: IProps) {
  const machineViewModel = props.machineViewModel;

  useEffect(() => {
    machineViewModel.getMachineList();

    setTimeout(() => {
      location.reload();
    }, 1200000);

    return () => {
      if (machineViewModel.socket?.socket?.readyState === WebSocket.OPEN) {
        machineViewModel.socket.disconnect();
      }
    };
  }, []);

  return (
    <PageContainer style={{ overflow: "hidden" }}>
      <Layout>
        <SectionTitle>
          <p>대시보드</p>
          <DashBoardTimer />
        </SectionTitle>
        <MachineWrap>
          {machineViewModel.machines.map((machine: MachineDto, key: number) => {
            return (
              <DashBoardMachine
                data={machine}
                key={`real_time_machine_${key}`}
              />
            );
          })}
        </MachineWrap>
      </Layout>
    </PageContainer>
  );
}

export default inject("machineViewModel")(observer(MainView));

const Layout = styled(CardLayout)`
  margin: 0 auto;
  max-width: 1152px;
  width: calc(100% - 64px);
  height: calc(100vh - 224px);
  alignitems: center;
  gap: 32px;
  padding: 24px;

  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SectionTitle = styled.div`
  font-weight: 600;
  font-size: 28px;
  line-height: 36px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MachineWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  overflow-y: auto;
`;
