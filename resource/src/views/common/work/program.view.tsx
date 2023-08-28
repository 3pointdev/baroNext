import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import React from "react";
import PageContainer from "components/container/pageContainer";
import ProgramViewModel from "src/viewModels/program/program.viewModel";
import ProgramDto from "src/dto/program/program.dto";
import styled from "styled-components";
import CardLayout from "components/layout/cardLayout";
import MachineButton from "components/button/machineButton";
import ActiveBadge from "components/badge/activeBadge";
import DefaultButton from "components/button/defaultButton";
import SingleDatePickHeader from "components/header/singleDatePickHeader";
import NcCode from "components/program/ncCode";

interface IProps {
  programViewModel: ProgramViewModel;
}

function ProgramView(props: IProps) {
  const programViewModel = props.programViewModel;

  useEffect(() => {
    const initialize = async () => {
      await programViewModel.initializeSocket(
        programViewModel.onMessage,
        programViewModel.onOpen
      );
    };

    initialize();

    return () => {
      if (programViewModel.socket?.socket?.readyState === WebSocket.OPEN) {
        programViewModel.socket.disconnect();
      }
    };
  }, []);

  return (
    <PageContainer>
      <FlexLayout>
        <CardLayout
          style={{
            width: "100%",
            maxWidth: "300px",
            overflow: "auto",
            gap: "16px",
            padding: "0px",
          }}
        >
          <LayoutTitle>
            <DefaultButton
              title={"전체코드"}
              dynamic
              isActive={programViewModel.activeComponent === 0}
              style={{ width: "104px", marginLeft: "16px" }}
              onClick={programViewModel.handleClickActiveComponent}
              alwaysHandling
              value={0}
            />
            <DefaultButton
              title={"날짜별코드"}
              dynamic
              isActive={programViewModel.activeComponent === 1}
              style={{ width: "104px", marginRight: "16px" }}
              onClick={programViewModel.handleClickActiveComponent}
              alwaysHandling
              value={1}
            />
          </LayoutTitle>
          <ButtonWrap style={{ gap: "16px" }}>
            {programViewModel.activeMachineList.map(
              (machine: ProgramDto, key: number) => {
                const isActive =
                  programViewModel.activeComponent === 1
                    ? true
                    : machine.status === "on"
                    ? true
                    : false;
                return (
                  <MachineButton
                    key={`active_machine_${key}`}
                    title={
                      <>
                        <p>{machine.machineNo}</p>
                        <span>{machine.name}</span>
                        <ActiveBadge isActive={isActive} />
                      </>
                    }
                    onClick={programViewModel.handleClickMachine}
                    value={machine.machineNo}
                    isActive={isActive}
                    highlight={
                      +machine.machineNo ===
                      programViewModel.activeTarget.machine
                    }
                    dynamic
                  />
                );
              }
            )}
          </ButtonWrap>
        </CardLayout>
        {programViewModel.activeComponent === 0 ? (
          <NcCode
            isAllComponent={true}
            isLoading={programViewModel.isLoading}
            activeTarget={programViewModel.activeTarget}
            handleClickFunction={programViewModel.handleClickFunction}
            activeCallfunc={programViewModel.activeCallfunc}
            handleClickDownloadText={programViewModel.handleClickDownloadText}
            activeCode={programViewModel.activeCode}
          />
        ) : (
          <DateCodeWrap>
            <SingleDatePickHeader
              value={programViewModel.targetDate}
              onClick={programViewModel.handleClickDay}
              onChange={programViewModel.handleChangeDay}
              style={{ position: "relative", gridColumn: "1/3" }}
            />
            <NcCode
              isAllComponent={false}
              isLoading={programViewModel.isLoading}
              activeTarget={programViewModel.activeTarget}
              handleClickFunction={programViewModel.handleClickFunction}
              activeCallfunc={programViewModel.activeCallfunc}
              handleClickDownloadText={programViewModel.handleClickDownloadText}
              activeCode={programViewModel.activeCode}
            />
          </DateCodeWrap>
        )}
      </FlexLayout>
    </PageContainer>
  );
}

export default inject("programViewModel")(observer(ProgramView));

const FlexLayout = styled.div`
  display: flex;
  gap: 16px;
  height: 100%;
`;

const LayoutTitle = styled.div`
  z-index: 11;
  background: #fff;
  font-weight: 500;
  line-height: 24px;
  font-size: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  position: sticky;
  top: 0px;
  height: 24px;
  padding: 16px 16px;
  flex-shrink: 0;
`;

const ButtonWrap = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
`;

const DateCodeWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 70px 1fr;
  gap: 16px;
`;
