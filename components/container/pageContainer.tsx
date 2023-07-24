import { ReactElement } from "react";
import styled from "styled-components";

interface IProps {
  children: ReactElement | ReactElement[];
}

export default function PageContainer({ children }: IProps) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  margin: 0 auto;
  width: 100vw;
  height: calc(100vh - 192px);
  background: #f7f7f9;
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
