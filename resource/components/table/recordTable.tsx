import { StyleColor, TableFormatType } from "config/constants";
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
  filter?: string | number;
  format?: number;
}

export default function RecordTable({
  header,
  data,
  recordRef,
  filter,
  format,
}: IProps) {
  const [mergedCells, setMergedCells] = useState([]);
  const [tableData, setTableData] = useState([]);

  const findMergeCell = () => {
    if (tableData.length < 1) return false;
    const merged = header.map((column) => {
      const merginsArray: number[] = [];
      let count = 1;
      for (let i = tableData.length - 1; i >= 0; i--) {
        const target = tableData[i];
        const nextData = tableData[i + 1];

        if (nextData && target[column.column] === nextData[column.column]) {
          merginsArray.push(0);
          count++;
        } else {
          merginsArray.push(count);
          count = 1;
        }
      }
      merginsArray.push(count);

      return merginsArray.reverse();
    });
    console.log(merged);
    setMergedCells(merged);
  };

  const filterData = async () => {
    switch (format) {
      case TableFormatType.MACHINE:
        if (filter === "all") {
          setTableData(data);
        } else {
          setTableData(data.filter((column) => column.mid === filter));
        }
        break;

      case TableFormatType.PROGRAM:
        if (filter === "all") {
          setTableData(data);
        } else {
          setTableData(data.filter((column) => column.program === filter));
        }
        break;

      default:
        setTableData(data);
        break;
    }
    return true;
  };

  useEffect(() => {
    filterData();
  }, [filter, data, format]);

  useEffect(() => {
    findMergeCell();
  }, [tableData, format]);

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
        {tableData.map((item: any, key: number) => {
          return (
            <tr key={`table_body_rows_${key}`}>
              {header.map((head: ITableHeader, inkey: number) => {
                const thisMergeCount = mergedCells[inkey][key];

                const shoudSkip = head.rowSpan && thisMergeCount === 0;
                if (shoudSkip || item[head.column] === -1) return;

                const shouldMerge = head.rowSpan && thisMergeCount > 0;
                const isAverage = item[head.column] === "전체" ? 3 : 1;
                return (
                  <td
                    key={`table_body_row_data_${head.column}_${inkey}`}
                    align={head.align}
                    rowSpan={head.rowSpan && shouldMerge ? thisMergeCount : 1}
                    colSpan={isAverage}
                    className={isAverage === 3 ? "is_average" : ""}
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
      background: ${StyleColor.EMPHASIS};
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

    & .is_average {
      background: ${StyleColor.EMPHASIS};
    }
  `,
};
