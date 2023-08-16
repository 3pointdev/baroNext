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
  background: ${({ isActive }) => (isActive ? "#6ebd33" : "red")};
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
`;
