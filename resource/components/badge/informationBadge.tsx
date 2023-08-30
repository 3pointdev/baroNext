import { StyleColor } from "config/constants";
import { CSSProperties } from "react";
import styled from "styled-components";

interface IProps {
  title: string;
  desc: string;
  style?: CSSProperties;
}
export default function InformationBadge({ title, desc, style }: IProps) {
  return (
    <Container style={style}>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 6px;
  overflow: hidden;
  font-size: 14px !important;
`;

const Title = styled.p`
  padding: 4px 12px;
  background: ${StyleColor.EMPHASIS};
  text-align: center;
  font-weight: 700 !important;
`;

const Desc = styled.p`
  padding: 4px 12px;
  background: ${StyleColor.BRIGHTEMPHASIS};
  color: #4c4e64;
  text-align: center;
  font-weight: 400 !important;
`;
