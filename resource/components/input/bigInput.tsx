import { StyleColor } from "config/color";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import styled from "styled-components";
import { ValidType } from "../../config/constants";

interface IProps {
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  name?: string | number;
  onChange?: ChangeEventHandler;
  validState?: number;
  validText?: string;
}

export default function BigInput({
  type,
  value,
  name,
  placeholder = "",
  onChange,
  validState = ValidType.PASS,
  validText,
}: IProps) {
  return (
    <InputWrap>
      <InputColumn
        type={type}
        value={value}
        name={name?.toString()}
        onChange={onChange}
        id={name?.toString()}
        isOnValue={value.length > 0}
        autoComplete="new-password"
      />

      <Placeholder htmlFor={name?.toString()}>{placeholder}</Placeholder>

      <ValidLabel
        htmlFor={name?.toString()}
        isViewAble={validState > ValidType.PASS}
        className={validState === ValidType.FAIL ? "fail" : ""}
      >
        {validText}
      </ValidLabel>
    </InputWrap>
  );
}

const InputWrap = styled.div`
  width: 100%;
  height: 56px;
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputColumn = styled.input<{ isOnValue: boolean }>`
  background: ${StyleColor.LIGHT};
  border: 1px solid ${StyleColor.BORDER} !important;
  border-radius: 8px;
  height: 38px;
  width: calc(100% - 22px);
  padding: 8px 20px;
  font-size: 16px;
  font-weight: 400;

  &:active + label,
  &:focus + label {
    left: 8px;
    top: -8px;
    color: ${StyleColor.PRIMARY} !important;
    font-size: 12px !important;
  }

  & + label {
    ${({ isOnValue }) =>
      isOnValue
        ? `left: 8px;
      top: -8px;
      color: ${StyleColor.PRIMARY} !important;
      font-size:12px !important;`
        : ``}
  }

  /* Change the white to any color */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }

  &.readonly {
    background: ${StyleColor.HOVER};
  }
`;

const Placeholder = styled.label`
  position: absolute;
  top: 18px;
  left: 12px;
  font-size: 16px;
  color: ${StyleColor.DISABLE};
  cursor: text;
  background: ${StyleColor.LIGHT};
  padding: 0 8px;
  border-radius: 8px;
  transition: all 0.4s ease;
  pointer-events: none;
`;

const ValidLabel = styled.label<{ isViewAble: boolean }>`
  position: absolute;
  top: -8px;
  right: 4px;
  font-size: 12px;
  color: ${StyleColor.DISABLE};
  transition: all 0.4s ease;
  cursor: text;
  background: ${StyleColor.LIGHT};
  padding: 2px 8px;
  border-radius: 8px;

  &.fail {
    color: ${StyleColor.WARNNING};
  }
`;
