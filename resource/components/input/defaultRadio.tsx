import { ChangeEventHandler } from "react";
import styled from "styled-components";

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

const Container = styled.div``;

const Label = styled.label``;

const Radio = styled.input`
  vertical-align: middle;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  position: relative;
  border: 1px solid #757575;
  background: #a9a9a9;

  &::after {
    width: 0px;
    height: 0px;
    transition: all 0.2s ease;
  }

  &:checked::after {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    content: "";
    display: block;
    border-radius: 6px;
    width: 10px;
    height: 10px;
    background: #f9f9f9;
  }
`;
