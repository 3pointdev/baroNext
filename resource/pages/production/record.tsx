import DefaultButton from "components/button/defaultButton";
import PageContainer from "components/container/pageContainer";
import CustomSelector from "components/input/customSelector";
import DefaultRadio from "components/input/defaultRadio";
import LayoutHeader from "components/layout/layoutHeader";
import RecordTable from "components/table/recordTable";
import { TableFormatType } from "config/constants";
import { inject, observer } from "mobx-react";
import { NextRouter } from "next/router";
import ExcelIcon from "public/images/icons/excel";
import { useEffect, useRef } from "react";
import excelModule from "src/modules/excel.module";
import RecordViewModel from "src/viewModels/record/record.viewModel";
import styled from "styled-components";

interface IProps {
  recordViewModel: RecordViewModel;
  router: NextRouter;
}

function RecordView(props: IProps) {
  const recordViewModel = props.recordViewModel;
  const tableRef = useRef(null);

  useEffect(() => {
    recordViewModel.getList();
    return () => {};
  }, []);

  const handleDownloadExcel = () => {
    let widthObject: { [key: string]: number } = {};

    for (let i = 0; i < recordViewModel.tableHeader.length; i++) {
      const target = recordViewModel.tableHeader[i];
      const key = String.fromCharCode(i + 65);
      const width = (+target.size / 80) * 100;

      widthObject[key] = width;
    }

    excelModule.tableToDownload({
      targetRef: tableRef,
      fileName: "productionRecord.",
      fileType: "xlsx",
      sheetName: `${recordViewModel.recordModel.startDay} ~ ${recordViewModel.recordModel.endDay}`,
      columnWidth: widthObject,
    });
  };

  return (
    <PageContainer style={{ gap: "16px" }}>
      <LayoutHeader
        start={recordViewModel.recordModel.startDay}
        end={recordViewModel.recordModel.endDay}
        onChange={recordViewModel.handleChangeDay}
        datePickerType="range"
        title="생산이력"
      >
        <DefaultRadio
          value={recordViewModel.recordModel.format}
          list={[
            { title: "전체", id: TableFormatType.ALL },
            { title: "기계별", id: TableFormatType.MACHINE },
            { title: "품번별", id: TableFormatType.PROGRAM },
          ]}
          onChange={recordViewModel.handleChangeTableFormat}
        />
      </LayoutHeader>
      <FunctionWrap>
        {recordViewModel.recordModel.format !== TableFormatType.ALL ? (
          <CustomSelector
            options={recordViewModel.dataFilter}
            onClick={recordViewModel.handleClickFilter}
            defaultValue={"all"}
            defaultTitle={"전체보기"}
            value={recordViewModel.recordModel.filter}
            style={{
              width: "400px",
            }}
          />
        ) : (
          <div></div>
        )}
        <DefaultButton
          title={
            <ButtonText>
              <ExcelIcon size={18} />
              다운로드
            </ButtonText>
          }
          onClick={handleDownloadExcel}
          style={{
            width: "120px",
            height: "56px",
            padding: "0 8px",
            border: "0",
            color: "#000",
            fontSize: "16px",
          }}
          activeColor="#fff"
        />
      </FunctionWrap>
      <TableLayout>
        <TablePadding>
          <RecordTable
            header={recordViewModel.tableHeader}
            data={recordViewModel.list}
            recordRef={tableRef}
            filter={recordViewModel.recordModel.filter}
            format={recordViewModel.recordModel.format}
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
  justify-content: center;
  gap: 8px;
`;

const TableLayout = styled.section`
  z-index: 10;
  position: relative;
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

const FunctionWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
