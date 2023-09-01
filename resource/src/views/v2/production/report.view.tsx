import PageContainer from "components/container/pageContainer";
import CustomMachineSelector from "components/input/customMachineSelector";
import LayoutHeader from "components/layout/layoutHeader";
import ColumnReportCard from "components/machine/columnReportCard";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import ProductDto from "src/dto/report/product.dto";
import ReportViewModel from "src/viewModels/report/report.viewModel";
import styled from "styled-components";

interface IProps {
  reportViewModel: ReportViewModel;
}

function ReportView(props: IProps) {
  const reportViewModel = props.reportViewModel;

  useEffect(() => {
    reportViewModel.InsertProductList();

    return () => {
      reportViewModel.dataReset();
    };
  }, []);

  return (
    <PageContainer style={{ gap: "16px", overflow: "auto" }}>
      <LayoutHeader
        title="생산분석"
        datePickerType="single"
        value={reportViewModel.productModel.day}
        onChange={reportViewModel.handleChangeDay}
      >
        <CustomMachineSelector
          onClick={reportViewModel.handleClickFilter}
          options={reportViewModel.products}
          defaultTitle="전체보기"
          defaultValue={0}
          value={reportViewModel.filterTarget}
        />
      </LayoutHeader>
      {reportViewModel.lotList && (
        <ReportCardWrap>
          {reportViewModel.products.map((product: ProductDto, key: number) => {
            const isFiltered =
              reportViewModel.filterTarget === 0
                ? false
                : reportViewModel.filterTarget !== +product.machineNo
                ? true
                : false;

            if (!isFiltered)
              return (
                <ColumnReportCard
                  data={product}
                  dataIndex={key}
                  lot={reportViewModel.lotList[product.machineNo]}
                  onClickLotToggle={reportViewModel.handleClickLotToggle}
                  active={product.toggle}
                  key={`report_card_${product.name}_${key}`}
                />
              );
          })}
        </ReportCardWrap>
      )}
    </PageContainer>
  );
}

export default inject("reportViewModel")(observer(ReportView));

const ReportCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  overflow-y: scroll;
  min-width: 1150px;
  max-width: 100%;
`;
