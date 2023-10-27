import { StyleColor } from "config/color";
import { TableFormatType } from "config/constants";
import { MouseEventHandler, Ref, useEffect, useState } from "react";
import TableModel from "src/models/table/table.model";
import styled from "styled-components";

interface IProps {
  header: TableModel[];
  data: any[];
  recordRef?: Ref<HTMLTableElement>;
  filter?: string | number;
  format?: number;
  handleClickOpenDescription: MouseEventHandler;
}

export default function RecordTable({
  header,
  data,
  recordRef,
  filter,
  format,
  handleClickOpenDescription,
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
  };

  useEffect(() => {
    filterData();
  }, [filter, data, format]);

  useEffect(() => {
    findMergeCell();
  }, [tableData, format]);

  // 이상데이터 감지
  const getDetectingAnomalousData = (data) => {
    if (data.partCount > data.plainCount * 2) {
      console.log(
        `%c이상데이터 감지 : partCount가 planCount에 비해 너무 높습니다.
${data.mid}
${data.date}
${data.program}
${data.partCount}`,
        "color: #ff0000"
      );
    }
    if (+data.achieve.replace("%", "") > 100) {
      console.log(
        `%c이상데이터 감지 : 달성률이 너무 높습니다.
${data.mid}
${data.date}
${data.program}
${data.achieve}`,
        "color: #ff0000"
      );
    }

    if (+data.uptime.replace("% isNotViewAble", "") >= 100) {
      console.log(
        `%c이상데이터 감지 : 설비가동률이 너무 높습니다.
${data.mid}
${data.date}
${data.program}
${data.uptime.replace(" isNotViewAble", "")}`,
        "color: #ff0000"
      );
    }
    if (+data.tolerance.replace("%", "") > 150) {
      console.log(
        `%c이상데이터 감지 : 예측시간 오차율이 너무 높습니다.
${data.mid}
${data.date}
${data.program}
${data.tolerance}`,
        "color: #ff0000"
      );
    }
  };

  return (
    <Table.Container ref={recordRef}>
      <Table.Head>
        <tr>
          {header.map((head: TableModel, key: number) => {
            return (
              <th
                key={`table_header_${head.title}_${key}`}
                align={head.align}
                style={{ width: `${head.size}%` }}
              >
                {head.title}
                {head.isDescription && (
                  <DescriptionButton
                    onClick={handleClickOpenDescription}
                    value={head.column}
                  >
                    ?
                  </DescriptionButton>
                )}
              </th>
            );
          })}
        </tr>
      </Table.Head>
      <Table.Body>
        {mergedCells.length >= 1 ? (
          tableData.map((item: any, key: number) => {
            getDetectingAnomalousData(item);
            return (
              <tr key={`table_body_rows_${key}`}>
                {header.map((head: TableModel, inkey: number) => {
                  const thisMergeCount = mergedCells[inkey][key];

                  const shoudSkip = head.rowSpan && thisMergeCount === 0;

                  if (shoudSkip || item[head.column] === -1) return;

                  let target = item[head.column];
                  const shouldMerge = head.rowSpan && thisMergeCount > 1;
                  const isAverage = target === "전체" ? 3 : 1;

                  let className: string = "";
                  if (target !== "" && typeof target === "string") {
                    if (
                      target.includes("isNotViewAble") &&
                      format === TableFormatType.ALL
                    ) {
                      className = "is_not_view_able";
                      target = "";
                    } else if (target.includes("isNotViewAble")) {
                      target = target.replace(" isNotViewAble", "");
                    }
                  }

                  if (isAverage === 3) className = className + " is_average";

                  return (
                    <td
                      key={`table_body_row_data_${head.column}_${inkey}`}
                      align={head.align}
                      rowSpan={head.rowSpan && shouldMerge ? thisMergeCount : 1}
                      colSpan={isAverage}
                      className={className}
                      style={{ width: `${head.size}%` }}
                    >
                      {target}
                    </td>
                  );
                })}
              </tr>
            );
          })
        ) : (
          <tr>
            {header.map((head: TableModel, inkey: number) => {
              return (
                <td
                  key={`table_body_row_data_${head.column}_${inkey}`}
                  align={head.align}
                  style={{ width: `${head.size}%` }}
                >
                  -
                </td>
              );
            })}
          </tr>
        )}
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

    & tr {
      height: 48px;
      background: ${StyleColor.EMPHASIS};
      font-size: 14px;
      color: ${StyleColor.DARK};
    }

    & tr th {
      position: relative;
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

    & .is_not_view_able {
      background: ${StyleColor.EMPHASIS};
    }

    & .is_average {
      background: ${StyleColor.EMPHASIS};
    }
  `,
};

const DescriptionButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  border: 0.5px solid ${StyleColor.DISABLE};
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 12px;
  line-height: 16px;
  color: ${StyleColor.DISABLE};
  cursor: pointer;
`;
