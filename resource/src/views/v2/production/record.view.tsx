import { useEffect, useRef } from "react";
import PageContainer from "components/container/pageContainer";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import RecordViewModel from "src/viewModels/record/record.viewModel";
import DefaultTable from "components/table/defaultTable";
import excelModule from "src/modules/excel.module";
import LayoutHeader from "components/layout/layoutHeader";
import DefaultRadio from "components/input/defaultRadio";
import RecordTable, { ITableHeader } from "components/table/recordTable";
import { StyleColor, TableFilterType } from "config/constants";
import DefaultButton from "components/button/defaultButton";
import ExcelIcon from "public/images/icons/excel";
import CustomSelector from "components/input/customSelector";

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
          value={recordViewModel.recordModel.filter}
          list={[
            { title: "전체", id: TableFilterType.ALL },
            { title: "기계별", id: TableFilterType.MACHINE },
            { title: "품번별", id: TableFilterType.PROGRAM },
          ]}
          onChange={recordViewModel.handleChangeFilter}
        />
      </LayoutHeader>
      <TableLayout>
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

            position: "absolute",
            right: "16px",
            top: "16px",
          }}
          activeColor="#fff"
        />
        {recordViewModel.recordModel.filter !== TableFilterType.ALL && (
          <CustomSelector
            options={[
              { title: "000", id: 1 },
              { title: "000", id: 1 },
              { title: "000", id: 1 },
            ]}
            onClick={null}
            // defaultValue={}
            defaultTitle={"selector"}
            value={""}
            style={{
              width: "400px",

              position: "absolute",
              left: "16px",
              top: "16px",
            }}
          />
        )}
        <TablePadding>
          <RecordTable
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
  padding-top: 88px;
`;

const TablePadding = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  // border: 1px solid ${StyleColor.DARK};
`;
