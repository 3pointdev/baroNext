import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import RealTimeMachineItem from "../components/machine/RealTimeMachineItem";
import MachineDto from "../src/dto/machine/machine.dto";
import PageContainer from "../components/container/pageContainer";
import DoneMachine from "../components/machine/DoneSoonList";
import MachineViewModel from "../src/viewModels/machine/machine.viewModel";
import CardLayout from "../components/layout/cardLayout";
import Timer from "../components/timer/timer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IProps {
  machineViewModel: MachineViewModel;
}

function MainView(props: IProps) {
  const machineViewModel = props.machineViewModel;

  useEffect(() => {
    const initialize = async () => {
      await machineViewModel.getMachineList();
      machineViewModel.getProcessedQuantity();
    };

    initialize();

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
    <PageContainer style={{ overflow: "auto" }}>
      <div>
        <Timer size={"small"} />
      </div>
      <Container.RowFlex>
        <CardLayout
          style={{
            width: " 690px",
            height: "410px",
            alignItems: "center",
            justifyContent: "space-between",
            padding: " 24px",
          }}
        >
          <SectionTitle>기계별 가공 수량</SectionTitle>
          {machineViewModel.processChart ? (
            <Bar
              options={machineViewModel.processChart.options}
              data={machineViewModel.processChart.data}
            />
          ) : (
            <div>
              <SectionTitle>가공 기계가 없습니다.</SectionTitle>
            </div>
          )}
        </CardLayout>
        <CardLayout
          style={{
            minWidth: "382px",
            gap: "32px",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <SectionTitle>공정 임박 기계</SectionTitle>
          <DoneMachine list={machineViewModel.machines} />
        </CardLayout>
      </Container.RowFlex>
      <CardLayout
        style={{
          margin: "0 auto",
          width: "1152px",
          alignItems: "center",
          gap: "32px",
          padding: "24px",
        }}
      >
        <SectionTitle>전체 공정 현황</SectionTitle>
        <MachineWrap>
          {machineViewModel.machines.map((machine: MachineDto, key: number) => {
            return (
              <RealTimeMachineItem
                data={machine}
                key={`real_time_machine_${key}`}
              />
            );
          })}
        </MachineWrap>
      </CardLayout>
    </PageContainer>
  );
}

export default inject("machineViewModel")(observer(MainView));

const Container = {
  RowFlex: styled.div`
    margin: 0 auto;
    display: flex;
    gap: 32px;
    & canvas {
      max-width: 690px !important;
      max-height: 428px !important;
      margin: -12px 0 0 -12px;
    }
  `,
};

const SectionTitle = styled.p`
  width: 100%;
  font-weight: 600;
  text-align: center;
`;

const MachineWrap = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;
