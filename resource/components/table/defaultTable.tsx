import {
  faArrowDown,
  faArrowUp,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SortType, StyleColor } from "config/constants";
import { MouseEventHandler, Ref, useEffect, useState } from "react";
import TableModel from "src/models/table/table.model";
import styled from "styled-components";

interface IProps {
  header: TableModel[];
  data: any[];
  recordRef?: Ref<HTMLTableElement>;
  isRowSpan?: boolean;
  resultCount?: string | string[];
  onClickSort?: MouseEventHandler;
}

export default function DefaultTable({
  header,
  data,
  recordRef,
  isRowSpan = true,
  resultCount,
  onClickSort,
}: IProps) {
  const [mergedCells, setMergedCells] = useState([]);

  useEffect(() => {
    if (isRowSpan) {
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

      const mergedArray = findConsecutiveCells(header[0].column);
      setMergedCells(mergedArray);
    }
  }, [isRowSpan, data, header]);

  if (data.length < 1) return <></>;

  return (
    <Table.Container ref={recordRef}>
      <Table.Head>
        <tr>
          {header.map((head: TableModel, key: number) => {
            return (
              <th
                key={`table_header_${head.title}_${key}`}
                align={head.align}
                style={{
                  width: head.size,
                  cursor: head.isSort ? "pointer" : "",
                }}
                onClick={head.isSort ? onClickSort : () => {}}
                data-id={key}
              >
                <span>{head.title}</span>
                {head.isSort && head.sortState === SortType.DESCENDING ? (
                  <FontAwesomeIcon icon={faArrowDown} />
                ) : head.isSort && head.sortState === SortType.ASCENDING ? (
                  <FontAwesomeIcon icon={faArrowUp} />
                ) : (
                  head.isSort && <FontAwesomeIcon icon={faMinus} />
                )}
              </th>
            );
          })}
        </tr>
        {resultCount && (
          <ChildrenWrap>
            <td>{resultCount}</td>
          </ChildrenWrap>
        )}
      </Table.Head>
      <Table.Body>
        {data.map((item: any, key: number) => {
          return (
            <tr key={`table_body_rows_${key}`}>
              {header.map((head: TableModel, inkey: number) => {
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
                    rowSpan={isRowSpan && shouldMerge ? thisMergeCount : 1}
                    className={
                      head.column === header[0].column ? "first_child" : ""
                    }
                    style={{ width: head.size }}
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
    z-index: 10;

    & tr {
      height: 48px;
      background: ${StyleColor.EMPHASIS};
      font-size: 14px;
      color: black;
    }

    & tr th {
      padding: 0 16px;
    }

    & tr th span {
      margin-right: 8px;
    }
  `,
  Body: styled.tbody`
    & tr {
      height: 38px;
      border-bottom: thin solid ${StyleColor.HOVER};
      font-size: 14px;
      font-weight: 400;

      &:hover {
        background: ${StyleColor.BRIGHTEMPHASIS};
        font-weight: 600;

        & td.first_child {
          font-weight: 400;
        }
      }
    }

    & tr td {
      padding: 0 16px;
    }

    & tr:last-child {
      border-bottom: 0;
    }

    & tr td.first_child {
      background: ${StyleColor.BRIGHTEMPHASIS};
    }
  `,
};

const ChildrenWrap = styled.tr`
  background: none !important;
  position: absolute;
  right: 16px;
  top: 4px;
  z-index: 111;
  font-weight: 600;
  font-size: 16px;
  line-height: 42px;
`;
