import dayjs, { Dayjs } from "dayjs";
import { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";

export default function DashBoardTimer({ style }: { style?: CSSProperties }) {
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
    <TimeWrap style={style}>
      {dayjs(time).format("YYYY.MM.DD HH:mm:ss")}
    </TimeWrap>
  );
}

const TimeWrap = styled.p`
  width: 280px;
  white-space: nowrap;
`;
