import FactoryIcon from "public/images/icons/factoryIcon";
import MachineDto from "src/dto/machine/machine.dto";
import styled from "styled-components";
import { useEffect, useState } from "react";
import machineStatusModule from "src/modules/machineStatus.module";
import timeInstance from "src/modules/time.module";
import {
  MachineColorType,
  MachineExecutionType,
  MachineStateType,
  MachineTextType,
  StyleColor,
} from "config/constants";

interface IProps {
  data: MachineDto;
}

export default function DashBoardMachine(props: IProps) {
  const { data } = props;
  const [color, setColor] = useState<string>(MachineColorType.GRAY);
  const [status, setStatus] = useState<string>(MachineTextType.MODIFY);
  const [endTime, setEndTime] = useState<string>("-");

  useEffect(() => {
    const time = (data.active + data.wait) * (data.planCount - data.partCount);
    setEndTime(timeInstance.msToHHMM(time));
    if (data.execution === MachineExecutionType.OFF || time <= 0) {
      setEndTime("-");
    }

    setColor(
      machineStatusModule.ToColorStatus(
        data.execution,
        data.mode,
        data.pause,
        data.isReceiveMessage
      )
    );

    setStatus(
      machineStatusModule.ToTextStatus(
        data.execution,
        data.mode,
        data.pause,
        data.isReceiveMessage,
        data.isReceivePartCount,
        data.isChangePalette
      )
    );
  }, [
    data.active,
    data.wait,
    data.planCount,
    data.partCount,
    data.execution,
    data.mode,
    data.pause,
    data.isReceiveMessage,
    data.isReceivePartCount,
    data.isChangePalette,
  ]);

  return (
    <Container>
      <Item.MidTitle>{data.mid}</Item.MidTitle>
      <RowFlex>
        <ColFlex>
          <Item.MachineNumber color={color}>
            {data.machineNo}
          </Item.MachineNumber>
          <FactoryIcon color={color} />
          <Item.Status color={color}>{status}</Item.Status>
        </ColFlex>
        <Item.Wrap>
          <Item.Box>
            <Item.Title>공 정 명</Item.Title>
            <Item.Desc>{data.program}</Item.Desc>
          </Item.Box>
          <Item.Box>
            <Item.Title>수 량</Item.Title>
            <Item.Desc>{`${data.partCount}/${data.planCount}`}</Item.Desc>
          </Item.Box>
          <Item.Box>
            <Item.Title>남은시간</Item.Title>
            <Item.Desc>{endTime}</Item.Desc>
          </Item.Box>
        </Item.Wrap>
      </RowFlex>
      {data.execution === MachineExecutionType.OFF && <BackgroundCover />}
    </Container>
  );
}

const Container = styled.div`
  flex-shrink: 0;
  width: 234px;
  min-width: 200px;
  height: 140px;
  padding: 18px 18px 24px;
  border-radius: 8px;
  background: ${StyleColor.HOVER};

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;
`;

const RowFlex = styled.div`
  display: flex;
  gap: 16px;
`;

const ColFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 6px;
`;

const Item = {
  MidTitle: styled.p`
    width: 100%;
    background: ${StyleColor.LIGHT};
    border-radius: 8px;
    height: 28px;
    line-height: 2;
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    border: 8px;
  `,
  MachineNumber: styled.p<{ color: string }>`
    width: 100%;
    text-align: center;
    color: ${({ color }) => color};
  `,
  Status: styled.p<{ color: string }>`
    color: ${({ color }) => color};
    white-space: nowrap;
    line-height: 2;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
  `,
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
  `,
  Box: styled.div`
    display: flex;
    gap: 16px;
  `,
  Title: styled.p`
    flex-shrink: 0;
    display: inline-block;
    font-size: 10px;
    width: 36px;
    color: #666666;
    text-align: justify;
    text-align-last: justify;
    -moz-text-align-last: justify;
    word-break: keep-all;
  `,
  Desc: styled.p`
    width: calc(100% - 40px);
    color: rgba(0, 0, 0, 0.87);
    font-size: 12px;
    font-weight: 400;
    word-break: break-all;
  `,
};

const BackgroundCover = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  background: ${StyleColor.DISABLE}50;
`;
