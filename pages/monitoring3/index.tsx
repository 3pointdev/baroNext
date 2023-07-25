import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import moment from "moment";
import BarofactorySquare from "../../public/images/logo/barofactory-square";
import MachineDto from "../../src/dto/machine/machine.dto";
import MachineViewModel from "../../src/viewModels/machine/machine.viewModel";
import MonitoringRow from "../../components/table/monitoringRow";

interface IProps {
  machineViewModel: MachineViewModel;
}

function Monitoring3View(props: IProps) {
  const machineViewModel = props.machineViewModel;
  const [time, setTime] = useState<string>("");

  const getFormattedTime = () => {
    return moment().format("YYYY.MM.DD HH:mm:ss");
  };

  useEffect(() => {
    setTime(getFormattedTime());
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    const initialize = async () => {
      await machineViewModel.getMachineList();
      machineViewModel.initializeAuth();
      machineViewModel.initializeSocket(machineViewModel.onMessage);
    };

    initialize();

    return () => {
      clearInterval(interval);
      if (machineViewModel.socket?.socket?.readyState === WebSocket.OPEN) {
        machineViewModel.socket.disconnect();
      }
    };
  }, []);

  return (
    <MonitoringContainer>
      <Header.Wrap>
        <Header.LeftSide>
          <BarofactorySquare color={"#ffffff"} />
          <Header.Time>{time}</Header.Time>
        </Header.LeftSide>
        <Header.Title>전체공정현황</Header.Title>
        <Header.Enterprise>{machineViewModel.auth.name}</Header.Enterprise>
      </Header.Wrap>
      <Article.Wrap>
        <Article.Head>
          <tr>
            <th>호기</th>
            <th className="align_left">기계명</th>
            <th className="align_left">공정</th>
            <th>진행률</th>
            <th>완료/목표</th>
            <th>공정 시작일</th>
            <th>완료 예정일</th>
            <th>실CT</th>
            <th>구분</th>
          </tr>
        </Article.Head>
        <Article.Body>
          {machineViewModel.machines.map((data: MachineDto, key: number) => {
            return (
              <MonitoringRow data={data} key={`monitoring_table_row_${key}`} />
            );
          })}
        </Article.Body>
      </Article.Wrap>
    </MonitoringContainer>
  );
}

export default inject("machineViewModel")(observer(Monitoring3View));

const MonitoringContainer = styled.div`
  background: #2e3257;
  height: 100vh;
  & * {
    color: #fff;
  }
`;

const Header = {
  Wrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 16px;
  `,
  LeftSide: styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 24px;
  `,
  Time: styled.p`
    height: 34px;
    font-size: 34px;
  `,
  Title: styled.p`
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-size: 30px;
    font-weight: 600;
  `,
  Enterprise: styled.p`
    font-size: 28px;
  `,
};

const Article = {
  Wrap: styled.table`
    width: 100vw;
    border-collapse: collapse;
    & * {
      white-space: nowrap;
    }
  `,
  Head: styled.thead`
    width: 100vw;
    height: 36px;
    text-align: center;
    backgorund: #c4c4c4;
    & th {
      background: #c4c4c4;
      min-width: 42px;
    }

    & .align_left {
      padding-left: 8px;
      text-align: left;
    }

    & * {
      font-size: 17px;
      font-weight: 600;
      color: #000;
    }
  `,
  Body: styled.tbody``,
};
