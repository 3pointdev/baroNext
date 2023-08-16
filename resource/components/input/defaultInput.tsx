import {
  CSSProperties,
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  RefObject,
} from "react";
import styled from "styled-components";
import { ValidType } from "../../config/constants";

interface IProps {
  type: HTMLInputTypeAttribute;
  value: string;
  name?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
  onClick?: MouseEventHandler;
  requied?: boolean;
  readOnly?: boolean;
  reference?: RefObject<HTMLInputElement>;
  children?: ReactElement | ReactElement[];
  onKeyDown?: KeyboardEventHandler;
  boxstyle?: CSSProperties;
  style?: CSSProperties;
  useLabel?: boolean;
  validState?: number;
  validText?: string;
}

export default function DefaultInput({
  type,
  value,
  name = "",
  placeholder = "",
  useLabel = false,
  onChange,
  onClick,
  requied = false,
  readOnly = false,
  reference,
  children,
  onKeyDown,
  boxstyle,
  style,
  validState = ValidType.PASS,
  validText,
}: IProps) {
  return (
    <InputWrap style={boxstyle} onClick={onClick}>
      <InputColumn
        style={style}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        required={requied}
        readOnly={readOnly}
        ref={reference}
        onKeyDown={onKeyDown}
        id={name}
        placeholder={useLabel ? "" : placeholder}
        isOnValue={value.length > 0}
        autoComplete="new-password"
        className={readOnly ? "readonly" : ""}
      />
      {useLabel && (
        <Placeholder htmlFor={name} className={readOnly ? "readonly" : ""}>
          {placeholder}
        </Placeholder>
      )}
      {validText && (
        <ValidLabel
          htmlFor={name}
          isViewAble={validState > ValidType.PASS}
          className={
            validState === ValidType.FAIL
              ? readOnly
                ? "readonly fail"
                : "fail"
              : ""
          }
        >
          {validText}
        </ValidLabel>
      )}
      {children && <ChildrenWrap>{children}</ChildrenWrap>}
    </InputWrap>
  );
}
const InputWrap = styled.div`
  height: 56px;
  width: 100%;
  position: relative;
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .view_password_icon {
    width: 24px;
    height: 24px;
    & path {
      color: rgb(155, 155, 155);
    }
  }
`;

const ChildrenWrap = styled.p`
  position: absolute;
  width: 32px;
  height: 32px;
  right: 12px;
  top: 50%;
  transform: translate(0, -50%);
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;

  &:hover {
    background: rgba(222, 222, 222, 0.4);
  }
`;

const InputColumn = styled.input<{ isOnValue: boolean }>`
  background: #fff;
  border: 1px solid #d8d8dd !important;
  border-radius: 8px;
  height: 38px;
  width: calc(100% - 22px);
  padding: 8px 10px;
  font-size: 16px;
  font-weight: 400;

  &:active + label,
  &:focus + label {
    left: 8px;
    top: -8px;
    color: #3a79ec !important;
  }

  & + label {
    ${({ isOnValue }) =>
      isOnValue
        ? `left: 8px;
      top: -8px;
      color: #3a79ec !important;`
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
    background: #d9d9d9;
  }
`;

const Placeholder = styled.label`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 12px;
  color: #bfbfbf;
  transition: all 0.4s ease;
  cursor: text;
  background: #fff;
  padding: 0 8px;
  border-radius: 8px;

  &.readonly {
    background: #d9d9d9;
    color: #a0a0a0;
  }
`;

const ValidLabel = styled.label<{ isViewAble: boolean }>`
  position: absolute;
  top: -8px;
  right: 4px;
  font-size: 12px;
  color: #bfbfbf;
  transition: all 0.4s ease;
  cursor: text;
  background: #fff;
  padding: 0 8px;
  border-radius: 8px;
  opacity: ${({ isViewAble }) => (isViewAble ? "1" : "0")};

  &.readonly {
    background: #d9d9d9;
    color: #a0a0a0;
  }

  &.fail {
    color: red;
  }
`;
