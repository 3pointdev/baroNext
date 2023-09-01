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
      <SectionWrap>
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
          <table>
            <thead>
              <tr>
                <th colSpan={1}>가공명</th>
                <th colSpan={2}>시간</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((settingData: ProductDataDto, key: number) => {
                return (
                  <tr
                    key={`lot_item_${key}`}
                    onClick={onClickLotToggle}
                    data-id={data.machineNo}
                    data-key={key}
                  >
                    <td>
                      {settingData.program
                        ? settingData.program
                        : "Unknown Lot"}
                    </td>
                    <td>{`${settingData.start} ~ ${settingData.end}`}</td>
                    <td>{`${settingData.start} ~ ${settingData.end}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </SectionWrap>
      <div>
        <div>
          <p>
            {data.data[active].program
              ? data.data[active].program
              : "Unknown Lot"}
          </p>
          <table>
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
          </table>
        </div>
        <div>
          <div>
            <p>시작</p>
            <p>{data.data[active].start}</p>
          </div>
          <div>
            <p>종료</p>
            <p>{data.data[active].end}</p>
          </div>
        </div>
      </div>
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

const SectionWrap = styled.div`
  width: 50%;
`;

const SectionTitle = styled.p`
  width: calc(100% - 16px);
  height: 56px;
  background: ${StyleColor.EMPHASIS};
  font-size: 24px;
  font-weight: 600;
  line-height: 38px;

  display: flex;
  align-items: center;
  padding-left: 16px;
`;

const WorkTimeTable = styled.table`
  white-space: pre-line;
  width: 100%;
  border-spacing: 0;

  & tr {
  }

  & th {
    border-bottom: 1px solid ${StyleColor.LIGHT};
    background: ${StyleColor.HOVER};
    width: 40%;
    height: 40px;
    &:first-child {
      height: 52px;
    }
  }

  & td {
    width: 100%;
    border-bottom: 1px solid ${StyleColor.DISABLE};
  }
  & tr:last-child td,
  tr:last-child {
    border-bottom: 0;
  }
`;
