import Alert from "components/alert/alert";
import PageContainer from "components/container/pageContainer";
import CustomMachineSelector from "components/input/customMachineSelector";
import CardLayout from "components/layout/cardLayout";
import LayoutHeader from "components/layout/layoutHeader";
import RenewReportCard from "components/machine/renewReportCard";
import { StyleColor } from "config/color";
import { ReportDescription } from "config/constants";
import { inject, observer } from "mobx-react";
import { NextRouter } from "next/router";
import { MouseEvent, useEffect, useState } from "react";
import ProductDto from "src/dto/report/product.dto";
import ReportViewModel from "src/viewModels/report/report.viewModel";
import styled from "styled-components";
interface IProps {
  reportViewModel: ReportViewModel;
  router: NextRouter;
}

function ReportView(props: IProps) {
  const reportViewModel = props.reportViewModel;
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    reportViewModel.InsertProductList();

    return () => {
      reportViewModel.dataReset();
    };
  }, []);

  const handleClickOpenDescription = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    let newValue = "";
    let highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    Object.keys(ReportDescription).forEach((key) => {
      if (key === value) {
        newValue = ReportDescription[key];
      }
    });

    setDescription("");

    setTimeout(() => {
      setDescription(newValue);
    }, 10);

    setTimeout(() => {
      setDescription("");
    }, (newValue.length / 5) * 1000);
  };

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
      {reportViewModel.products.length > 0 ? (
        <ReportCardWrap>
          {reportViewModel.products.map((product: ProductDto, key: number) => {
            if (
              reportViewModel.filterTarget === 0 ||
              reportViewModel.filterTarget === +product.mkey
            )
              return (
                <RenewReportCard
                  data={product}
                  handleClickOpenDescription={handleClickOpenDescription}
                  key={`report_card_${product.mid}_${key}`}
                />
              );
              // return (
              //   <ColumnReportCard
              //     data={product}
              //     handleClickOpenDescription={handleClickOpenDescription}
              //     key={`report_card_${product.mid}_${key}`}
              //   />
              // );
          })}
        </ReportCardWrap>
      ) : (
        <ReportCardWrap>
          <CardLayout>해당 날짜에 기록된 생산이 없습니다.</CardLayout>
        </ReportCardWrap>
      )}
      <Alert
        isPositive={true}
        isActive={description !== ""}
        title={description}
        sec={description.length / 5}
        fontColor={StyleColor.DARK}
        background={StyleColor.LIGHT}
        style={{ border: `2px solid ${StyleColor.DARK}` }}
      />
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
