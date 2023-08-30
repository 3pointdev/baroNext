import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyleColor } from "config/constants";
import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";

interface IProps {
  onClick: MouseEventHandler;
  value?: string | number;
  icon: IconDefinition;
  iconStyle?: CSSProperties;
  style?: CSSProperties;
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
  iconStyle,
  style,
}: IProps) {
  return (
    <Button onClick={onClick} value={value} style={style}>
      <FontAwesomeIcon icon={icon} style={iconStyle} />
      {children}
    </Button>
  );
}

const Button = styled.button`
  position: relative;
  width: 40px;
  height: 40px;

  border-radius: 50%;
  background: none;
  border: 0;
  cursor: pointer;
  transition: all 0.4s;

  & svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: ${StyleColor.HOVER};
  }
`;
