import { RefObject } from "react";
import XLSX, { BookType } from "xlsx";

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
    const excelFile = XLSX.utils.table_to_book(targetRef.current, {
      sheet: sheetName,
      raw: true,
    });
    excelFile.Sheets[sheetName]["!cols"] = Object.keys(columnWidth).map(
      (key: string) => ({
        wch: columnWidth[key],
      })
    );

    //열에 일괄 색상입히기 (기능확인 중)

    // const columnRange = XLSX.utils.decode_range(
    //   excelFile.Sheets[sheetName]["!ref"]
    // );
    // for (let row = columnRange.s.r; row <= columnRange.e.r; row++) {
    //   const cellAddress = XLSX.utils.encode_cell({ r: row, c: columnIndex });
    //   excelFile.Sheets[sheetName][cellAddress].s = {
    //     fill: {
    //       patternType: "solid",
    //       bgColor: { rgb: "111111" },
    //       fgColor: { rgb: "111111" },
    //     },
    //   };
    // }

    XLSX.write(excelFile, {
      bookType: fileType,
      bookSST: true,
      type: "base64",
      ignoreEC: false,
    });
    XLSX.writeFile(excelFile, fileName + fileType);
  }
}

const excelInstance = new ExcelModule();
export default excelInstance;
