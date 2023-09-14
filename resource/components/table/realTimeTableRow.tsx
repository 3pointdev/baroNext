import { StyleColor } from "config/color";
import { MachineColorType, MachineTextType } from "config/constants";
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
  console.log(data.program?.length);
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
      <td align={"center"} className="tabular_nums">
        {data.startYmdt && dayjs(data.startYmdt).format("MM/DD HH:mm")}
      </td>
      <td align={"center"} className="tabular_nums">
        {data.prdctEnd && dayjs(data.prdctEnd).format("MM/DD HH:mm")}
      </td>
      <td align={"center"} className="tabular_nums">
        {data.planCount > 0 && timeInstance.msToHHMM(data.active)}
      </td>
      <td align={"center"}>
        {data.planCount > 0 && (
          <>
            <span
              style={{
                color:
                  data.partCount >= data.planCount
                    ? StyleColor.FINISH
                    : StyleColor.LIGHT,
              }}
            >
              {data.partCount}
            </span>
            <span>/</span>
            <span>{data.planCount}</span>
          </>
        )}
      </td>
      <td align={"center"} className="tabular_nums">
        {data.planCount > 0 && (
          <span
            style={{
              color:
                data.partCount >= data.planCount
                  ? StyleColor.FINISH
                  : StyleColor.LIGHT,
            }}
          >{`${Math.floor((data.partCount / data.planCount) * 100)}%`}</span>
        )}
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
  height: 74px;

  & td {
    overflow: hidden;
  }

  & td,
  td p,
  td span {
    white-space: nowrap;
    font-size: 38px;
    line-height: 60px;
    font-weight: 600;
    color: ${({ disable }) =>
      disable ? StyleColor.DISABLE : StyleColor.LIGHT};

    &.is_long_column {
      max-width: 422.4px !important;
    }
    &.is_long_column p {
      animation: ${textScroll} 8s linear infinite;
    }
  }

  & .tabular_nums {
    font-variant-numeric: tabular-nums;
    font-size: 36px;
  }
`;

const MachineNumber = styled.div<{ color: string }>`
  text-align: center;
  line-height: 60px;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background: ${({ color }) => color};
  color: ${StyleColor.LIGHT};
`;

const Execution = styled.div<{ color: string }>`
  height: 60px;
  border-radius: 8px;
  line-height: 60px;
  background: ${({ color }) => color};
  color: ${StyleColor.LIGHT};
  text-align: center;
  font-size: 38px;
`;
