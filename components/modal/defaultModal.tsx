import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";
import DefaultInput from "../input/defaultInput";

interface IProps {
  isActive: boolean;
  onClick: MouseEventHandler;
  children:
    | ReactElement
    | ReactElement[]
    | string
    | string[]
    | number
    | number[];
  gap?: number;
  style?: CSSProperties;
}

export default function DefaultModal({
  isActive,
  onClick,
  children,
  gap = 8,
  style,
}: IProps) {
  return (
    <>
      <Background
        className={isActive ? "is_active" : ""}
        onClick={onClick}
      ></Background>
      <ModalWrap
        className={isActive ? "is_active" : ""}
        style={{ ...style, gap: `${gap}px` }}
      >
        {children}
      </ModalWrap>
    </>
  );
}

const Background = styled.div`
  z-index: 1000;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background: #000000;
  transition: all 0.4s ease;
  opacity: 0;
  pointer-events: none;
  cursor: pointer;

  &.is_active {
    pointer-events: all;
    opacity: 0.4;
  }
`;

const ModalWrap = styled.div`
  box-shadow: -8px 12px 32px 12px rgba(0, 0, 0, 0.24);
  z-index: 1001;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 0px;
  height: 0px;
  background: #fff;
  border-radius: 8px;
  padding: 16px;

  display: flex;
  flex-direction: column;
  align-items: center;

  transition: all 0.2s ease;
  opacity: 0;
  pointer-events: none;

  &.is_active {
    pointer-events: all;
    opacity: 1;

    width: 40vw;
    max-width: 736px;
    height: 25vw;
    max-height: 448px;
  }
`;
