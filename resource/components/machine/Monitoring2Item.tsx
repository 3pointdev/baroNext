import styled from "styled-components";
import { MachineExecutionType, MachineTextType } from "../../config/constants";
import MachineDto from "../../src/dto/machine/machine.dto";
import machineStatusInstance from "../../src/modules/machineStatus.module";
import timeInstance from "../../src/modules/time.module";
import { useCallback, useEffect, useState } from "react";

interface IProps {
  data: MachineDto;
}

export default function Monitoring2Item({ data }: IProps) {
  const [executionText, setExecutionText] = useState<MachineTextType>(
    MachineTextType.MODIFY
  );
  const [executionColor, setExecutionColor] = useState<string>("");
  const onCoverStatus: MachineTextType[] = [
    MachineTextType.OFF,
    MachineTextType.MODIFY,
  ];
  const [realTime, setRealTime] = useState<number>();
  const [realTimeInterval, setRealTimeInterval] = useState<any>();

  /**
   * execution이 active일때 타이머 작동함수
   */
  useEffect(() => {
    if (data.execution === MachineExecutionType.ACTIVE) {
      const interval = setInterval(() => {
        setRealTime(
          +data.activeStartTime - (new Date().getTime() - +data.activeTime)
        );
      }, 1000);
      setRealTimeInterval(interval);
    } else {
      clearInterval(realTimeInterval);
      setRealTimeInterval(null);
    }
  }, [data.execution]);

  /**
   * 머신상태에 따라 텍스트, 색상 변경함수
   */
  useEffect(() => {
    if (data.mid === "Lynx220LSY") {
      console.log(data.mid, "execution :", data.execution);
      console.log(data.mid, "pause :", data.pause);
      console.log(data.mid, "block :", data.block);
      console.log(data.mid, "isReceivePartCount :", data.isReceivePartCount);
      console.log(
        data.mid,
        "status :",
        machineStatusInstance.ToTextStatus(
          data.execution,
          data.mode,
          data.pause,
          data.isReceiveMessage,
          data.isReceivePartCount,
          data.isChangePalette
        )
      );
    }
    setExecutionText(
      machineStatusInstance.ToTextStatus(
        data.execution,
        data.mode,
        data.pause,
        data.isReceiveMessage,
        data.isReceivePartCount,
        data.isChangePalette
      )
    );
    setExecutionColor(
      machineStatusInstance.ToColorStatus(
        data.execution,
        data.mode,
        data.pause,
        data.isReceiveMessage
      )
    );
  }, [
    data.execution,
    data.mode,
    data.pause,
    data.isReceiveMessage,
    data.isReceivePartCount,
    data.isChangePalette,
  ]);

  useEffect(() => {
    return () => {
      clearInterval(realTimeInterval);
    };
  }, []);

  return (
    <Container>
      <Header.Wrap>
        <Header.Count>
          {data.planCount > 0 &&
            executionText !== MachineTextType.OFF &&
            `${data.partCount} / ${data.planCount}`}
        </Header.Count>
        <Header.Lot>
          {executionText !== MachineTextType.OFF && data.program}
        </Header.Lot>
      </Header.Wrap>
      <RealTimeInfo.Wrap>
        <RealTimeInfo.TrafficLights color={executionColor} />
        <RealTimeInfo.Number>{data.machineNo}</RealTimeInfo.Number>
        <RealTimeInfo.CycleTime
          className={
            realTime <= 0 && data.execution === MachineExecutionType.ACTIVE
              ? "zero"
              : ""
          }
        >
          {executionText === MachineTextType.ACTIVE
            ? timeInstance.msToHHMM(realTime > 0 ? realTime : 0)
            : executionText === MachineTextType.OFF
            ? ""
            : executionText}
        </RealTimeInfo.CycleTime>
      </RealTimeInfo.Wrap>
      <Footer.Wrap>
        <Footer.Progress progress={(data.partCount / data.planCount) * 100} />
        <Footer.Mid>{data.mid}</Footer.Mid>
        <Footer.EndTime>
          {executionText !== MachineTextType.OFF &&
            timeInstance.msToString(
              (data.active + data.wait) * (data.planCount - data.partCount)
            )}
        </Footer.EndTime>
      </Footer.Wrap>
      {onCoverStatus.includes(executionText) && (
        <StopCover>{executionText}</StopCover>
      )}
    </Container>
  );
}

const Container = styled.li`
  position: relative;
  width: 100%;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 16px;
  overflow: hidden;
  background: #fff;

  & > * {
    flex-shrink: 0;
  }
`;

const StopCover = styled.div`
  z-index: 2;
  position: absolute;
  top: 0px;
  left: 0px;
  background: rgba(141, 141, 141, 0.9);
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 9vh;
  font-family: "pretendard", monospace;
  font-weight: 700;
`;
const Header = {
  Wrap: styled.div`
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  Count: styled.p`
    font-size: 2.8vh;
    line-height: 1;
    color: #727171;
    font-weight: 600;
  `,
  Lot: styled.p`
    font-size: 2.8vh;
    line-height: 1;
    color: #231815;
    font-weight: 600;
  `,
};

const RealTimeInfo = {
  Wrap: styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    position: relative;
  `,
  TrafficLights: styled.div<{ color: string }>`
    position: absolute;
    left: -16vw;
    top: -24vw;
    width: 50vw;
    height: 50vw;
    background: ${({ color }) => color};
    border-radius: 50%;
  `,
  Number: styled.p`
    font-size: 7.2vh;
    font-weight: 600;
    line-height: 6.2vh;
    color: #fff;
    position: relative;
  `,
  CycleTime: styled.p`
    z-index: 1;
    font-size: 7.2vh;
    font-weight: 900;
    line-height: 6.2vh;
    width: 100%;
    text-align: right;

    &.zero {
      color: red;
    }
  `,
};

const Footer = {
  Wrap: styled.div`
    z-index: 1;
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #d9d9d9;
    padding: 0 16px;
    position: relative;
  `,
  Progress: styled.div<{ progress: number }>`
    z-index: 1;
    position: absolute;
    left: 0px;
    top: 0px;
    height: 100%;
    background: rgb(178, 178, 178);
    width: ${({ progress }) => progress}%;
  `,
  Mid: styled.p`
    z-index: 1;
    font-size: 40px;
    color: #727171;
    font-weight: 500;
    line-height: 72px;
  `,
  EndTime: styled.p`
    z-index: 1;
    font-size: 40px;
    color: #231815;
    font-weight: 500;
    line-height: 72px;
  `,
};
