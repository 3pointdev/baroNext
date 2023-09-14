import { StyleColor } from "config/color";
import dayjs from "dayjs";
import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";
import { DatePickerButtonType } from "../../config/constants";
import AngleButton from "../button/angleButton";

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
  style?: CSSProperties;
}

export default function DayTraverseHeader({
  value,
  onChange,
  onClick,
  children,
  style,
}: IProps) {
  const isToday = dayjs().format("YYYY-MM-DD") === value;
  return (
    <Container style={style}>
      <LeftSide.Wrap>
        <AngleButton
          onClick={onClick}
          forLeft
          value={DatePickerButtonType.PREV}
        />
        <AngleButton
          onClick={onClick}
          value={DatePickerButtonType.NEXT}
          disable={isToday}
        />
        <span>{value}</span>
      </LeftSide.Wrap>
      <RightSide.Wrap>{children}</RightSide.Wrap>
    </Container>
  );
}

const Container = styled.div`
  flex-shrink: 0;
  width: calc(100% - 32px);
  background: ${StyleColor.LIGHT};
  box-shadow: ${StyleColor.BOXSHADOW};
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
      color: ${StyleColor.DARK};
      white-space: nowrap;
    }
  `,
};
const RightSide = {
  Wrap: styled.div`
    display: flex;
    gap: 16px;
  `,
};
