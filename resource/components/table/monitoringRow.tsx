import { MachineColorType, MachineTextType } from "config/constants";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import MachineDto from "../../src/dto/machine/machine.dto";
import {
  default as machineStatusInstance,
  default as machineStatusModule,
} from "../../src/modules/machineStatus.module";
import timeModule from "../../src/modules/time.module";

interface IProps {
  data: MachineDto;
}

export default function MonitoringRow({ data }: IProps) {
  const [progress, setProgress] = useState<number>(0);
  const [executionText, setExecutionText] = useState<string>(
    MachineTextType.MODIFY
  );
  const [executionColor, setExecutionColor] = useState<string>(
    MachineColorType.YELLOW
  );

  useEffect(() => {
    setProgress(
      Math.floor(
        data.partCount > 0 ? (data.partCount / data.planCount) * 100 : 0
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

    setExecutionText(
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
    data.execution,
    data.mode,
    data.pause,
    data.isReceiveMessage,
    data.isReceivePartCount,
    data.isChangePalette,
    data.partCount,
    data.planCount,
  ]);

  if (data.execution !== "" && data.program !== "")
    return (
      <Article.TBodyRow isOn={data.power}>
        <td className="number">{data.machineNo}</td>
        <td className="name">{data.mid}</td>
        <td
          className={`program ${progress >= 100 ? "redSign" : ""} ${
            data.program?.length > 25 ? "is_long_column" : ""
          }`}
        >
          <p>{data.program}</p>
        </td>
        <td className={`progress ${progress >= 100 ? "redSign" : ""}`}>
          {progress === Infinity ? "-" : `${progress}%`}
        </td>
        <td className="count">
          <span className={`part ${progress >= 100 ? "redSign" : ""}`}>
            {data.partCount}
          </span>
          <span className="plan">{` / ${data.planCount}`}</span>
        </td>
        <td className="start_date">
          {dayjs(data.startYmdt).format("MM-DD hh:mm")}
        </td>
        <td className="end_date">
          {data.planCount !== 0 && data.partCount <= data.planCount
            ? data.prdctEnd?.slice(5, 16)
            : "-"}
        </td>
        <td className="cycle_time">
          {data.partCount ? timeModule.msToHHMM(data.active) : "-"}
        </td>
        <Article.StatusBadge backgroundColor={executionColor}>
          {executionText}
        </Article.StatusBadge>
      </Article.TBodyRow>
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
    transform:translateX(-80%);
    -moz-transform:translateX(-80%);
    -webkit-transform:translateX(-80%);
    -o-transform:translateX(-80%);
    -ms-transform:translateX(-80%);
  }
`;

const Article = {
  Wrap: styled.table`
    width: 100vw;
    border-collapse: collapse;
    & * {
      white-space: nowrap;
    }
  `,
  Head: styled.thead`
    width: 100vw;
    height: 36px;
    text-align: center;
    backgorund: #c4c4c4;
    & th {
      background: #c4c4c4;
      min-width: 42px;
    }

    & .align_left {
      padding-left: 8px;
      text-align: left;
    }

    & * {
      font-size: 17px;
      font-weight: 600;
      color: #000;
    }
  `,
  Body: styled.tbody``,
  TBodyRow: styled.tr<{ isOn: boolean }>`
    height: 48px;
    cursor: default;
    &:hover {
      background: #494e7e;
    }

    & * {
      color: ${({ isOn }) => (isOn ? "#fff" : "#474B6B !important")};
      font-size: 32px;
      font-weight: 400;
    }

    // 호기
    & .number {
      text-align: center;
    }

    // 기계명
    & .name {
      max-width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    // 공정
    & .program {
      max-width: 320px;
      white-space: nowrap;
      overflow: hidden;
      font-weight: 600;

      &.is_long_column p {
        animation: ${textScroll} 8s linear infinite;
      }
      &.redSign {
        color: #ff4d49;
      }
    }

    // 진행률
    & .progress {
      text-align: center;

      &.redSign {
        color: #ff4d49;
      }
    }

    // 완료/목표
    & .count {
      text-align: center;
      // 완료
      & .part {
        color: #62cfeb;
        font-weight: 600;
        &.redSign {
          color: #ff4d49;
        }
      }

      // 목표
      & .plan {
      }
    }

    // 공정 시작일
    & .start_date {
      text-align: center;
    }

    // 완료 예정일
    & .end_date {
      text-align: center;
    }

    // 실CT
    & .cycle_time {
      text-align: center;
    }

    // 구분
    & .status {
      font-weight: 600;
      text-align: center;
      color: #000;

      &.off {
        background: #898989;
        color: #fff !important;
      }

      &.modify,
      &.success,
      &.alarm,
      &.ready,
      &.wait {
        background: #f5b117;
      }

      &.runing {
        background: #6ebd33;
      }

      &.emergency_stop {
        background: #e8661c;
      }
    }
  `,
  StatusBadge: styled.td<{ backgroundColor: string }>`
    font-weight: 600;
    text-align: center;
    background: ${({ backgroundColor }) => backgroundColor};
  `,
};
