import { StyleColor } from "config/constants";
import dayjs, { Dayjs } from "dayjs";
import { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";

export default function Clock({
  fontSize,
  color,
  style,
}: {
  fontSize: number;
  color?: string;
  style?: CSSProperties;
}) {
  const [time, setTime] = useState<Dayjs>(null);

  const getTime = () => {
    return dayjs();
  };

  useEffect(() => {
    setTime(getTime());
    const interval = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container fontSize={fontSize} color={color} style={style}>
      <span>{dayjs(time).format("YYYY.MM.DD")}</span>
      <span>{dayjs(time).format("HH:mm:ss")}</span>
    </Container>
  );
}

const Container = styled.div<{ fontSize: number; color: string }>`
  display: flex;
  align-items: center;
  font-variant-numeric: tabular-nums;
  gap: 16px;
  & span {
    color: ${({ color }) => (color ? color : StyleColor.LIGHT)};
    font-size: ${({ fontSize }) => fontSize}px;
  }
`;
