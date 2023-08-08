import { ChangeEventHandler } from "react";
import styled from "styled-components";

interface IProps {
  checked: boolean;
  onChange: ChangeEventHandler;
}

export default function SwitchButton({ checked, onChange }: IProps) {
  return (
    <Container>
      <SwitchBox>
        <SwitchLabel>
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span></span>
        </SwitchLabel>
      </SwitchBox>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  right: 16px;
`;

const SwitchBox = styled.div`
  position: relative;
  & * {
    cursor: pointer;
  }
`;

const SwitchLabel = styled.label`
  position: relative;
  display: inline-block;

  & > input {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    z-index: -1;
    position: absolute;
    right: 6px;
    top: -8px;
    display: block;
    margin: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: rgb(0, 0, 0, 0.38);
    outline: none;
    opacity: 0;
    transform: scale(1);
    pointer-events: none;
    transition: opacity 0.3s 0.1s, transform 0.2s 0.1s;
  }

  & > span::before {
    content: "";
    float: right;
    display: inline-block;
    margin: 5px 0 5px 10px;
    border-radius: 7px;
    width: 36px;
    height: 14px;
    background-color: rgb(0, 0, 0, 0.38);
    vertical-align: top;
    transition: background-color 0.2s, opacity 0.2s;
  }

  & > span::after {
    content: "";
    position: absolute;
    top: 2px;
    right: 16px;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    background-color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    transition: background-color 0.2s, transform 0.2s;
  }

  & > input:checked {
    right: -10px;
    background-color: #1976d280;
  }

  & > input:checked + span::before {
    background-color: #1976d280;
  }

  & > input:checked + span::after {
    background-color: #1976d2;
    transform: translateX(16px);
  }

  &:hover > input {
    opacity: 0.04;
  }

  & > input:focus {
    opacity: 0.12;
  }

  &:hover > input:focus {
    opacity: 0.16;
  }

  & > input:active {
    opacity: 1;
    transform: scale(0);
    transition: transform 0s, opacity 0s;
  }

  & > input:active + span::before {
    background-color: #8f8f8f;
  }

  & > input:checked:active + span::before {
    background-color: #1976d280;
  }

  & > input:disabled {
    opacity: 0;
  }

  & > input:disabled + span::before {
    background-color: #ddd;
  }

  & > input:checked:disabled + span::before {
    background-color: #bfdbda;
  }

  & > input:checked:disabled + span::after {
    background-color: #61b5b4;
  }
`;
