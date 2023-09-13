import { StyleColor } from "config/constants";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Clock() {
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
    <Container>
      <span>{dayjs(time).format("YYYY.MM.DD")}</span>
      <span>{dayjs(time).format("HH:mm:ss")}</span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  font-variant-numeric: tabular-nums;
  gap: 16px;
  & span {
    color: ${StyleColor.LIGHT};
    font-size: 36px;
  }
`;
