import styled from "styled-components";
import { MachineExecutionType, MachineStateType } from "../../config/constants";
import MachineDto from "../../src/dto/machine/machine.dto";
import machineStatusInstance from "../../src/modules/machineStatus.module";

interface IProps {
  data: MachineDto;
}

export default function Monitoring2Item({ data }: IProps) {
  const isStoped = machineStatusInstance.ToStringStatus(
    data.power,
    data.mode,
    data.execution,
    data.alarm !== ""
  );
  return (
    <Container>
      <p>{`${data.partCount} / ${data.planCount}`}</p>
      <p>{data.program}</p>
      <p>{data.mid}</p>
      <p>{data.execution}</p>
      {isStoped !== "가공중" && <StopCover>{isStoped}</StopCover>}
    </Container>
  );
}

const Container = styled.li`
  position: relative;
  width: 100%;
  height: 25%;
  border: 1px solid black;
`;

const StopCover = styled.div`
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
  font-size: 8.9955022489vh;
  font-weight: 800;
`;
