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
} from "config/constants";

interface IProps {
  data: MachineDto;
}

export default function DashBoardMachine(props: IProps) {
  const { data } = props;
  const [color, setColor] = useState<string>(MachineColorType.GRAY);
  const [endTime, setEndTime] = useState<string>("-");

  useEffect(() => {
    setColor(machineStatusModule.ToDashBoardColor(data.execution));
  }, [data.execution]);

  useEffect(() => {
    const time = (data.active + data.wait) * (data.planCount - data.partCount);
    setEndTime(timeInstance.msToHHMM(time));

    if (color === MachineColorType.GRAY || time <= 0) {
      setEndTime("-");
    }
  }, [color]);

  return (
    <Container>
      <Item.MidTitle>{data.mid}</Item.MidTitle>
      <RowFlex>
        <ColFlex>
          <Item.MachineNumber color={color}>
            {data.machineNo}
          </Item.MachineNumber>
          <FactoryIcon color={color} />
        </ColFlex>
        <ColFlex>
          <RowFlex>
            <Item.Title>공 정 명</Item.Title>
            <Item.Desc>{data.program}</Item.Desc>
          </RowFlex>
          <RowFlex>
            <Item.Title>수 량</Item.Title>
            <Item.Desc>{`${data.partCount}/${data.planCount}`}</Item.Desc>
          </RowFlex>
          <RowFlex>
            <Item.Title>남은시간</Item.Title>
            <Item.Desc>{endTime}</Item.Desc>
          </RowFlex>
        </ColFlex>
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
  padding: 12px 18px;
  border-radius: 8px;
  background-color: #f4f4f4;

  position: relative;

  display: flex;
  flex-direction: column;
  gap: 24px;

  @media screen and (max-width: 1248px) {
    width: 27%;
  }

  @media screen and (max-width: 917px) {
    width: 40%;
  }
`;

const RowFlex = styled.div`
  display: flex;
  gap: 16px;
`;

const ColFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 6px;
`;

const Item = {
  MidTitle: styled.p`
    width: 100%;
    background: rgba(255, 255, 255, 0.6);
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
  background: #9c9c9c50;
`;
