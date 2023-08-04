import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";
import AngleButton from "../button/angleButton";
import DefaultButton from "../button/defaultButton";
import DefaultDatePicker from "../datePicker/defaultDatePicker";
import moment from "moment";
import { DatePickerButtonType } from "../../config/constants";
import RangeDatePicker from "../datePicker/rangeDatePicker";

interface IProps {
  start: string;
  end: string;
  onChange: (date: string, type: string) => void;
  title?: string;
  style?: CSSProperties;
  childrenStyle?: CSSProperties;
  children?:
    | ReactElement
    | ReactElement[]
    | string
    | string[]
    | number
    | number[];
}

export default function RangeDatePickHeader({
  start,
  end,
  onChange,
  title,
  children,
  style,
  childrenStyle,
}: IProps) {
  return (
    <Container style={style}>
      <LeftSide.Wrap>
        <RangeDatePicker start={start} end={end} onChange={onChange} />
      </LeftSide.Wrap>
      {title && <Title>{title}</Title>}
      <RightSide.Wrap style={childrenStyle}>{children}</RightSide.Wrap>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
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
  Wrap: styled.div`
    display: flex;
    gap: 16px;
  `,
};

const Title = styled.h2`
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
`;
