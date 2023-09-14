import { StyleColor } from "config/color";
import dayjs, { Dayjs } from "dayjs";
import { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";

export default function Clock({
  fontSize,
  color,
  style,
  wideFont,
  fontweight,
}: {
  fontSize?: number;
  color?: string;
  style?: CSSProperties;
  wideFont?: number;
  fontweight?: number;
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
    <Container
      fontSize={fontSize}
      wideFont={wideFont}
      fontweight={fontweight}
      color={color}
      style={style}
    >
      <span>{dayjs(time).format("YYYY.MM.DD")}</span>
      <span>{dayjs(time).format("HH:mm:ss")}</span>
    </Container>
  );
}

const Container = styled.div<{
  fontSize: number;
  color: string;
  wideFont: number;
  fontweight: number;
}>`
  display: flex;
  align-items: center;
  font-variant-numeric: tabular-nums;
  gap: 0.8vw;
  & span {
    color: ${({ color }) => (color ? color : StyleColor.LIGHT)};
    font-size: ${({ fontSize, wideFont }) =>
      wideFont ? `${wideFont}vw` : `${fontSize}px`};
    font-weight: ${({ fontweight }) => fontweight};
`;
