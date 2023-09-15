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

export default function RealTimeTableRow22Line({ data }: IProps) {
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [executionText, setExecutionText] = useState<string>(
    MachineTextType.MODIFY
  );
  const [color, setColor] = useState<string>(MachineColorType.YELLOW);

  useEffect(() => {
    console.log(data);
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
          data.program?.length > 24 ? "is_long_column program" : "program"
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

  0%{
    transform:translateX(105%);
    -moz-transform:translateX(105%);
    -webkit-transform:translateX(105%);
    -o-transform:translateX(105%);
    -ms-transform:translateX(105%);
  }

  40% {
    transform:translateX(0%);
    -moz-transform:translateX(0%);
    -webkit-transform:translateX(0%);
    -o-transform:translateX(0%);
    -ms-transform:translateX(0%);
  }
  60% {
    transform:translateX(0%);
    -moz-transform:translateX(0%);
    -webkit-transform:translateX(0%);
    -o-transform:translateX(0%);
    -ms-transform:translateX(0%);
  }
  
  100%{
    transform:translateX(-105%);
    -moz-transform:translateX(-105%);
    -webkit-transform:translateX(-105%);
    -o-transform:translateX(-105%);
    -ms-transform:translateX(-105%);
  }
`;

const TableRow = styled.tr<{ disable: boolean }>`
  height: 4.2vh;

  & td {
    overflow: hidden;
  }

  & .mid {
    max-width: 20vw !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.5vw;
  }

  & td,
  td p,
  td span {
    white-space: nowrap;
    font-size: 1.5vw;
    line-height: 2vw;
    font-weight: 500;
    color: ${({ disable }) =>
      disable ? StyleColor.DISABLE : StyleColor.LIGHT};

    &.is_long_column p {
      width: fit-content;
      animation: ${textScroll} 10s linear infinite;
    }
  }

  & .tabular_nums {
    font-variant-numeric: tabular-nums;
    font-size: 1.5vw;
  }
`;

const MachineNumber = styled.div<{ color: string }>`
  text-align: center;
  line-height: 2vw;
  width: 2.4vw;
  height: 2vw;
  border-radius: 0.6vw;
  font-size: 1.5vw;
  background: ${({ color }) => color};
  color: ${StyleColor.LIGHT};
`;

const Execution = styled.div<{ color: string }>`
  height: 2vw;
  border-radius: 0.6vw;
  line-height: 2vw;
  background: ${({ color }) => color};
  color: ${StyleColor.LIGHT};
  text-align: center;
  font-size: 1.5vw;
  font-weight: 500;
`;
