import {
  faFloppyDisk,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DefaultButton from "components/button/defaultButton";
import DefaultInput from "components/input/defaultInput";
import { ScheduleType, StyleColor } from "config/constants";
import { ChangeEventHandler, MouseEventHandler } from "react";
import ScheduleModel from "src/models/schedule/schedule.model";
import styled from "styled-components";

interface IProps {
  data: ScheduleModel[];
  title: string;
  type: ScheduleType;
  onChangeColumnTitle: ChangeEventHandler;
  onChangeStartTime: ChangeEventHandler;
  onChangeEndTime: ChangeEventHandler;
  onClickAdd: MouseEventHandler;
  onClickSave: MouseEventHandler;
  onClickEdit: MouseEventHandler;
  onClickDelete: MouseEventHandler;
  isCanAdd?: boolean;
}

export default function ScheduleEditer({
  data,
  title,
  type,
  isCanAdd,
  onChangeColumnTitle,
  onChangeStartTime,
  onChangeEndTime,
  onClickAdd,
  onClickSave,
  onClickEdit,
  onClickDelete,
}: IProps) {
  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <ButtonWrap>
          {isCanAdd && (
            <DefaultButton
              title={"추가"}
              style={{ width: "80px", height: "32px" }}
              onClick={onClickAdd}
              value={type}
            />
          )}
        </ButtonWrap>
      </Header>
      <Section.Wrap>
        <Section.Head>
          <tr>
            <th>항목</th>
            <th>시작시간</th>
            <th>종료시간</th>
            <th>수정/저장</th>
            <th>삭제</th>
          </tr>
        </Section.Head>
        <Section.Body>
          {data.map((schedule: ScheduleModel, key: number) => {
            return (
              <tr key={`schedule_edit_${schedule.id}_${key}`}>
                <td>
                  <DefaultInput
                    type="text"
                    value={schedule.columnTitle}
                    style={{
                      height: "20px",
                      width: "80%",
                    }}
                    boxstyle={{ paddingLeft: "8px" }}
                    onChange={onChangeColumnTitle}
                    readOnly={!schedule.isEditMode}
                    placeholder="ex) 야간"
                    name={schedule.id}
                  />
                </td>
                <td>
                  <DefaultInput
                    type="text"
                    value={schedule.startTime}
                    style={{ height: "20px", width: "90%" }}
                    boxstyle={{ paddingLeft: "8px" }}
                    placeholder={schedule.startTimePlaceholder}
                    readOnly={!schedule.isEditMode}
                    onChange={onChangeStartTime}
                    name={schedule.id}
                  />
                </td>
                <td>
                  <DefaultInput
                    type="text"
                    value={schedule.endTime}
                    style={{ height: "20px", width: "90%" }}
                    boxstyle={{ paddingLeft: "8px" }}
                    placeholder={schedule.endTimePlaceholder}
                    readOnly={!schedule.isEditMode}
                    onChange={onChangeEndTime}
                    name={schedule.id}
                  />
                </td>
                <td align="center">
                  {schedule.isEditMode ? (
                    <FontAwesomeIcon
                      className="save"
                      icon={faFloppyDisk}
                      onClick={onClickSave}
                      data-name={schedule.id}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="edit"
                      onClick={onClickEdit}
                      data-name={schedule.id}
                    />
                  )}
                </td>
                <td align="center">
                  <FontAwesomeIcon
                    className="delete"
                    icon={faTrashCan}
                    onClick={onClickDelete}
                    data-name={schedule.id}
                  />
                </td>
              </tr>
            );
          })}
        </Section.Body>
      </Section.Wrap>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2``;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const Section = {
  Wrap: styled.table`
    width: 100%;
    border-spacing: 0;
  `,
  Head: styled.thead`
    background: ${StyleColor.EMPHASIS};
    height: 48px;

    & th {
      text-align: left;
      padding-left: 16px;
    }
    & tr th:first-child {
      width: 16%;
    }

    & tr th:last-child,
    tr th:nth-child(4) {
      width: 4%;
      text-align: center;
      padding: 0;
    }

    & tr th:nth-child(2),
    tr th:nth-child(3) {
      width: 30%;
    }
  `,
  Body: styled.tbody`
    & svg,
    path {
      font-size: 20px;
      cursor: pointer;
    }

    & .delete path {
      color: ${StyleColor.WARNNING};
    }
  `,
};
