import { StyleColor } from "config/color";
import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";

interface IProps {
  title: string | number | string[] | number[] | ReactElement | ReactElement[];
  dataId?: string | number;
  value?: string | number;
  onClick?: MouseEventHandler | undefined;
  isActive?: boolean;
  style?: CSSProperties;
}

export default function BrightButton({
  dataId,
  value,
  title,
  onClick,
  isActive = true,
  style,
}: IProps) {
  return (
    <Button
      data-id={dataId}
      value={value}
      onClick={onClick}
      style={style}
      isActive={isActive}
    >
      {title}
    </Button>
  );
}

const Button = styled.button<{ isActive: boolean }>`
  font-weight: 600;
  line-height: 1;
  font-size: 18px;
  height: 42px;
  width: 100%;
  box-shadow: ${StyleColor.DEEPSHADOW};
  border-radius: 8px;
  cursor: pointer;

  background: ${StyleColor.LIGHT};
  border: ${({ isActive }) =>
    isActive ? `1px solid ${StyleColor.PRIMARY}` : "none"};
  & * {
    ${({ isActive }) =>
      isActive
        ? `color: ${StyleColor.PRIMARY} !important;
        stroke:${StyleColor.PRIMARY} !important;
        `
        : `color:${StyleColor.DARK} !important;
        stroke:${StyleColor.DARK} !important;
        `}
  }
`;
