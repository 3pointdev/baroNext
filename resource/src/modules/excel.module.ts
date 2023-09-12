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

    XLSX.write(excelFile, {
      bookType: fileType,
      bookSST: true,
      type: "base64",
      ignoreEC: false,
    });

    XLSX.writeFileXLSX(excelFile, fileName + fileType);
  }
}

const excelInstance = new ExcelModule();
export default excelInstance;
