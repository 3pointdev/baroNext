import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyleColor } from "config/constants";
import { MouseEventHandler } from "react";
import styled from "styled-components";

interface IProps {
  onClick: MouseEventHandler;
  value?: string;
  forLeft?: boolean;
  disable?: boolean;
}

export default function AngleButton({
  onClick,
  value,
  forLeft,
  disable = false,
}: IProps) {
  return (
    <Button onClick={onClick} value={value} disabled={disable}>
      <FontAwesomeIcon icon={forLeft ? faAngleLeft : faAngleRight} />
    </Button>
  );
}

const Button = styled.button`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background: none;
  border: 0;
  cursor: pointer;
  transition: all 0.4s;

  & svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${StyleColor.HOVER};
  }

  &:disabled {
    cursor: default;
    &:hover {
      background: none;
    }
    & * {
      color: #d9d9d9;
    }
  }
`;
