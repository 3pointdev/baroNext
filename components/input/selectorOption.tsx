import styled from "styled-components";

interface IProps {
  title: string;
  value?: string | number;
  disabled?: boolean;
  hidden?: boolean;
  selected?: boolean;
}

export default function SelectorOption({
  title,
  disabled,
  hidden,
  value,
  selected,
}: IProps) {
  return (
    <Option
      disabled={disabled}
      hidden={hidden}
      value={value}
      selected={selected}
    >
      {title}
    </Option>
  );
}

const Option = styled.option``;
