import { CSSProperties, MouseEventHandler } from "react";
import styled from "styled-components";

interface IProps {
  title: string;
  value?: string;
  onClick?: MouseEventHandler | undefined;
  dynamic?: boolean;
  isActive?: boolean;
  style?: CSSProperties;
  activeColor?: string;
  disableColor?: string;
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
  activeColor = "#3a79ec",
  disableColor = "#63657840",
}: IProps) {
  return (
    <Button
      value={value}
      onClick={dynamic && !isActive ? null : onClick}
      dynamic={{ isDynamic: dynamic, isActive: isActive }}
      style={style}
      activeColor={activeColor}
      disableColor={disableColor}
    >
      {title}
    </Button>
  );
}

const Button = styled.button<{
  dynamic: Dynamic;
  activeColor: string;
  disableColor: string;
}>`
  color: white;
  font-weight: 600;
  line-height: 1;
  font-size: 18px;
  height: 42px;
  width: 100%;
  box-shadow: 0px 2px 6px rgba(76, 78, 100, 0.42);
  border-radius: 8px;
  cursor: pointer;
  ${({ dynamic, activeColor, disableColor }) =>
    dynamic.isDynamic === true && dynamic.isActive === false
      ? `
      background: ${disableColor};
      border: 0;
      
      `
      : `
      background: ${activeColor};
      border: 1px solid #BFBFBF;
      `}
`;
