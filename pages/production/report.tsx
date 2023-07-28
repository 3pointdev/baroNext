import { useEffect } from "react";
import PageContainer from "../../components/container/pageContainer";
import DatePickHeader from "../../components/header/datePickHeader";
import MachineViewModel from "../../src/viewModels/machine/machine.viewModel";
import { inject, observer } from "mobx-react";
import ReportViewModel from "../../src/viewModels/report/report.viewModel";
import ReportData from "../../components/machine/reportData";
import ProductDto from "../../src/dto/report/product.dto";
import styled from "styled-components";

interface IProps {
  reportViewModel: ReportViewModel;
}

function ReportView(props: IProps) {
  const reportViewModel = props.reportViewModel;

  useEffect(() => {
    reportViewModel.InsertProductList();

    return () => {};
  }, []);

  return (
    <PageContainer>
      <DatePickHeader
        value={reportViewModel.productModel.day}
        onChange={reportViewModel.handleChangeDay}
        onClick={reportViewModel.handleClickDay}
      />
      {reportViewModel.lotList && (
        <ReportCardWrap>
          {reportViewModel.products.map((product: ProductDto, key: number) => {
            return (
              <ReportData
                data={product}
                lot={reportViewModel.lotList[product.machineNo]}
                key={key}
              />
            );
          })}
        </ReportCardWrap>
      )}
    </PageContainer>
  );
}

export default inject("reportViewModel")(observer(ReportView));

const ReportCardWrap = styled.div``;
