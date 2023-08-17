import { inject, observer } from "mobx-react";
import { MouseEvent, useEffect, useState } from "react";
import React from "react";
import styled from "styled-components";
import moment from "moment";
import MachineViewModel from "../../src/viewModels/machine/machine.viewModel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import MachineDto from "../../src/dto/machine/machine.dto";
import Monitoring2Item from "../../components/machine/Monitoring2Item";
import { NUMBERSEENMONITORING2 } from "../../config/constants";
import BarofactorySquare from "../../public/images/logo/barofactory-square";
import MonitorViewModel from "../../src/viewModels/monitor/monitor.viewModel";
import Linker from "../../components/linker/linker";
import MonitorListDto from "../../src/dto/monitor/monitorList.dto";

interface IProps {
  machineViewModel: MachineViewModel;
  monitorViewModel: MonitorViewModel;
}

function Monitoring2View(props: IProps) {
  const machineViewModel = props.machineViewModel;
  const monitorViewModel = props.monitorViewModel;
  const [time, setTime] = useState<string>("");
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenMonitorMenu, setIsOpenMonitorMenu] = useState<boolean>(false);

  const getFormattedTime = () => {
    return moment().format("YYYY.MM.DD HH:mm:ss");
  };

  useEffect(() => {
    setTime(getFormattedTime());
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    const initialize = async () => {
      await machineViewModel.getMounted();
      await machineViewModel.getMachineList();
      await monitorViewModel.getList();
      monitorViewModel.getNotice();
    };

    initialize();

    return () => {
      clearInterval(interval);
      if (machineViewModel.socket?.socket?.readyState === WebSocket.OPEN) {
        machineViewModel.socket.disconnect();
      }
    };
  }, []);

  const handleClickOpenMonitorList = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsOpenMonitorMenu(!isOpenMonitorMenu);
  };

  if (machineViewModel.machines.length <= NUMBERSEENMONITORING2)
    return (
      <MonitoringContainer>
        <Header.Wrap>
          <Header.Menu icon={faBars} onClick={() => setIsOpenMenu(true)} />
          <Header.Time>
            <span>{moment(time).format("YYYY-MM-DD")}</span>
            <span className="time">{moment(time).format("HH:mm:ss")}</span>
          </Header.Time>
        </Header.Wrap>
        <Article.Wrap>
          {machineViewModel.machines.map((machine: MachineDto, key: number) => {
            return <Monitoring2Item data={machine} key={`machine_${key}`} />;
          })}
        </Article.Wrap>
        <Footer.Wrap>
          <BarofactorySquare color="#000" />
          <Footer.Notice>{monitorViewModel.notice}</Footer.Notice>
        </Footer.Wrap>
        <SlideMenu.Wrap className={isOpenMenu ? "is_open" : ""}>
          <SlideMenu.Head>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => setIsOpenMenu(false)}
              style={{ cursor: "pointer" }}
            />
          </SlideMenu.Head>
          <SlideMenu.Menu>
            <Linker href="/" className="slide_menu">
              공지사항
            </Linker>
            <Linker onClick={handleClickOpenMonitorList} className="slide_menu">
              <p>모니터 목록</p>
            </Linker>
            <SlideMenu.FolderMenu
              className={isOpenMonitorMenu ? "is_open" : ""}
            >
              {monitorViewModel.list.map(
                (monitor: MonitorListDto, key: number) => {
                  return (
                    <SlideMenu.MonitorChangeLink
                      key={`monitor_list_${key}`}
                      href={`?monitor=${monitor.name}`}
                    >
                      <SlideMenu.MonitorName
                        className={
                          monitor.name === monitorViewModel.router.query.monitor
                            ? "active"
                            : ""
                        }
                      >
                        {monitor.name}
                      </SlideMenu.MonitorName>
                    </SlideMenu.MonitorChangeLink>
                  );
                }
              )}
            </SlideMenu.FolderMenu>
            <Linker href="/" className="slide_menu">
              로그아웃
            </Linker>
          </SlideMenu.Menu>
          <SlideMenu.Foot>BAROFACTORY</SlideMenu.Foot>
        </SlideMenu.Wrap>
      </MonitoringContainer>
    );
}

export default inject(
  "machineViewModel",
  "monitorViewModel"
)(observer(Monitoring2View));

const MonitoringContainer = styled.div`
  background: #fff;
  height: 100vh;
  min-width: 460px;
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
    cursor: pointer;

    @media screen and (min-width: 1080px) {
      font-size: 40px;
    }
  `,

  Time: styled.div`
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-size: 6vw;
    font-weight: 400;
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
      letter-spacing: 6px;
      font-weight: 600;
    }
  `,
};

const Article = {
  Wrap: styled.ul`
    height: calc(100vh - 262px);
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
  `,
};

const Footer = {
  Wrap: styled.div`
    height: 120px;
    width: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 32px;

    & svg {
      height: 120px;
      width: 120px;
    }
  `,
  Notice: styled.p`
    font-size: 3.5982008996vh;
    font-weight: 500;
    font-family: "pretendard", sans-serif;
    white-space: nowrap;
    color: #666666;
  `,
};

const SlideMenu = {
  Wrap: styled.div`
    position: fixed;
    left: -100vw;
    top: 0px;
    background: #fff;
    width: 100vw;
    height: 100vh;
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;

    &.is_open {
      left: 0px;
    }
  `,
  Head: styled.div`
    width: calc(100% - 120px);
    height: 136px;
    border-bottom: 1px solid #333333;
    display: flex;
    padding: 32px 60px;
    align-items: center;
    justify-content: end;

    font-size: 60px;
  `,
  Menu: styled.div`
    width: 100%;
    height: calc(100vh - 336px);
    display: flex;
    flex-direction: column;
    margin-top: 80px;
    font-size: 64px;
    font-weight: 600;

    & .slide_menu {
      height: 120px;
      margin-top: 32px;
      padding-left: 56px;
      &:hover {
        background: #19b1d248;
      }
    }
  `,
  Foot: styled.div`
    width: 100%;
    height: 200px;
    font-size: 48px;
    font-weight: 700;
    color: #00000087;
    text-align: center;
  `,
  FolderMenu: styled.div`
    overflow: hidden;
    height: 0 !important;
    margin: 0 !important;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;

    &.is_open {
      height: 240px !important;
      margin: 24px 0 !important;
    }
  `,
  MonitorName: styled.p`
    font-weight: 400;
    &.active {
      color: #3a79ec;
    }
  `,
  MonitorChangeLink: styled.a`
    padding-left: 80px;
    height: 120px !important;
    margin-top: 8px;
    line-height: 112px;
    &:hover {
      background: #19b1d248;
    }
  `,
};
