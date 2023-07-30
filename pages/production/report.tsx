import { useEffect } from "react";
import PageContainer from "../../components/container/pageContainer";
import DatePickHeader from "../../components/header/datePickHeader";
import { inject, observer } from "mobx-react";
import ReportViewModel from "../../src/viewModels/report/report.viewModel";
import ProductDto from "../../src/dto/report/product.dto";
import styled from "styled-components";
import ReportCard from "../../components/machine/reportCard";

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
    <PageContainer style={{ gap: "16px", overflow: "auto" }}>
      <DatePickHeader
        value={reportViewModel.productModel.day}
        onChange={reportViewModel.handleChangeDay}
        onClick={reportViewModel.handleClickDay}
      />
      {reportViewModel.lotList && (
        <ReportCardWrap>
          {reportViewModel.products.map((product: ProductDto, key: number) => {
            return (
              <ReportCard
                data={product}
                lot={reportViewModel.lotList[product.machineNo]}
                active={product.toggle}
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

const ReportCardWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  transition: all 0.4s ease;

  @media screen and (max-width: 1440px) {
    grid-template-columns: 1fr 1fr;
  }
`;
