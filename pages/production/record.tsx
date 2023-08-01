import { useEffect } from "react";
import PageContainer from "../../components/container/pageContainer";
import { inject, observer } from "mobx-react";
import ReportViewModel from "../../src/viewModels/report/report.viewModel";
import styled from "styled-components";
import DatePickHeader from "../../components/header/singleDatePickHeader";
import RecordViewModel from "../../src/viewModels/record/record.viewModel";
import RangeDatePickHeader from "../../components/header/rangeDatePickHeader";
import DefaultButton from "../../components/button/defaultButton";
import ExcelIcon from "../../public/images/icons/excel";
import DefaultTable from "../../components/table/defaultTable";

interface IProps {
  recordViewModel: RecordViewModel;
}

function RecordView(props: IProps) {
  const recordViewModel = props.recordViewModel;

  useEffect(() => {
    recordViewModel.getList();
    return () => {};
  }, []);

  return (
    <PageContainer style={{ gap: "16px", overflow: "auto" }}>
      <RangeDatePickHeader
        start={recordViewModel.recordModel.startDay}
        end={recordViewModel.recordModel.endDay}
        onChange={recordViewModel.handleChangeDay}
        title="생산이력"
      >
        <DefaultButton
          title={
            <ButtonText>
              <ExcelIcon size={18} />
              다운로드
            </ButtonText>
          }
          onClick={() => {}}
          style={{
            width: "auto",
            padding: "0 8px",
            border: "0",
            color: "#000",
            fontSize: "16px",
          }}
          activeColor="#E0E0E0"
        />
      </RangeDatePickHeader>
      <DefaultTable
        header={recordViewModel.tableHeader}
        data={recordViewModel.tableData}
      />
    </PageContainer>
  );
}

export default inject("recordViewModel")(observer(RecordView));

const ButtonText = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
`;
