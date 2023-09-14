import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyleColor } from "config/color";
import ko from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { DatePickerRangeType } from "../../config/constants";

interface IProps {
  start: string;
  end: string;
  onChange: (date: string, type: string) => void;
}

export default function RangeDatePicker({ start, end, onChange }: IProps) {
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
  const getDayName = (date: Date) => {
    return date
      .toLocaleDateString("ko-KR", {
        weekday: "long",
      })
      .substr(0, 1);
  };

  const createDate = (date: Date) => {
    return new Date(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
    );
  };

  const handleStartDate = (date: string) => {
    onChange(date, DatePickerRangeType.START);
  };
  const handleEndDate = (date: string) => {
    onChange(date, DatePickerRangeType.END);
  };

  return (
    <Container>
      <StartCalendarIcon icon={faCalendar} />
      <Picker
        selectsStart
        endDate={new Date(end)}
        dateFormat="yyyy-MM-dd"
        onKeyDown={(e) => e.preventDefault()}
        locale={ko}
        showPopperArrow={false}
        fixedHeight
        selected={new Date(start)}
        onChange={handleStartDate}
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
      <p>~</p>
      <EndCalendarIcon icon={faCalendar} />
      <Picker
        selectsEnd
        startDate={new Date(start)}
        minDate={new Date(start)}
        dateFormat="yyyy-MM-dd"
        onKeyDown={(e) => e.preventDefault()}
        locale={ko}
        showPopperArrow={false}
        fixedHeight
        selected={new Date(end)}
        onChange={handleEndDate}
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
  display: flex;
  gap: 16px;
  align-items: center;
  z-index: 101;

  //달력 Wrapper
  & .react-datepicker__tab-loop {
    z-index: 101;
    position: absolute;

    & .react-datepicker {
      z-index: 101;
      box-shadow: ${StyleColor.BOXSHADOW};
      border: 0;
    }
  }

  //커스텀 Header
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

  //일자별 컬러지정
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

const IconSetting = styled(FontAwesomeIcon)`
  z-index: 101;
  position: absolute;
  top: 50%;
  width: 16px;
  height: 16px;
  font-size: 16px;
  transform: translate(0, -50%);
`;

const StartCalendarIcon = styled(IconSetting)`
  left: 16px;
`;

const EndCalendarIcon = styled(IconSetting)`
  right: 148px;
`;

const Picker = styled(DatePicker)`
  z-index: 101;
  border: 1px solid ${StyleColor.BORDER};
  border-radius: 8px;
  padding: 6px 10px;
  height: 28px;
  width: 160px;

  background: ${StyleColor.LIGHT};

  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  cursor: pointer;
  outline: none;
  caret-color: transparent;

  text-align: right;

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
      color: ${StyleColor.HOVER};
      cursor: default;
    }
  `,
};
