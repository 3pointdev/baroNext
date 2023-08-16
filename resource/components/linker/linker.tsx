import Link from "next/link";
import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";

interface IProps {
  href: string;
  onClick?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
  boxStyle?: CSSProperties;
  style?: CSSProperties;
  children?: ReactElement | ReactElement[] | string | string[];
}

export default function Linker(props: IProps) {
  const {
    href,
    children,
    style,
    boxStyle,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  return (
    <LinkerContainer style={boxStyle}>
      <Link
        href={href}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Link>
    </LinkerContainer>
  );
}

const LinkerContainer = styled.div`
  width: 100%;
  height: 100%;

  & a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
`;
