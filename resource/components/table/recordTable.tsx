import { StyleColor } from "config/constants";
import { ReactElement, Ref, useEffect, useState } from "react";
import styled from "styled-components";

export interface ITableHeader {
  title: string;
  column: string;
  align: "left" | "center" | "right" | "justify" | "char" | undefined;
  size?: string;
  rowSpan?: boolean;
}

interface IProps {
  header: ITableHeader[];
  data: any[];
  recordRef?: Ref<HTMLTableElement>;
}

export default function RecordTable({ header, data, recordRef }: IProps) {
  const [mergedCells, setMergedCells] = useState([]);

  useEffect(() => {
    // 연속된 셀들을 찾는 함수 정의
    if (data.length > 0) {
      const merged = header.map((column) => {
        const mergedCells: number[] = [];
        let count = 1;
        for (let i = 0; i < data.length - 1; i++) {
          if (
            data[i + 1][column.column] &&
            data[i][column.column] === data[i + 1][column.column]
          ) {
            mergedCells.push(0);
            count++;
          } else {
            mergedCells.push(count);
            count = 1;
          }
        }
        mergedCells.push(count);

        return mergedCells.reverse();
      });
      setMergedCells(merged);
    }
  }, [data, header]);

  if (mergedCells.length < 1) return <></>;
  return (
    <Table.Container ref={recordRef}>
      <Table.Head>
        <tr>
          {header.map((head: ITableHeader, key: number) => {
            return (
              <th
                key={`table_header_${head.title}_${key}`}
                align={head.align}
                style={{ width: `${head.size}%` }}
              >
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
                const thisMergeCount = mergedCells[inkey][key];

                const shoudSkip = head.rowSpan && thisMergeCount === 0;
                if (shoudSkip) return;

                const shouldMerge = head.rowSpan && thisMergeCount > 0;

                return (
                  <td
                    key={`table_body_row_data_${head.column}_${inkey}`}
                    align={head.align}
                    rowSpan={head.rowSpan && shouldMerge ? thisMergeCount : 1}
                    style={{ width: `${head.size}%` }}
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
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    height: 100%;
  `,
  Head: styled.thead`
    position: sticky;
    white-space: pre-line;
    top: 0;
    z-index: 10;

    & tr {
      height: 48px;
      background: rgb(216, 228, 251);
      font-size: 14px;
      color: black;
    }

    & tr th {
      border: 1px solid ${StyleColor.DARK};
      border-right: 0;
      padding: 0 16px;

      &:last-child {
        border-right: 1px solid ${StyleColor.DARK};
      }
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
      border-left: 1px solid ${StyleColor.DARK};
      border-right: 0;
      border-bottom: 1px solid ${StyleColor.DARK};
      &:last-child {
        border-right: 1px solid ${StyleColor.DARK};
      }
    }
    & tr:first-child td {
      border-top: 0;
    }
  `,
};
