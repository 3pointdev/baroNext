import { useEffect } from "react";
import PageContainer from "../../components/container/pageContainer";
import SingleDatePickHeader from "../../components/header/singleDatePickHeader";
import { inject, observer } from "mobx-react";
import ReportViewModel from "../../src/viewModels/report/report.viewModel";
import ProductDto from "../../src/dto/report/product.dto";
import styled from "styled-components";
import ReportCard from "../../components/machine/reportCard";
import Selector from "../../components/input/selector";
import SelectorOption from "../../components/input/selectorOption";
import Masonry from "react-masonry-css";

interface IProps {
  reportViewModel: ReportViewModel;
}

function ReportView(props: IProps) {
  const reportViewModel = props.reportViewModel;

  const breakPointColsObject = {
    default: 3,
    1440: 2,
    820: 1,
  };

  useEffect(() => {
    reportViewModel.InsertProductList();

    return () => {
      reportViewModel.dataReset();
    };
  }, []);

  return (
    <PageContainer style={{ gap: "16px", overflow: "auto" }}>
      <SingleDatePickHeader
        value={reportViewModel.productModel.day}
        onChange={reportViewModel.handleChangeDay}
        onClick={reportViewModel.handleClickDay}
      >
        <Selector
          onChange={reportViewModel.handleChangeFilter}
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%)`,
            backgroundPosition: `calc(100% - 20px) calc(1em + 2px),
    calc(100% - 12px) calc(1em + 2px), calc(100% - 2.5em) 0.5em`,
            width: "182px",
            height: "42px",
          }}
        >
          <>
            <SelectorOption title="전체보기" value={0} selected />
            {reportViewModel.products.map(
              (product: ProductDto, key: number) => {
                return (
                  <SelectorOption
                    key={`filter_options_${product.name}_${key}`}
                    title={`${product.machineNo}. ${product.name}`}
                    value={product.machineNo}
                  />
                );
              }
            )}
          </>
        </Selector>
      </SingleDatePickHeader>
      {reportViewModel.lotList && (
        <ReportCardWrap
          breakpointCols={breakPointColsObject}
          className="report_cards_grid"
          columnClassName="report_cards_column_grid"
        >
          {reportViewModel.products.map((product: ProductDto, key: number) => {
            const isFiltered =
              reportViewModel.filterTarget === 0
                ? false
                : reportViewModel.filterTarget !== +product.machineNo
                ? true
                : false;

            if (!isFiltered)
              return (
                <ReportCard
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

const ReportCardWrap = styled(Masonry)`
  display: flex;
  gap: 16px;
`;
