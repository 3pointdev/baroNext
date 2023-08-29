import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";
import AngleButton from "../button/angleButton";
import DefaultButton from "../button/defaultButton";
import DefaultDatePicker from "../datePicker/defaultDatePicker";
import moment from "moment";
import { DatePickerButtonType } from "../../config/constants";

interface IProps {
  title: string;
  datePickerType: "single" | "range" | "notUse";
  value: string;
  onChange: (date: string) => void;
  children?:
    | ReactElement
    | ReactElement[]
    | string
    | string[]
    | number
    | number[];
  style?: CSSProperties;
}

export default function LayoutHeader({
  title,
  datePickerType,
  value,
  onChange,
  children,
  style,
}: IProps) {
  return (
    <Container style={style}>
      <LeftSide.Wrap>
        <LeftSide.Title>{title}</LeftSide.Title>
        <DefaultDatePicker selected={value} onChange={onChange} />
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
    gap: 24px;
  `,
  Title: styled.h3``,
};
const RightSide = {
  Wrap: styled.div`
    display: flex;
    gap: 16px;
  `,
};
