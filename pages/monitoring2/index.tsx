import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import moment from "moment";
import MachineViewModel from "../../src/viewModels/machine/machine.viewModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MachineDto from "../../src/dto/machine/machine.dto";
import Monitoring2Item from "../../components/machine/monitoring2Item";

interface IProps {
  machineViewModel: MachineViewModel;
}

function Monitoring2View(props: IProps) {
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
      machineViewModel.setRenderRange();
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
        <Header.Menu icon={faBars} />
        <Header.Time>
          <span>{moment(time).format("YYYY-MM-DD")}</span>
          <span className="time">{moment(time).format("HH:mm:ss")}</span>
        </Header.Time>
      </Header.Wrap>
      <Article.Wrap>
        {machineViewModel.machines.map((machine: MachineDto, key: number) => {
          const range = machineViewModel.setRenderRange();
          if (range.start <= key && range.end > key)
            return <Monitoring2Item data={machine} key={`machine_${key}`} />;
        })}
      </Article.Wrap>
    </MonitoringContainer>
  );
}

export default inject("machineViewModel")(observer(Monitoring2View));

const MonitoringContainer = styled.div`
  background: #fff;
  height: 100vh;
`;

const Header = {
  Wrap: styled.div`
    display: flex;
    align-items: center;
    padding: 1.8vh 1.4vh;
    position: relative;
    background: #f4f4f5;
    border-bottom: 1px solid #333333;
  `,

  Menu: styled(FontAwesomeIcon)`
    font-size: 6vw;

    @media screen and (min-width: 1080px) {
      font-size: 40px;
    }
  `,

  Time: styled.div`
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-size: 6vw;
    font-weight: 300;
    display: flex;
    gap: 24px;
    justify-content: space-between;
    color: #666666;
    white-space: nowrap;

    @media screen and (min-width: 1080px) {
      font-size: 48px;
      & span {
        width: 260px;
      }
    }

    & .time {
      flex-shrink: 0;
      // width: 27vw;
      letter-spacing: 6px;
      font-weight: 500;
    }
  `,
};

const Article = { Wrap: styled.ul`` };
