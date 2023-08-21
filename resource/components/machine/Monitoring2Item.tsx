import styled from "styled-components";
import {
  MachineExecutionType,
  MachineStateType,
  MachineTextType,
} from "../../config/constants";
import MachineDto from "../../src/dto/machine/machine.dto";
import machineStatusInstance from "../../src/modules/machineStatus.module";
import timeInstance from "../../src/modules/time.module";
import { useEffect, useState } from "react";
import moment from "moment";

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
  let realTime: number;

  useEffect(() => {
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
  }, [
    data.execution,
    data.mode,
    data.pause,
    data.isReceiveMessage,
    data.isReceivePartCount,
    data.isChangePalette,
  ]);

  useEffect(() => {
    setExecutionColor(
      machineStatusInstance.ToColorStatus(
        data.execution,
        data.mode,
        data.pause,
        data.isReceiveMessage
      )
    );
  }, [data.execution, data.mode, data.pause, data.isReceiveMessage]);

  if (data.workTime > 0) {
    if (data.tActiveTime > 0) {
      realTime =
        +data.activeTime -
        data.workTime -
        (new Date().getTime() - data.tActiveTime);
    } else {
      realTime = +data.activeTime - data.workTime;
    }
  } else {
    realTime =
      +data.activeTime - (new Date().getTime() - +data.activeStartTime);
  }

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
        <RealTimeInfo.CycleTime>
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
  font-weight: 800;
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
  `,
  TrafficLights: styled.div<{ color: string }>`
    position: absolute;
    left: -16%;
    top: -16%;
    width: 600px;
    height: 600px;
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
    font-variant-numeric: tabular-nums;

    z-index: 1;
    font-size: 7.2vh;
    font-weight: 900;
    line-height: 6.2vh;
  `,
};

const Footer = {
  Wrap: styled.div`
    z-index: 1;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #d6d6d6;
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
    font-size: 3vh;
    color: #727171;
    font-weight: 500;
    line-height: 100px;
  `,
  EndTime: styled.p`
    z-index: 1;
    font-size: 3vh;
    color: #231815;
    font-weight: 500;
    line-height: 100px;
  `,
};

// active: 163377
// activeStartTime: "1692327858973"
// activeTime: "162542"
// alarm: "0064 motion                                    .(       1  ) 3"
// block: "M30"
// cycleTime: 0
// doneTime: 4737933
// endPart: false
// estop: "ARMED"
// execution: "ACTIVE"
// executionTime: 0
// id: "5"
// machineNo: "5"
// mcode: "G1X39.4F.06"
// message: "2360  2360 CHUCK UNCLAMP STATUS"
// messageTime: undefined
// mid: "Lynx220LC"
// mode: "AUTOMATIC"
// modeTime: 0
// partCount: 69
// pause: false
// planCount: 98
// power: true
// prdctEnd: "2023-08-18 14:38:00"
// program: "CS87D30H48-02-2  "
// startYmdt: "2023-08-17 11:28:05"
// tActiveTime: 1692327802908
// wait: 35517
// workTime: 136105

// ActiveTime: 1692327858973
// Alarm: "0064 motion                                    .(       1  ) 3"
// Block: "O2003(CS87D30H48-02-2)"
// CountTime: 1692327829345
// CycleTime: 0
// Estop: "ARMED"
// Execution: "ACTIVE"
// ExecutionTime: 0
// HasDataModi: false
// Id: "5"
// IdleTime: 29628
// Mcode: "N1000X50."
// Message: "2360  2360 CHUCK UNCLAMP STATUS"
// MessageTime: 1692313499931
// Mid: "Lynx220LC"
// Mode: "AUTOMATIC"
// ModeTime: 0
// PartCount: 69
// PlanCount: 98
// Power: true
// Program: "% O2003(CS87D30H48-02-2)  (2023.08.17) "
// SendByte: 3939889
// State: 1
// StopTime: 1692327829748
// TActiveTime: 1692327858973
// Time: "2023-08-18T03:04:36.101265Z"
// WorkTime: 0
