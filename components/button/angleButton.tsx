import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";
import styled from "styled-components";

interface IProps {
  onClick: MouseEventHandler;
  value?: string;
  forLeft?: boolean;
}

export default function AngleButton({ onClick, value, forLeft }: IProps) {
  return (
    <Button onClick={onClick} value={value}>
      <FontAwesomeIcon icon={forLeft ? faAngleLeft : faAngleRight} />
    </Button>
  );
}

const Button = styled.button`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background: 0;
  border: 0;
  cursor: pointer;
  transition: all 0.4s;

  & svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: #f0f0f0;
  }
`;
