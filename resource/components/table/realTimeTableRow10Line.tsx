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

export default function RealTimeTableRow10Line({ data }: IProps) {
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
      <td align={"left"} className="mid">
        {data.mid}
      </td>
      <td
        align={"left"}
        className={
          data.program?.length > 14 ? "is_long_column program" : "program"
        }
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
      <td align={"center"} className="counter">
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
    transform:translateX(105%);
    -moz-transform:translateX(105%);
    -webkit-transform:translateX(105%);
    -o-transform:translateX(105%);
    -ms-transform:translateX(105%);
  }
  to{
    transform:translateX(-105%);
    -moz-transform:translateX(-105%);
    -webkit-transform:translateX(-105%);
    -o-transform:translateX(-105%);
    -ms-transform:translateX(-105%);
  }
`;

const TableRow = styled.tr<{ disable: boolean }>`
  height: 8.4vh;

  & td {
    overflow: hidden;
  }

  & .mid {
    max-width: 15vw !important;
  }

  & .program {
    max-width: 18vw !important;
  }

  & .counter {
    max-width: 14vw !important;
  }

  & td,
  td p,
  td span {
    white-space: nowrap;
    font-size: 2.1vw;
    line-height: 2vw;
    font-weight: 600;
    color: ${({ disable }) =>
      disable ? StyleColor.DISABLE : StyleColor.LIGHT};

    &.is_long_column p {
      width: fit-content;
      animation: ${textScroll} 6s linear infinite;
    }
  }

  & .tabular_nums {
    font-variant-numeric: tabular-nums;
    font-size: 2vw;
  }
`;

const MachineNumber = styled.div<{ color: string }>`
  text-align: center;
  line-height: 3.6vw;
  width: 3vw;
  height: 3.6vw;
  border-radius: 0.6vw;
  font-size: 1.9vw;
  background: ${({ color }) => color};
  color: ${StyleColor.LIGHT};
`;

const Execution = styled.div<{ color: string }>`
  height: 3.8vw;
  border-radius: 0.6vw;
  line-height: 3.8vw;
  background: ${({ color }) => color};
  color: ${StyleColor.LIGHT};
  text-align: center;
  font-size: 1.9vw;
`;
