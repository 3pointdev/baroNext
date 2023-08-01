import styled from "styled-components";

interface IProps {
  value: number;
  activeColor?: string;
  baseColor?: string;
}

export default function ProgressBar({
  value = 0,
  activeColor = "rgb(58, 121, 236)",
  baseColor = "#edeff1",
}: IProps) {
  return (
    <Progress baseColor={baseColor}>
      <Dealt value={value > 100 ? 100 : value} activeColor={activeColor} />
    </Progress>
  );
}

const Progress = styled.div<{ baseColor: string }>`
  width: 100%;
  height: 10px;
  background-color: ${({ baseColor }) => baseColor} !important;
  border-radius: 8px;
`;
const Dealt = styled.div<{ value: number; activeColor: string }>`
  border-radius: 8px;
  background-color: ${({ activeColor }) => activeColor} !important;
  width: ${(props) => props.value + "%"};
  height: 100%;
  transition: all 0.4s ease;
`;
