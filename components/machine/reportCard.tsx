import styled from "styled-components";
import ProductDto from "../../src/dto/report/product.dto";
import { ILotData } from "../../src/viewModels/report/report.viewModel";
import ProductDataDto from "../../src/dto/report/productData.dto";
import DefaultButton from "../button/defaultButton";
import timeModule from "../../src/modules/time.module";

interface IProps {
  data: ProductDto;
  lot: ILotData;
  active: number;
}

export default function ReportCard({ data, lot, active }: IProps) {
  console.log(active);
  return (
    <Container>
      <Title.Wrap>
        <Title.MachineNumber>{data.machineNo}</Title.MachineNumber>
        <Title.MachineName>{data.name}</Title.MachineName>
      </Title.Wrap>
      <Layout>
        <LayoutTitle>오늘의 조업시간</LayoutTitle>
        <p>{`시작시간 : ${data.data[0].start}`}</p>
        <p>{`종료시간 : ${data.data[data.data.length - 1].end}`}</p>
      </Layout>
      <Layout>
        <LayoutTitle>LOT 변경</LayoutTitle>
        {data.data.map((settingData: ProductDataDto, key: number) => {
          const isNotFirst = key !== 0;
          return (
            <>
              {isNotFirst && (
                <LotChange.Item key={`change_lot_time_${key}`}>
                  <LotChange.Program>세팅변경 시간</LotChange.Program>
                  <LotChange.Time>{`${data.data[key - 1].end}\n~${
                    settingData.start
                  }`}</LotChange.Time>
                </LotChange.Item>
              )}
              <LotChange.Item key={`lot_item_${key}`}>
                <LotChange.Program>{settingData.program}</LotChange.Program>
                <LotChange.Time>{`${settingData.start}\n~${settingData.end}`}</LotChange.Time>
              </LotChange.Item>
            </>
          );
        })}
      </Layout>
      <Layout>
        <ManageCycleTime.ButtonWrap>
          {data.data.map((settingData: ProductDataDto, key: number) => {
            return (
              <DefaultButton
                title={settingData.program.split("(")[0]}
                onClick={() => {}}
                isActive={active === key}
                dynamic
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
          <ManageCycleTime.Time>
            {timeModule.secToMMSS(
              data.data[active].active + data.data[active].idle
            )}
          </ManageCycleTime.Time>
          <ManageCycleTime.Title>실 Cycle Time</ManageCycleTime.Title>
        </ManageCycleTime.CycleMonitor>
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  height: 980px;
  padding: 8px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Layout = styled.div`
  box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  & p {
    font-weight: 400;
  }
`;

const LayoutTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
`;

const Title = {
  Wrap: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  MachineNumber: styled.p`
    width: 32px;
    height: 32px;
    background: #6ebd33;
    color: #fff;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    text-align: center;
    border-radius: 4px;
  `,
  MachineName: styled.p`
    padding-top: 6px;
    font-size: 28px;
    font-weight: 600;
    line-height: 32px;
  `,
};

const LotChange = {
  Item: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    & * {
      color: #4c4e64;
      word-break: break-word;
    }
  `,
  Program: styled.p`
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
  CycleMonitor: styled.div``,
  Time: styled.p`
    font-size: 40px;
    font-weight: 600;
    line-height: 1;
  `,
  Title: styled.p`
    font-size: 16px;
    font-weight: 700;
    line-height: 1;
  `,
};
