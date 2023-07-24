import styled from "styled-components";

interface IProps {
  src: string;
  alt?: string;
  size?: number[];
  color?: string;
}

export default function Logo({ src, alt = "", size = [50, 30] }: IProps) {
  return <LogoImage src={src} alt={alt} size={size}></LogoImage>;
}

const LogoImage = styled.img<{ size: number[] }>`
  width: ${({ size }) => size[0]}px;
  height: ${({ size }) => size[1]}px;
`;
