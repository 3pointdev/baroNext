import styled from "styled-components";

interface IProps {
  title: string;
}

export default function WorkEnvironmentBadge({ title }: IProps) {
  return <Badge>{title}</Badge>;
}

const Badge = styled.div`
  padding: 0 16px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ff4d49;
  border-radius: 24px;
  color: #ff4d49;
  background: #fff1f0;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  padding-top: 4px;
`;
