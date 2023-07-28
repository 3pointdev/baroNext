import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";

interface IProps {
  onClick: MouseEventHandler;
  value?: string;
  icon: IconDefinition;
  children?:
    | ReactElement
    | ReactElement[]
    | string
    | string[]
    | number
    | number[];
}

export default function CircleButton({
  onClick,
  value,
  icon,
  children,
}: IProps) {
  return (
    <Button onClick={onClick} value={value}>
      <FontAwesomeIcon icon={icon} />
      {children}
    </Button>
  );
}

const Button = styled.button`
  position: relative;
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background: 0;
  border: 0;
  cursor: pointer;
  transition: all 0.4s;

  & svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: #f0f0f0;
  }
`;
