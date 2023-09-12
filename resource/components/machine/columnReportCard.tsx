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
  dataIndex: number;
}

export default function ColumnReportCard({
  data,
  lot,
  active,
  onClickLotToggle,
  dataIndex,
}: IProps) {
  return (
    <Container style={{ flexDirection: "row" }}>
      <SectionWrap>
        <SectionTitle>{data.name}</SectionTitle>
        <WorkTimeTable>
          <tbody>
            <tr>
              <th>조업시간</th>
              <td>00:00 ~ 00:00(점심 0시간, 휴식 00분)</td>
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

        <SectionTitle>가공 변경 이력</SectionTitle>
        <LotChangeTable>
          <thead>
            <tr>
              <th colSpan={1}>가공명</th>
              <th colSpan={2}>시간</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((settingData: ProductDataDto, key: number) => {
              return (
                <tr key={`lot_item_${key}`}>
                  <td
                    onClick={onClickLotToggle}
                    data-id={data.machineNo}
                    data-index={dataIndex}
                    data-key={key}
                  >
                    {settingData.program ? settingData.program : "Unknown Lot"}
                  </td>
                  <td>
                    <div>
                      <p>시작</p>
                      <p>{settingData.start}</p>
                    </div>
                    <div>
                      <p>종료</p>
                      <p>{settingData.end}</p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p>전체가공</p>
                      <p>00:00:00</p>
                    </div>
                    <div>
                      <p>셋팅</p>
                      <p>00:00:00</p>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </LotChangeTable>
      </SectionWrap>
      <SectionWrap>
        <LotWrap>
          <p>
            {data.data[active].program
              ? data.data[active].program
              : "Unknown Lot"}
          </p>
          <CountTable>
            <thead>
              <tr>
                <th>목표수량</th>
                <th>가공수량</th>
                <th>달성률</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.data[active].plan}</td>
                <td>{data.data[active].count}</td>
                <td>
                  {`${Math.floor(
                    (data.data[active].count / data.data[active].plan) * 100
                  )}%`}
                </td>
              </tr>
            </tbody>
          </CountTable>
        </LotWrap>
        <TimeWrap>
          <div>
            <p>시작</p>
            <p>{data.data[active].start}</p>
          </div>
          <div>
            <p>종료</p>
            <p>{data.data[active].end}</p>
          </div>
        </TimeWrap>
        <DataTable>
          <thead>
            <tr>
              <th>셋팅시간</th>
              <th>{`평균\n단품 실가공 시간`}</th>
              <th>{`평균\n준비교체시간`}</th>
              <th>{`평균\n실 Cycle time`}</th>
              <th>표준 가공 시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>00:00:00</td>
              <td>00:00:00</td>
              <td>00:00:00</td>
              <td>00:00:00</td>
              <td>00:00:00</td>
            </tr>
          </tbody>
        </DataTable>
      </SectionWrap>
    </Container>
  );
}

const Container = styled(CardLayout)`
  display: flex;
  gap: 12px;
  height: fit-content;
`;

const SectionWrap = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SectionTitle = styled.p`
  width: calc(100% - 18px);
  height: 56px;
  background: ${StyleColor.EMPHASIS};
  border: 1px solid ${StyleColor.HOVER};
  font-size: 24px;
  font-weight: 600;
  line-height: 38px;

  display: flex;
  align-items: center;
  padding-left: 16px;
`;

const WorkTimeTable = styled.table`
  width: 100%;
  border-spacing: 0;
  margin-bottom: 8px;
  white-space: nowrap;
  text-align: left;

  & th {
    padding-left: 8px;
    border: 1px solid ${StyleColor.HOVER};
    border-bottom: 1px solid ${StyleColor.LIGHT};
    background: ${StyleColor.HOVER};
    width: 40%;
    height: 40px;
  }

  & tr:last-child th {
    border: 1px solid ${StyleColor.HOVER};
  }

  & td {
    padding-left: 8px;
    width: 100%;
    border-bottom: 1px solid ${StyleColor.HOVER};
    border-right: 1px solid ${StyleColor.HOVER};
  }
`;

const LotChangeTable = styled.table`
  width: 100%;
  border-spacing: 0;

  & th {
    border: 1px solid ${StyleColor.HOVER};
    background: ${StyleColor.HOVER};
    height: 32px;
    width: 300px;

    &:first-child {
      border-right: 1px solid ${StyleColor.LIGHT};
    }
  }

  & tbody tr td {
    padding-left: 8px;
    border-right: 1px solid ${StyleColor.HOVER};
    border-bottom: 1px solid ${StyleColor.HOVER};

    &:first-child {
      border-left: 1px solid ${StyleColor.HOVER};
      text-decoration: underline;
      cursor: pointer;
    }
    & p:first-child {
      font-weight: 600;
    }
  }

  & div {
    white-space: nowrap;
    display: flex;
    gap: 4px;
    margin: 4px;
  }
`;

const LotWrap = styled.div`
  display: flex;
  gap: 16px;

  & p {
    font-size: 18px;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
    width: 50%;
    height: 88px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;
  }
`;
const TimeWrap = styled.div`
  width: 50%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  padding-left: 16px;
  gap: 8px;

  & div {
    display: flex;
    gap: 16px;

    & p:first-child {
      font-weight: 600;
    }
  }
`;

const CountTable = styled.table`
  width: 50%;
  text-align: center;
  border-spacing: 0;

  & th {
    padding-left: 8px;
    border: 1px solid ${StyleColor.HOVER};
    border-right: 1px solid ${StyleColor.LIGHT};
    background: ${StyleColor.HOVER};
    height: 40px;
    width: 33%;

    &:last-child {
      border-right: 1px solid ${StyleColor.HOVER};
    }
  }

  & td {
    padding-left: 8px;
    border-bottom: 1px solid ${StyleColor.HOVER};
    border-right: 1px solid ${StyleColor.HOVER};

    &:first-child {
      border-left: 1px solid ${StyleColor.HOVER};
    }
  }
`;

const DataTable = styled.table`
  width: 100%;
  text-align: center;
  border-spacing: 0;

  & th {
    padding-left: 8px;
    border: 1px solid ${StyleColor.HOVER};
    border-right: 1px solid ${StyleColor.LIGHT};
    background: ${StyleColor.HOVER};
    height: 60px;
    width: 20%;
    white-space: pre-line;
    &:last-child {
      border-right: 1px solid ${StyleColor.HOVER};
    }
  }

  & td {
    height: 100px;
    padding-left: 8px;
    border-bottom: 1px solid ${StyleColor.HOVER};
    border-right: 1px solid ${StyleColor.HOVER};

    &:first-child {
      border-left: 1px solid ${StyleColor.HOVER};
    }
  }
`;
