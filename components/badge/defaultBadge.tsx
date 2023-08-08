import { CSSProperties } from "react";
import styled from "styled-components";

interface IProps {
  title: string;
  style?: CSSProperties;
}

export default function DefaultBadge({ title, style }: IProps) {
  return <Badge style={style}>{title}</Badge>;
}

const Badge = styled.div`
  position: absolute;
  padding: 0 16px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #000;
  background: #ffeae9;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  padding-top: 2px;
`;
