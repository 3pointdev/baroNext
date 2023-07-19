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
    <div style={boxStyle}>
      <Link
        href={href}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </Link>
    </div>
  );
}
