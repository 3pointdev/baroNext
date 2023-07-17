import { CSSProperties, MouseEventHandler } from "react";
import styled from "styled-components";

interface IProps {
  title: string;
  value?: string;
  onClick?: MouseEventHandler | undefined;
  dynamic?: boolean;
  isActive?: boolean;
  style?: CSSProperties;
}

interface Dynamic {
  isDynamic: boolean;
  isActive: boolean;
}

export default function DefaultButton({
  value,
  title,
  onClick,
  dynamic = false,
  isActive = true,
  style,
}: IProps) {
  return (
    <Button
      value={value}
      onClick={onClick}
      dynamic={{ isDynamic: dynamic, isActive: isActive }}
      style={style}
    >
      {title}
    </Button>
  );
}

const Button = styled.button<{ dynamic: Dynamic }>`
  color: white;
  font-weight: 600;
  line-height: 1;
  font-size: 18px;
  height: 42px;
  width: 100%;
  background: ${({ dynamic }) =>
    dynamic.isDynamic && dynamic.isActive === false ? "" : "#3a79ec"};
  box-shadow: 0px 2px 6px rgba(76, 78, 100, 0.42);
  border: 0;
  border-radius: 8px;
  cursor: pointer;
`;
