import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyleColor } from "config/constants";
import { MouseEventHandler } from "react";
import styled from "styled-components";
import ProductDto from "../../src/dto/report/product.dto";
import ProductDataDto from "../../src/dto/report/productData.dto";
import { ILotData } from "../../src/viewModels/report/report.viewModel";
import CardLayout from "../layout/cardLayout";

interface IProps {
  data: ProductDto;
  lot: ILotData;
  active: number;
  onClickLotToggle: MouseEventHandler;
}

export default function ColumnReportCard({
  data,
  lot,
  active,
  onClickLotToggle,
}: IProps) {
  return (
    <Container style={{ flexDirection: "row" }}>
      <div>
        <SectionTitle>{data.name}</SectionTitle>
        <WorkTimeTable>
          <tbody>
            <tr>
              <th>조업시간</th>
              <td>{`주: 00:00 ~ 00:00(점심 0시간, 휴식 00분)\n야: 00:00 ~ 00:00(점심 0시간, 휴식 00분)`}</td>
            </tr>
            <tr>
              <th>조업시간 내 가동률</th>
              <td>100%</td>
            </tr>
            <tr>
              <th>조업시간 내 가동시간</th>
              <td>00시간 00분 00초</td>
            </tr>
            <tr>
              <th>조업시간 내 비가동시간</th>
              <td>00시간 00분 00초</td>
            </tr>
          </tbody>
        </WorkTimeTable>
        <div>
          <SectionTitle>가공 변경 이력</SectionTitle>
          <div>
            <p>가공명</p>
            <p>시간</p>
          </div>
          <div>
            {data.data.map((settingData: ProductDataDto, key: number) => {
              return (
                <LotChange.Item
                  key={`lot_item_${key}`}
                  onClick={onClickLotToggle}
                  data-id={data.machineNo}
                  data-key={key}
                >
                  <LotChange.Program>
                    {settingData.program ? settingData.program : "Unknown Lot"}
                  </LotChange.Program>
                  <LotChange.Time>{`${settingData.start} ~ ${settingData.end}`}</LotChange.Time>
                </LotChange.Item>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <div>
          <p>
            {data.data[active].program
              ? data.data[active].program
              : "Unknown Lot"}
          </p>
          <table>
            <thead>
              <th>목표수량</th>
              <th>가공수량</th>
              <th>달성률</th>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>

      {/* <ManageCycleTime.ButtonWrap>
        {data.data.map((settingData: ProductDataDto, key: number) => {
          return (
            <DefaultButton
              title={settingData.program.split("(")[0]}
              onClick={onClickLotToggle}
              dataId={data.machineNo}
              value={key}
              isActive={+active === key}
              dynamic
              alwaysHandling={true}
              key={`program_data_button_${key}`}
              style={{
                width: "80px",
                height: "38px",
                fontSize: "14px",
                fontWeight: "500",
              }}
              activeColor="#3A79EC"
              disableColor="#63657860"
            />
          );
        })}
      </ManageCycleTime.ButtonWrap>
      <ManageCycleTime.CycleMonitor>
        <div>
          <ManageCycleTime.Time>
            {timeModule.secToMMSS(
              data.data[active].active + data.data[active].idle
            )}
          </ManageCycleTime.Time>
          <ManageCycleTime.Title>실 Cycle Time</ManageCycleTime.Title>
        </div>
        <ManageCycleTime.BadgeWrap>
          <InformationBadge title="표준시간" desc="00:02:01" />
          <InformationBadge title="성취율" desc="97%" />
        </ManageCycleTime.BadgeWrap>
      </ManageCycleTime.CycleMonitor>
      <ManageCycleTime.OperationCount>
        <ManageCycleTime.Title>가공개수</ManageCycleTime.Title>
        <ManageCycleTime.Title>
          {`${data.data[active].count} / ${data.data[active].plan}`}
        </ManageCycleTime.Title>
        <ProgressBar
          value={(data.data[active].count / data.data[active].plan) * 100}
        />
        <ManageCycleTime.DoneTime>
          가공완료 예정시간 : 0000
        </ManageCycleTime.DoneTime>
        <ManageCycleTime.AverageItem className="production_time">
          <p>평균단품 가공</p>
          <p>{timeModule.secToMMSS(data.data[active].active)}</p>
        </ManageCycleTime.AverageItem>
        <ManageCycleTime.AverageItem>
          <p>평균교체 준비</p>
          <p>{timeModule.secToMMSS(data.data[active].idle)}</p>
        </ManageCycleTime.AverageItem>
      </ManageCycleTime.OperationCount>
      <ProgressBar
        value={
          Math.round(
            (data.data[active].total /
              (data.data[active].total + notWorkTime)) *
              10000
          ) / 100
        }
        baseColor="red"
      />
      <Graph.PercentWrap>
        <div>
          <div>
            <Graph.MachineWorkIcon icon={faGear} className="work" />
            <p>가동시간</p>
          </div>
          <Graph.Percent className="work">
            {`${
              Math.round(
                (data.data[active].total /
                  (data.data[active].total + notWorkTime)) *
                  10000
              ) / 100
            }%`}
          </Graph.Percent>
          <Graph.Time>
            {timeModule.msToHHMM(data.data[active].total)}
          </Graph.Time>
        </div>
        <Graph.VersusWrap>
          <p>vs</p>
        </Graph.VersusWrap>
        <div>
          <div>
            <Graph.MachineWorkIcon
              icon={faBuildingCircleXmark}
              className="not_work"
            />
            <p>비가동시간</p>
          </div>
          <Graph.Percent className="not_work">
            {`${
              Math.round(
                (notWorkTime / (data.data[active].total + notWorkTime)) * 10000
              ) / 100
            }%`}
          </Graph.Percent>
          <Graph.Time>{timeModule.msToHHMM(notWorkTime)}</Graph.Time>
        </div>
      </Graph.PercentWrap>

      <p>가동시간</p>
      <p>비가동시간</p> */}
    </Container>
  );
}

const Container = styled(CardLayout)`
  display: flex;
  gap: 12px;
  height: fit-content;
  width: 100%;
  margin-bottom: 16px;
`;

const WorkTimeTable = styled.table`
  white-space: pre-line;
`;

const ColumnTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
`;

const BusinessTimeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  white-space: nowrap;
  font-size: 14px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

const ColumnWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  line-height: 38px;
`;

const LotChange = {
  Item: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: -4px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eaeaec;
    & * {
      color: #4c4e64;
      word-break: break-word;
    }

    &.is_not_first {
      margin-bottom: 16px;
    }
  `,
  Program: styled.p`
    cursor: pointer;
    text-decoration: underline;
    font-weight: 400;
    font-size: 14px;
    width: 100%;
    letter-spacing: 0.6px;
  `,
  Time: styled.p`
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    text-align: right;
  `,
};

const ManageCycleTime = {
  ButtonWrap: styled.div`
    display: flex;
    gap: 12px;
  `,
  CycleMonitor: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  Time: styled.p`
    font-size: 40px;
    font-weight: 600 !important;
    line-height: 1;
  `,
  Title: styled.p`
    font-size: 16px;
    font-weight: 700 !important;
    line-height: 1;
  `,
  BadgeWrap: styled.div`
    display: flex;
    gap: 8px;
  `,
  OperationCount: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  DoneTime: styled.p`
    padding: 8px 0;
    font-size: 14px;
    font-weight: 400;
    color: #4c4e64;
  `,
  AverageItem: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #eaeaec;
    padding: 8px 0;
    & p {
      font-weight: 400;
      font-size: 14px;
      color: #4c4e64;
    }

    &.production_time {
      border-top: 1px solid #eaeaec;
    }
  `,
};

const Graph = {
  PercentWrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & > div {
      display: flex;
      flex-direction: column;

      & > div {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 400 !important;
        color: #4c4e64 !important;
        margin-bottom: 8px;
      }
    }

    & > div:first-child {
      align-items: start;
    }

    & > div:last-child {
      align-items: end;
    }
  `,
  MachineWorkIcon: styled(FontAwesomeIcon)`
    width: 16px;
    height: 16px;
    padding: 6px;
    display: flex;
    align-itmes: center;
    justify-content: center;
    border-radius: 4px;
    &.work {
      & path {
        fill: rgba(58, 121, 236, 100);
      }
      background: ${StyleColor.PRIMARY}20;
    }
    &.not_work {
      & path {
        fill: rgba(255, 58, 58, 54);
      }
      background: ${StyleColor.WARNNING}20;
    }
  `,
  Percent: styled.p`
    font-size: 20px;
    &.work {
      color: #3a79ec;
    }
    &.not_work {
      color: #ff4d49;
    }
  `,
  Time: styled.p`
    font-weight: 400;
    font-size: 12px;
    color: #4c4e64 !important;
  `,
  VersusWrap: styled.div`
    position: relative;
    height: 74px;
    border: 0.8px solid #eaeaec;
    opacity: 0.8;
    & p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${StyleColor.HOVER};
      border-radius: 50%;
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-weight: 400;
      text-align: center;
      font-size: 14px;
      color: #4c4e64;
    }
  `,
};
