import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Linker from "components/linker/linker";
import Monitoring2Item from "components/machine/Monitoring2Item";
import Timer from "components/timer/timer";
import { NUMBERSEENMONITORING2 } from "config/constants";
import pageUrlConfig from "config/pageUrlConfig";
import { inject, observer } from "mobx-react";
import BarofactorySquare from "public/images/logo/barofactory-square";
import { MouseEvent, useEffect, useState } from "react";
import MachineDto from "src/dto/machine/machine.dto";
import MonitorListDto from "src/dto/monitor/monitorList.dto";
import { Alert } from "src/modules/alert.module";
import MachineViewModel from "src/viewModels/machine/machine.viewModel";
import MonitorViewModel from "src/viewModels/monitor/monitor.viewModel";
import styled from "styled-components";
import { SweetAlertResult } from "sweetalert2";

interface IProps {
  machineViewModel: MachineViewModel;
  monitorViewModel: MonitorViewModel;
}

function Monitoring2View(props: IProps) {
  const { machineViewModel, monitorViewModel } = props;
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenMonitorMenu, setIsOpenMonitorMenu] = useState<boolean>(false);

  useEffect(() => {
    const initialize = async () => {
      await machineViewModel.getMounted(monitorViewModel.router.query.monitor);
      await machineViewModel.getMachineList();
      await monitorViewModel.getList();
      machineViewModel.getNotice(monitorViewModel.list);
    };

    initialize();

    // setTimeout(() => {
    //   location.reload();
    // }, 1200000);

    return () => {
      machineViewModel.socketDisconnect();
    };
  }, []);

  const handleClickOpenMonitorList = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsOpenMonitorMenu(!isOpenMonitorMenu);
  };

  const handleClickOtherMonitor = async (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    const { id } = event.currentTarget.dataset;
    monitorViewModel.router.replace(`${pageUrlConfig.monitor2}?monitor=${id}`);
    setIsOpenMenu(false);
    await machineViewModel.getMounted(id);
    await machineViewModel.getMachineList();
    await monitorViewModel.getList();
    machineViewModel.getNotice(monitorViewModel.list);
  };

  const handleClickNoticeEdit = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    Alert.prompt({
      title: "공지사항 변경",
      inputType: "text",
      showCancel: true,
      showDeny: true,
      placeholder: "변경 할 공지사항을 입력해 주세요.",
      defaultValue: machineViewModel.notice,
      confirm: "변경",
      cancel: "취소",
      deny: "전체변경",
      denyColor: "#1976d2",
      confirmColor: "#6ebd33",
      callback: (result: SweetAlertResult) => {
        console.log(result);
        if (result.isConfirmed) {
          machineViewModel.insertNotice(result.value);
          return setIsOpenMenu(false);
        }

        if (result.isDenied) {
          return machineViewModel.insertNoticeAll(result.value);
        }
      },
      validation: (result: string, resolve: (error?: string) => void) => {
        if (result === "") {
          resolve("새로운 공지사항을 입력해 주세요");
        } else {
          resolve();
        }
      },
    });
  };

  if (machineViewModel.machines.length <= NUMBERSEENMONITORING2)
    return (
      <MonitoringContainer>
        <Header.Wrap>
          <Header.Menu icon={faBars} onClick={() => setIsOpenMenu(true)} />
          <Timer />
        </Header.Wrap>
        <Article.Wrap>
          {machineViewModel.machines.map((machine: MachineDto, key: number) => {
            ``;
            return <Monitoring2Item data={machine} key={`machine_${key}`} />;
          })}
        </Article.Wrap>
        <Footer.Wrap>
          <BarofactorySquare color="#000" />
          <Footer.Notice>{machineViewModel.notice}</Footer.Notice>
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
            <Linker onClick={handleClickNoticeEdit} className="slide_menu">
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
                      onClick={handleClickOtherMonitor}
                      data-id={monitor.name}
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
            <div className="slide_menu" onClick={monitorViewModel.insertLogout}>
              <p onClick={monitorViewModel.insertLogout}>로그아웃</p>
            </div>
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
  background: #f7f7f9;
  height: 100vh;
  min-width: 460px;
`;

const Header = {
  Wrap: styled.div`
    min-width: 460px;
    display: flex;
    align-items: center;
    padding: 23px 20px;
    height: 50px;
    position: relative;
    background: #f4f4f5;
    border-bottom: 1px solid #333333;
  `,

  Menu: styled(FontAwesomeIcon)`
    z-index: 2;
    font-size: 40px;
    cursor: pointer;
  `,
};

const Article = {
  Wrap: styled.ul`
    height: calc(100vh - 220px);
    display: flex;
    flex-direction: column;
    padding: 16px;
    gap: 16px;
  `,
};

const Footer = {
  Wrap: styled.div`
    height: 100px;
    width: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;
    gap: 32px;
    background: #f4f4f5;
    border-top: 1px solid #333333;

    & svg {
      height: 100px;
      width: 100px;
    }
  `,
  Notice: styled.p`
    font-size: 3vh;
    font-weight: 500;
    font-family: "pretendard", sans-serif;
    white-space: nowrap;
    color: #666666;
  `,
};

const SlideMenu = {
  Wrap: styled.div`
    z-index: 3;
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
      display: flex;
      align-items: center;
      cursor: pointer;

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
  MonitorChangeLink: styled.div`
    padding-left: 80px;
    height: 120px !important;
    margin-top: 8px;
    line-height: 112px;
    cursor: pointer;

    &:hover {
      background: #19b1d248;
    }
  `,
};
