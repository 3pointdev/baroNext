import {
  MachineColorType,
  MachineTextType,
  StyleColor,
} from "config/constants";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import machineStatusInstance from "src/modules/machineStatus.module";
import timeInstance from "src/modules/time.module";
import styled, { keyframes } from "styled-components";
import MachineDto from "../../src/dto/machine/machine.dto";

interface IProps {
  data: MachineDto;
}

export default function RealTimeTableRow({ data }: IProps) {
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [executionText, setExecutionText] = useState<string>(
    MachineTextType.MODIFY
  );
  const [color, setColor] = useState<string>(MachineColorType.YELLOW);

  useEffect(() => {
    const newExecutionText = machineStatusInstance.ToTextStatus(
      data.execution,
      data.mode,
      data.pause,
      data.isReceiveMessage,
      data.isReceivePartCount,
      data.isChangePalette
    );
    const newColor = machineStatusInstance.ToColorStatus(
      data.execution,
      data.mode,
      data.pause,
      data.isReceiveMessage
    );
    setExecutionText(newExecutionText);
    setColor(newColor);
    setIsDisable(newExecutionText === MachineTextType.OFF);
  }, [
    data.execution,
    data.mode,
    data.pause,
    data.isReceiveMessage,
    data.isReceivePartCount,
    data.isChangePalette,
  ]);

  return (
    <TableRow disable={isDisable}>
      <td align={"center"}>
        <MachineNumber color={color}>{data.machineNo}</MachineNumber>
      </td>
      <td align={"left"}>{data.mid}</td>
      <td
        align={"left"}
        className={data.program?.length > 20 ? "is_long_column" : ""}
      >
        <p>{data.program}</p>
      </td>
      <td align={"center"}>{dayjs(data.startYmdt).format("MM/DD hh:mm")}</td>
      <td align={"center"}>{dayjs(data.prdctEnd).format("MM/DD hh:mm")}</td>
      <td align={"center"}>
        {data.planCount > 0 && timeInstance.msToHHMM(data.active)}
      </td>
      <td align={"center"}>
        {data.planCount > 0 && `${data.partCount}/${data.planCount}`}
      </td>
      <td align={"center"}>
        {data.planCount > 0 &&
          `${Math.floor((data.partCount / data.planCount) * 100)}%`}
      </td>

      <td align={"center"}>
        <Execution color={color}>{executionText}</Execution>
      </td>
    </TableRow>
  );
}

const textScroll = keyframes`
  from{
    transform:translateX(100%);
    -moz-transform:translateX(100%);
    -webkit-transform:translateX(100%);
    -o-transform:translateX(100%);
    -ms-transform:translateX(100%);
  }
  to{
    transform:translateX(-100%);
    -moz-transform:translateX(-100%);
    -webkit-transform:translateX(-100%);
    -o-transform:translateX(-100%);
    -ms-transform:translateX(-100%);
  }
`;

const TableRow = styled.tr<{ disable: boolean }>`
  height: 66px;

  & td,
  td p {
    overflow: hidden;
    white-space: nowrap;
    font-size: 32px;
    line-height: 56px;
    color: ${({ disable }) =>
      disable ? StyleColor.DISABLE : StyleColor.LIGHT};

    &.is_long_column p {
      animation: ${textScroll} 8s linear infinite;
    }
  }
`;
const MachineNumber = styled.div<{ color: string }>`
  text-align: center;
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background: ${({ color }) => color};
  color: ${StyleColor.LIGHT};
`;

const Execution = styled.div<{ color: string }>`
  height: 56px;
  border-radius: 8px;
  background: ${({ color }) => color};
  color: ${StyleColor.LIGHT};
  text-align: center;
  font-size: 38px;
`;
