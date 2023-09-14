import { StyleColor } from "config/color";
import { MouseEventHandler, ReactElement } from "react";
import styled, { CSSProperties } from "styled-components";

interface IProps {
  title: string | number | string[] | number[] | ReactElement | ReactElement[];
  dataId?: string | number;
  value?: string | number;
  onClick?: MouseEventHandler | undefined;
  dynamic?: boolean;
  isActive?: boolean;
  highlight?: boolean;
  style?: CSSProperties;
}

export default function MachineButton({
  dataId,
  value,
  title,
  onClick,
  dynamic = false,
  isActive = true,
  style,
  highlight,
}: IProps) {
  return (
    <Button
      data-id={dataId}
      value={value}
      onClick={onClick}
      dynamic={dynamic}
      isActive={isActive}
      highlight={highlight}
      style={style}
      disabled={!isActive}
    >
      {title}
    </Button>
  );
}

const Button = styled.button<{
  dynamic: boolean;
  isActive: boolean;
  highlight: boolean;
}>`
  color: ${StyleColor.DARK};
  font-weight: 600;
  line-height: 1;
  font-size: 18px;
  height: 42px;
  width: 100%;
  box-shadow: ${StyleColor.DEEPSHADOW};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  gap: 16px;

  & * {
    flex-shrink: 0;
  }

  border: ${({ highlight }) =>
    highlight ? `2px solid ${StyleColor.PRIMARY}` : "0"};

  ${({ dynamic, isActive }) =>
    dynamic === true && isActive === false
      ? `
      background: ${StyleColor.DISABLE}70;
      border: 0;
      cursor: default;
      `
      : `
      background: ${StyleColor.LIGHT};
    `}
`;
