import { MouseEventHandler } from "react";
import React from "react";
import {
  IActiveTarget,
  ILoding,
} from "../../src/viewModels/program/program.viewModel";
import FunctionDto from "../../src/dto/program/function.dto";
import styled from "styled-components";
import CardLayout from "../layout/cardLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faFileLines } from "@fortawesome/free-solid-svg-icons";
import DefaultLoading from "../indicator/defaultLoding";
import DefaultButton from "../button/defaultButton";

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
                  onClick={handleClickFunction}
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
                    <p>{callFunction.comment}</p>
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
          <p>NC CODE</p>
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
              height: "22px",
              padding: "0 8px",
              border: "0",
              borderRadius: "4px",
              color: "#000",
              fontSize: "14px",
            }}
            activeColor="#3a79ec10"
            disableColor="#E0E0E0"
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
`;
