import FactoryIcon from "../../public/images/icons/factoryIcon";
import MachineDto from "../../src/dto/machine/machine.dto";
import styled from "styled-components";
import moment, { now } from "moment";
import { useEffect, useState } from "react";
import timeModule from "../../src/modules/time.module";
import { MachineExecutionType } from "../../config/constants";
import machineStatusModule from "../../src/modules/machineStatus.module";

interface IProps {
  data: MachineDto;
}

export default function RealTimeMachineItem(props: IProps) {
  const { data } = props;
  const [color, setColor] = useState<string>("red");

  useEffect(() => {
    console.log(data.execution);
    setColor(machineStatusModule.ToColorStatus(data.execution));
  }, [data]);

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
            <Item.Desc>
              {+data.doneTime > 0 ? timeModule.msToHHMM(+data.doneTime) : "-"}
            </Item.Desc>
          </RowFlex>
        </ColFlex>
      </RowFlex>
    </Container>
  );
}

const Container = styled.div`
  width: 230px;
  height: 140px;
  padding: 12px 18px;
  border-radius: 8px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  gap: 24px;

  & img {
    margin-left: 8px;
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
    margin-left: 4px;
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
