import moment from "moment";
import { CSSProperties, useEffect, useState } from "react";
import styled from "styled-components";

export default function Timer({
  size,
  style,
}: {
  size?: string;
  style?: CSSProperties;
}) {
  const [time, setTime] = useState<string>("");

  const getFormattedTime = () => {
    return moment().format("YYYY.MM.DD HH:mm:ss");
  };

  useEffect(() => {
    setTime(getFormattedTime());
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <TimeWrap style={style} className={size ? size : ""}>
      <Date className={size ? size : ""}>
        {moment(time).format("YYYY-MM-DD")}
      </Date>
      <Time className={size ? size : ""}>
        {moment(time).format("HH:mm:ss")}
      </Time>
    </TimeWrap>
  );
}

const TimeWrap = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  gap: 24px;

  &.small {
    gap: 4px;
  }

  &.midium {
    left: 40px;
    gap: 0px;
  }
`;

const Date = styled.span`
  flex-shrink: 0;
  font-weight: 600;
  width: 20vw;
  max-width: fit-content;
  color: #666666;
  font-size: 4vw;
  font-weight: 400;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;

  @media screen and (min-width: 1080px) {
    font-size: 48px;
  }

  &.small {
    padding: 0 8px;
    width: 102px;
    max-width: none;
    font-size: 20px !important;
    font-weight: 600;

    @media screen and (min-width: 1080px) {
      font-size: 20px;
    }
  }

  &.midium {
    padding: 0 8px;
    width: 180px;
    max-width: none;
    font-size: 32px !important;
    font-weight: 600;
  }
`;

const Time = styled.span`
  flex-shrink: 0;
  font-weight: 600;
  width: 9vw;
  min-width: fit-content;
  color: #666666;
  font-size: 4vw;
  font-weight: 400;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  text-align: start;

  @media screen and (min-width: 1080px) {
    font-size: 48px;
  }

  &.small {
    width: 96px !important;
    min-width: fit-content;
    font-size: 20px !important;
    font-weight: 600;
    letter-spacing: 1px;

    @media screen and (min-width: 1080px) {
      font-size: 20px;
    }
  }

  &.midium {
    padding: 0 8px;
    width: 120px;
    max-width: none;
    font-size: 32px !important;
    font-weight: 600;
  }
`;
