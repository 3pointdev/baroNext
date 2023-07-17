import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  ReactElement,
  RefObject,
} from "react";
import styled from "styled-components";

interface IProps {
  type: HTMLInputTypeAttribute;
  value: string;
  name?: string;
  placeholder?: string;
  onChange?: ChangeEventHandler;
  requied?: boolean;
  readOnly?: boolean;
  reference?: RefObject<HTMLInputElement>;
  children?: ReactElement | ReactElement[];
}

export default function DefaultInput({
  type,
  value,
  name = "",
  placeholder = "",
  onChange,
  requied = false,
  readOnly = false,
  reference,
  children,
}: IProps) {
  return (
    <InputWrap>
      <InputColumn
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={requied}
        readOnly={readOnly}
        ref={reference}
      />
      <ChildrenWrap>{children}</ChildrenWrap>
    </InputWrap>
  );
}
const InputWrap = styled.div`
  height: 56px;
  width: 100%;
  position: relative;
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

const InputColumn = styled.input`
  background: #fff;
  border: 1px solid #d8d8dd !important;
  border-radius: 8px;
  height: 38px;
  width: calc(100% - 22px);
  padding: 8px 10px;
  font-size: 16px;
  font-weight: 400;

  &::placeholder {
    color: #6e6e6e;
  }
`;
