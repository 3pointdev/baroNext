import { faAngleRight, faFileLines } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyleColor } from "config/constants";
import dayjs from "dayjs";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import styled from "styled-components";
import FunctionDto from "../../src/dto/program/function.dto";
import {
  IActiveTarget,
  ILoding,
} from "../../src/viewModels/program/program.viewModel";
import DefaultButton from "../button/defaultButton";
import DefaultLoading from "../indicator/defaultLoding";
import CardLayout from "../layout/cardLayout";

interface IProps {
  isAllComponent: boolean;
  isLoading: ILoding;
  activeTarget: IActiveTarget;
  handleClickFunction: MouseEventHandler;
  activeCallfunc: FunctionDto[];
  handleClickDownloadText: MouseEventHandler;
  activeCode: string;
}

export default function NcCode({
  isLoading,
  activeTarget,
  handleClickFunction,
  activeCallfunc,
  handleClickDownloadText,
  activeCode,
  isAllComponent,
}: IProps) {
  const [activeFunction, setActiveFunction] = useState<FunctionDto>(null);

  useEffect(() => {
    setActiveFunction(null);
  }, [activeCallfunc]);

  const onClickFunction = (event: MouseEvent<HTMLButtonElement>) => {
    setActiveFunction(
      activeCallfunc.find(
        (callFunc) => +callFunc.name === +event.currentTarget.value
      )
    );
    handleClickFunction(event);
  };

  const getActiveTime = (activeTime: number) => {
    return `${Math.floor(activeTime / 3600)
      .toString()
      .padStart(2, "0")}:${Math.floor(activeTime / 60)
      .toString()
      .padStart(2, "0")}:${(activeTime % 60).toString().padStart(2, "0")}`;
  };

  return (
    <>
      <CardLayout
        style={{
          width: "100%",
          overflow: "auto",
          gap: "0",
          padding: "0",
        }}
      >
        <>
          {isLoading.machine && <DefaultLoading />}
          <LayoutTitle>NC CODE 리스트</LayoutTitle>
          <ButtonWrap>
            {activeCallfunc.map((callFunction: FunctionDto, key: number) => {
              return (
                <ProgramButton
                  key={key}
                  onClick={onClickFunction}
                  value={callFunction.name}
                  highlight={+callFunction.name === activeTarget.code}
                >
                  {isAllComponent === true ? (
                    <p>
                      {`O${callFunction.name.padStart(4, "0")}${
                        callFunction.comment
                      }`}
                    </p>
                  ) : (
                    <div>
                      <div>
                        <p>{callFunction.mid}</p>
                        <p className="program">{callFunction.comment}</p>
                      </div>
                      <div>
                        <p>{dayjs(callFunction.date).format("YYYY/MM/DD")}</p>
                        <p>{getActiveTime(callFunction.activeTime)}</p>
                      </div>
                    </div>
                  )}
                  <FontAwesomeIcon icon={faAngleRight} />
                </ProgramButton>
              );
            })}
          </ButtonWrap>
        </>
      </CardLayout>
      <CardLayout
        style={{
          width: "100%",
          overflow: "auto",
          gap: "0",
          padding: "0",
        }}
      >
        {isLoading.code && <DefaultLoading />}
        <LayoutTitle>
          <div>
            <p>NC CODE</p>

            {activeFunction && !isAllComponent && (
              <div>
                <p className="program">{activeFunction.comment}</p>
                <p className="active_time">{`평균 가공 시간 : ${getActiveTime(
                  activeFunction.activeTime
                )}`}</p>
              </div>
            )}
          </div>
          <DefaultButton
            title={
              <ButtonText>
                <FontAwesomeIcon icon={faFileLines} />
                다운로드
              </ButtonText>
            }
            onClick={handleClickDownloadText}
            style={{
              width: "auto",
              height: "36px",
              padding: "0 16px",
              border: "0",
              borderRadius: "8px",
            }}
            activeColor={StyleColor.LIGHT}
            disableColor={StyleColor.BORDER}
            dynamic
            isActive={activeTarget.code !== 0}
          />
        </LayoutTitle>
        <ActiveCode>{activeCode}</ActiveCode>
      </CardLayout>
    </>
  );
}

const ActiveCode = styled.p`
  white-space: pre-wrap;
  padding: 16px;
`;

const ProgramButton = styled.button<{ highlight: boolean }>`
  background: #fff;

  font-weight: 400;
  line-height: 1.5;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;

  position: relative;
  left: -16px;
  height: 60px;
  width: calc(100% + 32px);

  border: 0;
  border-bottom: 1px solid #d9d9d9;

  background: ${({ highlight }) => (highlight ? "#3a79ec10" : "#fff")};

  & * {
    color: ${({ highlight }) => (highlight ? "#000" : "#7f7f7f")} !important;
    text-align: left;
    white-space: wrap;
  }

  & .program {
    font-size: 20px;
    font-weight: 500;
  }

  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: calc(100% - 32px);

    & > div {
      display: flex;
      flex-direction: column;
      align-items: start;

      &:last-child {
        align-items: end;
      }
    }
  }
`;

const LayoutTitle = styled.div`
  z-index: 2 !important;
  background: #fff;
  font-weight: 500;
  line-height: 24px;
  font-size: 20px;
  z-index: unset;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  position: sticky;
  top: 0px;
  height: 24px;
  padding: 16px 16px;
  flex-shrink: 0;

  & > div {
    display: flex;
    align-items: center;
    gap: 32px;

    & .program,
    .active_time {
      font-size: 16px;
      font-weight: 500;
    }
  }
`;

const ButtonWrap = styled.div`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const ButtonText = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 2px;
  font-size: 16px;
`;
