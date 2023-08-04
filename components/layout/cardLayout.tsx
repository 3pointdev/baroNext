import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";

interface IProps {
  children:
    | ReactElement
    | ReactElement[]
    | string
    | string[]
    | number
    | number[];
  style?: CSSProperties;
  onClick?: MouseEventHandler;
}

export default function CardLayout({ style, children, onClick }: IProps) {
  return (
    <Layout style={style} onClick={onClick}>
      {children}
    </Layout>
  );
}
const Layout = styled.div`
  background: #fff;
  position: relative;
  box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
