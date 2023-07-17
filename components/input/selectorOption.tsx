import styled from "styled-components";

interface IProps {
  title: string;
  value?: string | number;
  disabled?: boolean;
  hidden?: boolean;
}

export default function SelectorOption({
  title,
  disabled,
  hidden,
  value,
}: IProps) {
  return (
    <Option disabled={disabled} hidden={hidden} value={value}>
      {title}
    </Option>
  );
}

const Option = styled.option``;
