import { CSSProperties, ChangeEventHandler, ReactElement } from "react";
import styled from "styled-components";

interface IProps {
  children: ReactElement | ReactElement[];
  onChange: ChangeEventHandler;
  style?: CSSProperties;
  defaultValue?: string | number;
}

export default function Selector({
  children,
  onChange,
  style,
  defaultValue,
}: IProps) {
  return (
    <SelectWrap onChange={onChange} style={style} defaultValue={defaultValue}>
      {children}
    </SelectWrap>
  );
}

const SelectWrap = styled.select`
  height: 56px;
  width: 100%;
  padding: 8px 10px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid #d8d8dd !important;
  border-radius: 8px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: #6e6e6e;
  flex-shrink: 0;
  cursor: pointer;

  background: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 6px),
    calc(100% - 12px) calc(1em + 6px), calc(100% - 2.5em) 0.5em;
  background-size: 8px 8px, 8px 8px, 1px 2.4em;
  background-repeat: no-repeat;

  &::-ms-expand {
    display: none;
  }

  &:hover {
  }
`;
