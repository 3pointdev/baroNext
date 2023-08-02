import { Ref, useEffect, useState } from "react";
import styled from "styled-components";

export interface ITableHeader {
  title: string;
  column: string;
  align: "left" | "center" | "right" | "justify" | "char" | undefined;
}

interface IProps {
  header: ITableHeader[];
  data: any[];
  recordRef: Ref<HTMLTableElement>;
}

export default function DefaultTable({ header, data, recordRef }: IProps) {
  const [mergedCells, setMergedCells] = useState([]);

  // 연속된 셀들을 찾는 함수 정의
  const findConsecutiveCells = (columnName: string) => {
    const mergedCells: number[] = [];
    let count = 1;
    for (let i = data.length - 1; i > 0; i--) {
      if (data[i][columnName] === data[i - 1][columnName]) {
        count++;
        mergedCells.push(0);
      } else {
        mergedCells.push(count);
        count = 1;
      }
    }
    mergedCells.push(count);
    return mergedCells;
  };

  useEffect(() => {
    const mergedArray = findConsecutiveCells(header[0].column);

    setMergedCells(mergedArray);
  }, [data]);

  if (data.length < 1) return <></>;

  return (
    <Table.Container ref={recordRef}>
      <Table.Head>
        <tr>
          {header.map((head: ITableHeader, key: number) => {
            return (
              <th key={`table_header_${head.title}_${key}`} align={head.align}>
                {head.title}
              </th>
            );
          })}
        </tr>
      </Table.Head>
      <Table.Body>
        {data.map((item: any, key: number) => {
          return (
            <tr key={`table_body_rows_${key}`}>
              {header.map((head: ITableHeader, inkey: number) => {
                const isFirstData = head.column === header[0].column;
                const thisMergeCount =
                  mergedCells[mergedCells.length - 1 - key];
                const shoudSkip = isFirstData && thisMergeCount === 0;

                if (shoudSkip) return;

                const shouldMerge = isFirstData && thisMergeCount > 0;

                return (
                  <td
                    key={`table_body_row_data_${inkey}`}
                    align={head.align}
                    rowSpan={shouldMerge ? thisMergeCount : 1}
                    className={
                      head.column === header[0].column ? "first_child" : ""
                    }
                  >
                    {`${item[head.column]}`}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </Table.Body>
    </Table.Container>
  );
}

const Table = {
  Container: styled.table`
    border-collapse: collapse;
    width: 100%;
    height: 100%;
  `,
  Head: styled.thead`
    position: sticky;
    top: 0;
    z-index: 100;
    & tr {
      height: 48px;
      background: rgb(216, 228, 251);
      font-size: 14px;
      color: black;
    }
    & tr th {
      padding: 0 16px;
    }
  `,
  Body: styled.tbody`
    & tr {
      height: 38px;
      border-bottom: thin solid rgba(0, 0, 0, 0.12);
      font-size: 14px;
      font-weight: 400;
    }

    & tr td {
      padding: 0 16px;
    }

    & tr:last-child {
      border-bottom: 0;
    }

    & tr td.first_child {
      background: rgb(235, 242, 253);
    }
  `,
};
