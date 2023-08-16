import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import ko from "date-fns/locale/ko";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { ChangeEventHandler } from "react";

interface IProps {
  selected: string;
  onChange: (date: string) => void;
}

export default function DefaultDatePicker({ selected, onChange }: IProps) {
  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const getDayName = (date) => {
    return date
      .toLocaleDateString("ko-KR", {
        weekday: "long",
      })
      .substr(0, 1);
  };

  const createDate = (date) => {
    return new Date(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    );
  };

  return (
    <Container>
      <CalendarIcon icon={faCalendar} />
      <Picker
        dateFormat="yyyy-MM-dd"
        onKeyDown={(e) => e.preventDefault()}
        locale={ko}
        showPopperArrow={false}
        fixedHeight
        selected={new Date(selected)}
        onChange={onChange}
        maxDate={new Date()}
        dayClassName={(date) => {
          const dayName = getDayName(createDate(date));
          return dayName === "토"
            ? "saturday"
            : dayName === "일"
            ? "sunday"
            : "";
        }}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <Calendar.Header>
            <Calendar.Button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </Calendar.Button>
            <div className="custom-month">
              {date.getFullYear()}년 {months[date.getMonth()]}
            </div>
            <Calendar.Button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </Calendar.Button>
          </Calendar.Header>
        )}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  & .react-datepicker {
    box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
    border: 0;
  }
  & .react-datepicker__header {
    background: none;
    border: 0;
    height: 52px;

    & .react-datepicker__day-names {
      height: 36px;
      display: flex;
      align-items: end;
      justify-content: center;
    }
  }
  & .react-datepicker__day-names * {
    color: gray;
  }
  & .react-datepicker__day {
    &.saturday {
      color: blue;
    }
    &.sunday {
      color: red;
    }
    &[aria-disabled="true"] {
      opacity: 0.5;
    }
    &.react-datepicker__day--outside-month {
      color: lightgray !important;
    }
  }
`;

const CalendarIcon = styled(FontAwesomeIcon)`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 8px;
  width: 16px;
  height: 16px;
  font-size: 16px;
  transform: translate(0, -50%);
`;

const Picker = styled(DatePicker)`
  z-index: 101;
  border: 1px solid #d8d8dd;
  border-radius: 8px;
  padding: 6px 10px;
  height: 28px;
  width: 160px;

  background: #f2f2f2;

  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  cursor: pointer;
  outline: none;
  caret-color: transparent;

  text-align: right;
`;

const Calendar = {
  Header: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 16px;
    height: 32px;
  `,
  Button: styled.button`
    background: 0;
    border: 0;
    font-size: 16px;
    cursor: pointer;
    &:disabled * {
      color: lightgray;
      cursor: default;
    }
  `,
};
