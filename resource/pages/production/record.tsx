import Alert from "components/alert/alert";
import DefaultButton from "components/button/defaultButton";
import PageContainer from "components/container/pageContainer";
import CustomSelector from "components/input/customSelector";
import DefaultRadio from "components/input/defaultRadio";
import LayoutHeader from "components/layout/layoutHeader";
import RecordTable from "components/table/recordTable";
import { StyleColor } from "config/color";
import { RecordDescription, TableFormatType } from "config/constants";
import { inject, observer } from "mobx-react";
import { NextRouter } from "next/router";
import ExcelIcon from "public/images/icons/excel";
import { MouseEvent, useEffect, useRef, useState } from "react";
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
  const [description, setDescription] = useState<string>("");

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

  const handleClickOpenDescription = (event: MouseEvent<HTMLButtonElement>) => {
    const { value } = event.currentTarget;
    let newValue = "";
    let highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) {
      clearTimeout(i);
    }
    Object.keys(RecordDescription).forEach((key) => {
      if (key === value) {
        newValue = RecordDescription[key];
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
    <PageContainer style={{ gap: "16px", position: "relative" }}>
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
            // { title: "품번별", id: TableFormatType.PROGRAM },
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
        <div>
          {/* <Description isOpen={description !== ""}>{description}</Description> */}
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
              color: StyleColor.DARK,
              fontSize: "16px",
            }}
            activeColor={StyleColor.LIGHT}
          />
        </div>
      </FunctionWrap>
      <TableLayout>
        <TablePadding>
          <RecordTable
            header={recordViewModel.tableHeader}
            data={recordViewModel.list}
            recordRef={tableRef}
            filter={recordViewModel.recordModel.filter}
            format={recordViewModel.recordModel.format}
            handleClickOpenDescription={handleClickOpenDescription}
          />
        </TablePadding>
      </TableLayout>
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

export default inject("recordViewModel")(observer(RecordView));

const ButtonText = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const TableLayout = styled.section`
  position: relative;
  overflow: hidden;
  overflow-x: auto;
  background: ${StyleColor.LIGHT};
  padding: 16px;
  border-radius: 8px;
  box-shadow: ${StyleColor.BOXSHADOW};
`;

const TablePadding = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  min-width: 1592px;
`;

const FunctionWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// const Description = styled.div<{ isOpen: boolean }>`
//   z-index: 1000;
//   position: fixed;
//   background: ${StyleColor.LIGHT};
//   opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
//   pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
//   padding: 8px;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   border-radius: 8px;
//   transition: all 0.4s ease;
//   white-space: pre-wrap;
// `;

// const DescriptionBackground = styled.div<{ isOpen: boolean }>`
//   z-index: 999;
//   position: fixed;
//   background: ${StyleColor.DARK}90;
//   opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
//   pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
//   width: 100vw;
//   height: 100vh;
//   top: 0px;
//   left: 0px;
//   cursor: pointer;
//   transition: all 0.4s ease;
// `;

// const RightSideFunction = styled.div`
//   display: flex;
//   gap: 16px;
// `;

const Description = styled.div<{ isOpen: boolean }>`
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  font-size: 12px;
  background: ${StyleColor.LIGHT};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  padding: 8px;
  border-radius: 8px;
  transition: all 0.4s ease;
  white-space: pre-wrap;
`;
