import { MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";
import AngleButton from "../button/angleButton";
import DefaultButton from "../button/defaultButton";
import DefaultDatePicker from "../datePicker/defaultDatePicker";
import moment from "moment";
import { DatePickerButtonType } from "../../config/constants";

interface IProps {
  value: string;
  onChange: (date: string) => void;
  onClick: MouseEventHandler;
  children?:
    | ReactElement
    | ReactElement[]
    | string
    | string[]
    | number
    | number[];
}

export default function DatePickHeader({
  value,
  onChange,
  onClick,
  children,
}: IProps) {
  const isToday = moment(new Date()).format("YYYY-MM-DD") !== value;
  return (
    <Container>
      <LeftSide.Wrap>
        <AngleButton
          onClick={onClick}
          forLeft
          value={DatePickerButtonType.PREV}
        />
        <span>{value}</span>
        <AngleButton onClick={onClick} value={DatePickerButtonType.NEXT} />
        <DefaultButton
          title="오늘"
          isActive={isToday}
          style={{
            color: "#000",
            width: "64px",
            height: "36px",
            boxShadow: "none",
            fontSize: "16px",
          }}
          dynamic
          disableColor="#63657840"
          activeColor="#fff"
          onClick={onClick}
          value={DatePickerButtonType.TODAY}
        />
      </LeftSide.Wrap>
      <RightSide.Wrap>
        {children}
        <DefaultDatePicker selected={value} onChange={onChange} />
      </RightSide.Wrap>
    </Container>
  );
}

const Container = styled.div`
  width: calc(100% - 32px);
  background: #fff;
  box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
  border-radius: 8px;
  height: 70px;
  padding: 0 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftSide = {
  Wrap: styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    gap: 8px;

    & span {
      text-align: center;
      width: 110px;
      font-size: 20px;
      font-weight: 600;
      color: #4c4e64;
    }
  `,
};
const RightSide = {
  Wrap: styled.div``,
};
