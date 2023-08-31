import { StyleColor } from "config/constants";
import { ReactElement } from "react";
import styled, { CSSProperties } from "styled-components";

interface IProps {
  children: ReactElement | ReactElement[];
  style?: CSSProperties;
}

export default function PageContainer({ style, children }: IProps) {
  return <Container style={style}>{children}</Container>;
}

const Container = styled.div`
  margin: 0 auto;
  width: calc(100vw - 32px);
  height: calc(100vh - 176px);
  background: ${StyleColor.BACKGROUND};
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-width: 604px;
`;
