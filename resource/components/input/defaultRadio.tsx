import { ChangeEventHandler } from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  list: RadioList[];
  value: number;
  onChange: ChangeEventHandler;
}

interface RadioList {
  title: string;
  id: number;
}

export default function DefaultRadio({ list, value, onChange }: IProps) {
  return (
    <Container>
      {list.map((option: RadioList) => {
        return (
          <Label
            htmlFor={`radio_button_${option.title}_${option.id}`}
            key={`radio_button_${option.title}_${option.id}`}
          >
            {option.title}
            <Radio
              type="radio"
              value={option.id}
              id={`radio_button_${option.title}_${option.id}`}
              checked={option.id === value}
              onChange={onChange}
            />
          </Label>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Label = styled.label`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;

  white-space: nowrap;
`;

const checkAnimation = keyframes`
0% {
  width: 0px;
  height: 0px;
}
60% {
  width: 14px;
  height: 14px;
}
100% {
  width: 10px;
  height: 10px;
}
`;

const Radio = styled.input`
  vertical-align: middle;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  position: relative;
  border: 1px solid #757575;
  background: #a9a9a9;

  &:checked::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    display: block;
    width: 10px;
    height: 10px;
    border-radius: 6px;

    background: #f9f9f9;
    animation: ${checkAnimation} 0.4s;
  }
`;
