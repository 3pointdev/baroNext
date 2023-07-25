import styled from "styled-components";
import timeModule from "../../src/modules/time.module";
import machineStatusModule from "../../src/modules/machineStatus.module";
import MachineDto from "../../src/dto/machine/machine.dto";

interface IProps {
  data: MachineDto;
}

export default function MonitoringRow({ data }: IProps) {
  const progress = Math.floor(
    data.partCount > 0 ? (data.partCount / data.planCount) * 100 : 0
  );

  if (data.execution !== "")
    return (
      <Article.TBodyRow isOn={data.power}>
        <td className="number">{data.machineNo}</td>
        <td className="name">{data.mid}</td>
        <td className={`program ${progress >= 100 ? "redSign" : ""}`}>
          {data.program}
        </td>
        <td
          className={`progress ${progress >= 100 ? "redSign" : ""}`}
        >{`${progress}%`}</td>
        <td className="count">
          <span className={`part ${progress >= 100 ? "redSign" : ""}`}>
            {data.partCount}
          </span>
          <span className="plan">{` / ${data.planCount}`}</span>
        </td>
        <td className="start_date">{data.startYmdt.slice(5, 16)}</td>
        <td className="end_date">
          {data.planCount !== 0 && data.partCount <= data.planCount
            ? data.prdctEnd?.slice(5, 16)
            : "-"}
        </td>
        <td className="cycle_time">
          {data.partCount ? timeModule.msToHHMM(data.active) : "-"}
        </td>
        <td
          className={`status ${machineStatusModule.ToClassStatus(
            data.power,
            data.mode,
            data.execution,
            data.alarm !== ""
          )}`}
        >
          {machineStatusModule.ToStringStatus(
            data.power,
            data.mode,
            data.execution,
            data.alarm !== ""
          )}
        </td>
      </Article.TBodyRow>
    );
}

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
    }

    // 공정
    & .program {
      font-weight: 600;

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
};
