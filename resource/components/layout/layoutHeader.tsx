import RangeDatePicker from "components/datePicker/rangeDatePicker";
import { StyleColor } from "config/color";
import { CSSProperties, ReactElement } from "react";
import styled from "styled-components";
import DefaultDatePicker from "../datePicker/defaultDatePicker";

interface IProps {
  title: string;
  datePickerType: "single" | "range" | "notUse";
  start?: string;
  end?: string;
  value?: string;
  onChange: ((date: string) => void) | ((date: string, type: string) => void);
  children?:
    | ReactElement
    | ReactElement[]
    | string
    | string[]
    | number
    | number[];
  style?: CSSProperties;
  useToday?: boolean;
}

export default function LayoutHeader({
  title,
  datePickerType,
  value,
  onChange,
  children,
  style,
  start,
  end,
  useToday = false,
}: IProps) {
  return (
    <Container style={style}>
      <LeftSide.Wrap>
        <LeftSide.Title>{title}</LeftSide.Title>
        {datePickerType === "single" ? (
          <DefaultDatePicker
            selected={value}
            onChange={onChange}
            useToday={useToday}
          />
        ) : datePickerType === "range" ? (
          <RangeDatePicker
            start={start}
            end={end}
            onChange={onChange}
            useToday={useToday}
          />
        ) : (
          <></>
        )}
      </LeftSide.Wrap>
      <RightSide.Wrap>{children}</RightSide.Wrap>
    </Container>
  );
}

const Container = styled.div`
  position: sticky;
  top: 0px;
  z-index: 11;
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
    gap: 24px;
  `,
  Title: styled.h3`
    white-space: nowrap;
    font-size: 24px;
    line-height: 1.5;
    font-weight: 600;
  `,
};
const RightSide = {
  Wrap: styled.div`
    display: flex;
    gap: 16px;
  `,
};
