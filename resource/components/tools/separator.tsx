import { CSSProperties } from "react";

interface IProps {
  turns: number;
  style: CSSProperties;
}

export default function Separator({ turns, style }: IProps) {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        transform: `rotate(${turns}turn)`,
      }}
    >
      <div style={style} />
    </div>
  );
}
