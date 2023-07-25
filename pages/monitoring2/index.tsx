import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import moment from "moment";
import MachineViewModel from "../../src/viewModels/machine/machine.viewModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

interface IProps {
  machineViewModel: MachineViewModel;
}

function Monitoring2View(props: IProps) {
  const machineViewModel = props.machineViewModel;
  const [time, setTime] = useState<string>("");
  const router = useRouter();

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
        <Header.Menu icon={faBars} />
        <Header.Time>
          <span>{time.slice(0, 10)}</span>
          <span className="time">{time.slice(11)}</span>
        </Header.Time>
      </Header.Wrap>
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
    font-size: 56px;
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

    & .time {
      width: 27vw;
      letter-spacing: 6px;
      font-size: 6vw;
      font-weight: 500;
    }
  `,
};
