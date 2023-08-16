import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Separator from "../tools/separator";
import _ from "lodash";
import styled from "styled-components";

interface IProps {
  maxValue: number;
  minValue: number;
  value: number;
  innerText: string;
}

export default function ProgressCircle({
  maxValue,
  minValue,
  value,
  innerText,
}: IProps) {
  return (
    <Container>
      <CircularProgressbarWithChildren
        value={value}
        text={innerText}
        minValue={minValue}
        maxValue={maxValue}
        styles={buildStyles({
          strokeLinecap: "butt",
          textColor: "#3A79EC",
          pathColor: "#3A79EC",
          trailColor: "#d5d7da",
        })}
        strokeWidth={10}
      >
        {_.range(10).map((index: number) => {
          return (
            <Separator
              turns={index * 0.1}
              style={{
                background: "#fff",
                width: "2px",
                // This needs to be equal to props.strokeWidth
                height: `${10}%`,
              }}
              key={`range_${index}`}
            />
          );
        })}
      </CircularProgressbarWithChildren>
    </Container>
  );
}

const Container = styled.div`
  width: 160px;
`;
