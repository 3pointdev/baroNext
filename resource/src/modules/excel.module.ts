import { RefObject } from "react";
import { BookType } from "xlsx";
import XLSXStyle from "xlsx-style";

interface IExcelInfomation {
  targetRef: RefObject<HTMLTableElement>;
  fileName: string;
  fileType: BookType;
  sheetName: string;
  columnWidth?: { [key: string]: number };
  columnStyle?: { [key: string]: string };
}

class ExcelModule {
  public tableToDownload({
    targetRef,
    fileName,
    fileType,
    sheetName,
    columnWidth = {},
    columnStyle,
  }: IExcelInfomation) {
    //   const excelFile = XLSX.utils.table_to_book(targetRef.current, {
    //     sheet: sheetName,
    //     raw: true,
    //   });

    //   excelFile.Sheets[sheetName]["!cols"] = Object.keys(columnWidth).map(
    //     (key: string) => ({
    //       wch: columnWidth[key],
    //     })
    //   );

    //   console.log(excelFile);

    //   for (
    //     let i = 5;
    //     i < Object.keys(excelFile.Sheets[sheetName]).length - 3;
    //     i++
    //   ) {
    //     excelFile.Sheets[sheetName][
    //       Object.keys(excelFile.Sheets[sheetName])[i]
    //     ].s = { alignment: { horizontal: "center" } };
    //   }

    //   XLSX.write(excelFile, {
    //     bookType: fileType,
    //     bookSST: true,
    //     type: "base64",
    //     ignoreEC: false,
    //   });

    //   XLSX.writeFileXLSX(excelFile, fileName + fileType);

    const workbook = XLSXStyle.readFile("template.xlsx"); // 기존 템플릿 파일 불러오기
    const worksheet = workbook.Sheets["Sheet1"]; // 'Sheet1'에 해당하는 워크시트 선택
    const cellStyle = {
      fill: {
        fgColor: { rgb: "FFFF00" }, // 노란색 배경색
      },
    };
    worksheet["A1"].s = cellStyle;
    XLSXStyle.writeFile(workbook, "output.xlsx");
  }
}

const excelInstance = new ExcelModule();
export default excelInstance;
