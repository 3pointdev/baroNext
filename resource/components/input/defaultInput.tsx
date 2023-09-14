import { StyleColor } from "config/color";
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
  name?: string | number;
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
  labelStyle?: CSSProperties;
  useLabel?: boolean;
  validState?: number;
  validText?: string;
  dataId?: string | number;
}

export default function DefaultInput({
  type,
  value,
  name,
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
  labelStyle,
  dataId,
}: IProps) {
  return (
    <InputWrap style={boxstyle} onClick={onClick}>
      <InputColumn
        style={style}
        type={type}
        value={value}
        name={name?.toString()}
        onChange={onChange}
        required={requied}
        readOnly={readOnly}
        ref={reference}
        onKeyDown={onKeyDown}
        id={name?.toString()}
        placeholder={useLabel ? "" : placeholder}
        isOnValue={value.length > 0}
        autoComplete="new-password"
        className={readOnly ? "readonly" : ""}
        data-id={dataId}
      />
      {useLabel && (
        <Placeholder
          htmlFor={name?.toString()}
          className={readOnly ? "readonly" : ""}
          style={labelStyle}
        >
          {placeholder}
        </Placeholder>
      )}
      {validText && (
        <ValidLabel
          style={labelStyle}
          htmlFor={name?.toString()}
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
  width: 100%;
  height: 56px;
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
    background: ${StyleColor.HOVER};
  }
`;

const InputColumn = styled.input<{ isOnValue: boolean }>`
  background: ${StyleColor.LIGHT};
  border: 1px solid ${StyleColor.BORDER} !important;
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
  top: 12px;
  left: 12px;
  font-size: 12px;
  color: ${StyleColor.DISABLE};
  cursor: text;
  background: ${StyleColor.LIGHT};
  padding: 0 8px;
  border-radius: 8px;
  transition: all 0.4s ease;
  pointer-events: none;
  &.readonly {
    background: ${StyleColor.DISABLE};
    color: ${StyleColor.DISABLE};
  }
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
  padding: 0 8px;
  border-radius: 8px;
  opacity: ${({ isViewAble }) => (isViewAble ? "1" : "0")};

  &.readonly {
    background: ${StyleColor.DISABLE}60;
    color: ${StyleColor.DISABLE};
  }

  &.fail {
    color: ${StyleColor.WARNNING};
  }
`;
