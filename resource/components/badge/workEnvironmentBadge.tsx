import { StyleColor } from "config/constants";
import styled from "styled-components";

interface IProps {
  title: string;
}

export default function WorkEnvironmentBadge({ title }: IProps) {
  return <Badge>{title}</Badge>;
}

const Badge = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  padding: 0 16px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${StyleColor.WARNNING};
  border-radius: 24px;
  color: ${StyleColor.WARNNING};
  background: ${StyleColor.INFOMATION};
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  padding-top: 4px;
`;
