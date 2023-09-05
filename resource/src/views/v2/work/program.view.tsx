import ActiveBadge from "components/badge/activeBadge";
import BrightButton from "components/button/brightButton";
import DefaultButton from "components/button/defaultButton";
import MachineButton from "components/button/machineButton";
import PageContainer from "components/container/pageContainer";
import DefaultInput from "components/input/defaultInput";
import CardLayout from "components/layout/cardLayout";
import DayTraverseHeader from "components/layout/dayTraverseHeader";
import CodeCompare from "components/program/codeCompare";
import NcCode from "components/program/ncCode";
import { CompareType, StyleColor } from "config/constants";
import { inject, observer } from "mobx-react";
import ListIcon from "public/images/icons/listIcon";
import { MouseEvent, useEffect } from "react";
import ProgramDto from "src/dto/program/program.dto";
import CompareViewModel from "src/viewModels/program/compare.viewModel";
import ProgramViewModel from "src/viewModels/program/program.viewModel";
import styled from "styled-components";

interface IProps {
  programViewModel: ProgramViewModel;
  compareViewModel: CompareViewModel;
}

function ProgramView(props: IProps) {
  const { compareViewModel, programViewModel } = props;

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

  const handleClickActiveComponent = (event: MouseEvent<HTMLButtonElement>) => {
    programViewModel.handleClickActiveComponent(event);
    programViewModel.dataReset();
    compareViewModel.dataReset();
  };

  return (
    <PageContainer>
      <FlexLayout>
        <CardLayout
          style={{
            flexShrink: "0",
            width: "300px",
            overflow: "auto",
            gap: "16px",
          }}
        >
          <ButtonWrap>
            <BrightButton
              title={
                <ButtonTitle>
                  <ListIcon />
                  <p>전체코드리스트</p>
                </ButtonTitle>
              }
              style={{ width: "100%" }}
              isActive={programViewModel.activeComponent === 0}
              onClick={handleClickActiveComponent}
              value={0}
            />
            <div>
              <BrightButton
                title={
                  <ButtonTitle>
                    <ListIcon />
                    <p>사용코드</p>
                  </ButtonTitle>
                }
                isActive={programViewModel.activeComponent === 1}
                style={{ width: "50%" }}
                onClick={handleClickActiveComponent}
                value={1}
              />
              <BrightButton
                title={
                  <ButtonTitle>
                    <ListIcon />
                    <p>코드비교</p>
                  </ButtonTitle>
                }
                isActive={programViewModel.activeComponent === 2}
                style={{ width: "50%" }}
                onClick={handleClickActiveComponent}
                value={2}
              />
            </div>
          </ButtonWrap>

          <MachineWrap style={{ gap: "16px" }}>
            {programViewModel.activeMachineList.map(
              (machine: ProgramDto, key: number) => {
                const isActive =
                  programViewModel.activeComponent !== 0
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
                    onClick={
                      programViewModel.activeComponent === 2
                        ? () => {}
                        : programViewModel.handleClickMachine
                    }
                    value={machine.machineNo}
                    dataId={machine.machineNo}
                    isActive={isActive}
                    highlight={
                      programViewModel.activeComponent === 2
                        ? false
                        : +machine.machineNo ===
                          programViewModel.activeTarget.machine
                    }
                    dynamic
                  />
                );
              }
            )}
          </MachineWrap>
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
        ) : programViewModel.activeComponent === 1 ? (
          <DateCodeWrap>
            <DayTraverseHeader
              value={programViewModel.targetDate}
              onClick={programViewModel.handleClickDay}
              onChange={programViewModel.handleChangeDay}
              style={{ position: "relative", gridColumn: "1/3" }}
            >
              <DefaultInput
                type={"text"}
                value={programViewModel.searchKeyword}
                placeholder={"코드 이름 검색"}
                onChange={programViewModel.handleChangeSearchKeyword}
                onKeyDown={programViewModel.handleKeydownSearch}
                boxstyle={{ height: "40px", width: "320px" }}
                style={{ height: "24px" }}
                useLabel
                labelStyle={{ fontSize: "16px" }}
              />
              <BrightButton
                title={"검색"}
                isActive={false}
                style={{
                  boxShadow: "none",
                  border: `1px solid ${StyleColor.BORDER}`,
                  width: "72px",
                  height: "42px",
                  fontWeight: "500",
                }}
                onClick={programViewModel.handleClickSearch}
              />
            </DayTraverseHeader>
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
        ) : (
          <CardLayout
            style={{
              width: "100%",
              overflow: "auto",
              gap: "24px",
              flexDirection: "row",
            }}
          >
            <CodeCompare
              title="기준 프로그램"
              type={CompareType.CRITERIA}
              machineList={programViewModel.activeMachineList}
            />
            <CodeCompare
              title="비교 프로그램"
              type={CompareType.COMPARE}
              machineList={programViewModel.activeMachineList}
            />
            <CompareResultWrap>
              <DefaultButton
                title={"비교하기"}
                style={{ width: "120px", border: "0" }}
                activeColor={StyleColor.DISABLE}
                onClick={compareViewModel.handleClickCompare}
              />
              {compareViewModel.compareDifferentCount > 0 && (
                <p>{`${compareViewModel.compareDifferentCount}개 발견`}</p>
              )}
            </CompareResultWrap>
          </CardLayout>
        )}
      </FlexLayout>
    </PageContainer>
  );
}

export default inject(
  "programViewModel",
  "compareViewModel"
)(observer(ProgramView));

const FlexLayout = styled.div`
  display: flex;
  gap: 16px;
  height: 100%;
`;
const ButtonWrap = styled.div`
  position: relative;
  left: -16px;
  padding: 0 16px 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  border-bottom: 1px solid ${StyleColor.BORDER};

  & > div {
    display: flex;
    gap: 8px;
  }
`;

const MachineWrap = styled.div`
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

const ButtonTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -4px;
`;

const CompareResultWrap = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  height: 64px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  & > p {
    position: absolute;
    right: 40px;
    color: ${StyleColor.WARNNING};
  }
`;
