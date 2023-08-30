import { useEffect } from "react";
import PageContainer from "components/container/pageContainer";
import { inject, observer } from "mobx-react";
import ReportViewModel from "src/viewModels/report/report.viewModel";
import ProductDto from "src/dto/report/product.dto";
import styled from "styled-components";
import LayoutHeader from "components/layout/layoutHeader";
import CustomMachineSelector from "components/input/customMachineSelector";
import ColumnReportCard from "components/machine/columnReportCard";

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
        title="생산리포트"
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
  overflow-y: auto;
  overflow-x: hidden;
`;
