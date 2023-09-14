import { StyleColor } from "config/color";
import { MachineColorType } from "config/constants";
import styled from "styled-components";

interface IProps {
  isActive: boolean;
  size?: number;
}

export default function ActiveBadge({ isActive, size }: IProps) {
  return <ActiveSign isActive={isActive} size={size} />;
}

const ActiveSign = styled.div<{ isActive: boolean; size: number }>`
  width: 16px;
  height: 16px;
  background: ${({ isActive }) =>
    isActive ? MachineColorType.GREEN : MachineColorType.RED};
  border-radius: 50%;
  box-shadow: ${StyleColor.BOXSHADOW};
`;
