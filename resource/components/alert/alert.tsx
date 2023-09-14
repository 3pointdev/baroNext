import {
  faCheckCircle,
  faXmarkCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyleColor } from "config/color";
import styled, { css, keyframes } from "styled-components";

export interface IAlertState {
  isPositive?: boolean;
  isActive: boolean;
  title: string;
}

export default function Alert({
  title,
  isActive,
  isPositive = true,
}: IAlertState) {
  return (
    <Container isPositive={isPositive} isActive={isActive}>
      <FontAwesomeIcon
        icon={isPositive ? faCheckCircle : faXmarkCircle}
        color={StyleColor.LIGHT}
        size="xl"
      />
      <Title>{title}</Title>
      <ProgressBar isPositive={isPositive} isActive={isActive}>
        <span />
      </ProgressBar>
    </Container>
  );
}

const Container = styled.div<{ isPositive: boolean; isActive: boolean }>`
  z-index: 999;
  position: fixed;
  right: 16px;
  bottom: ${({ isActive }) => (isActive ? "16px" : "-200px")};
  border-radius: 8px;
  padding: 16px 24px;
  background: ${({ isPositive }) =>
    isPositive ? StyleColor.POSITIVE : StyleColor.WARNNING};
  display: flex;
  align-items: center;
  gap: 16px;

  transition: all 0.2s ease;

  & * {
    color: ${StyleColor.LIGHT};
  }
`;

const Title = styled.p`
  white-space: pre-line;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
`;

const Progress = keyframes`
from {
    width: 0%;
}
to {
    width: 100%;
    
}
`;

const ProgressBar = styled.div<{ isPositive: boolean; isActive: boolean }>`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background: ${StyleColor.DISABLE};
  height: 4px;
  border-radius: 0 0 4px 4px;

  & span {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 0%;
    height: 4px;
    border-radius: 0 0 4px 4px;
    background: ${({ isPositive }) =>
      isPositive ? StyleColor.POSITIVE : StyleColor.WARNNING};
    ${({ isActive }) =>
      isActive &&
      css`
        animation: ${Progress} 3s ease forwards;
      `};
  }
`;
