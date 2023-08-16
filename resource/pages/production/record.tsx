import { useEffect, useRef } from "react";
import PageContainer from "../../components/container/pageContainer";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import RecordViewModel from "../../src/viewModels/record/record.viewModel";
import RangeDatePickHeader from "../../components/header/rangeDatePickHeader";
import DefaultButton from "../../components/button/defaultButton";
import ExcelIcon from "../../public/images/icons/excel";
import DefaultTable from "../../components/table/defaultTable";
import excelModule from "../../src/modules/excel.module";

interface IProps {
  recordViewModel: RecordViewModel;
}

function RecordView(props: IProps) {
  const recordViewModel = props.recordViewModel;
  const tableRef = useRef(null);

  useEffect(() => {
    recordViewModel.getList();
    return () => {};
  }, []);

  const handleDownloadExcel = () => {
    excelModule.tableToDownload({
      targetRef: tableRef,
      fileName: "productionRecord",
      fileType: "xlsx",
      sheetName: `${recordViewModel.recordModel.startDay} ~ ${recordViewModel.recordModel.endDay}`,
      columnWidth: { A: 24, B: 48, C: 24 },
    });
  };

  return (
    <PageContainer style={{ gap: "16px" }}>
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
          onClick={handleDownloadExcel}
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
      <TableLayout>
        <TablePadding>
          <DefaultTable
            header={recordViewModel.tableHeader}
            data={recordViewModel.list}
            recordRef={tableRef}
          />
        </TablePadding>
      </TableLayout>
    </PageContainer>
  );
}

export default inject("recordViewModel")(observer(RecordView));

const ButtonText = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TableLayout = styled.section`
  overflow: hidden;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
`;

const TablePadding = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
`;
