import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyleColor } from "config/color";
import ko from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

interface IProps {
  selected: string;
  onChange: ((date: string) => void) | ((date: string, type: string) => void);
  width?: string;
  height?: string;
}

export default function DefaultDatePicker({
  selected,
  onChange,
  width,
  height,
}: IProps) {
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
        customHeight={height}
        customWidth={width}
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
    box-shadow: ${StyleColor.BOXSHADOW};
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
    color: ${StyleColor.DISABLE};
  }
  & .react-datepicker__day {
    &.saturday {
      color: ${StyleColor.PRIMARY};
    }
    &.sunday {
      color: ${StyleColor.WARNNING};
    }
    &[aria-disabled="true"] {
      opacity: 0.5;
    }
    &.react-datepicker__day--outside-month {
      color: ${StyleColor.BORDER} !important;
    }
  }
`;

const CalendarIcon = styled(FontAwesomeIcon)`
  z-index: 1;
  position: absolute;
  top: 50%;
  left: 16px;
  width: 16px;
  height: 16px;
  font-size: 16px;
  transform: translate(0, -50%);
`;

const Picker = styled(DatePicker)<{
  customHeight: string;
  customWidth: string;
}>`
  z-index: 101;
  border: 1px solid ${StyleColor.BORDER};
  border-radius: 8px;
  padding: 6px 16px;
  height: ${({ customHeight }) => (customHeight ? customHeight : "28px")};
  width: ${({ customWidth }) => (customWidth ? customWidth : "160px")};

  background: ${StyleColor.LIGHT};

  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  cursor: pointer;
  outline: none;
  caret-color: transparent;

  text-align: right;

  transition: all 0.2s ease;

  &:hover {
    background: ${StyleColor.HOVER};
  }
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
    background: none;
    border: 0;
    font-size: 16px;
    cursor: pointer;
    color: ${StyleColor.DARK};
    &:disabled * {
      color: ${StyleColor.BORDER};
      cursor: default;
    }
  `,
};
