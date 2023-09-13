import { StyleColor } from "config/constants";
import { ChangeEventHandler } from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  title: string;
  onChange?: ChangeEventHandler | undefined;
  value: boolean;
}

export default function Checkbox({ title, onChange, value }: IProps) {
  return (
    <CheckboxWrapper>
      <input
        className="inp-cbx"
        id="cbx-15"
        type="checkbox"
        style={{ display: "none" }}
        onChange={onChange}
        checked={value}
      />
      <label className="cbx" htmlFor="cbx-15">
        <span>
          <svg width="12px" height="9px" viewBox="0 0 12 9">
            <polyline points="1 5 4 8 11 1"></polyline>
          </svg>
        </span>
        <span>{title}</span>
      </label>
    </CheckboxWrapper>
  );
}
const check15 = keyframes`
  50% {
    transform: scale(1.2);
  }
  `;

const CheckboxWrapper = styled.div`
  width: 100%;

  & .cbx {
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }

  & .cbx span {
    display: inline-block;
    vertical-align: middle;
    transform: translate3d(0, 0, 0);
  }

  & .cbx span:first-child {
    position: relative;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    transform: scale(1);
    vertical-align: middle;
    border: 1px solid ${StyleColor.DISABLE};
    transition: all 0.2s ease;
  }

  & .cbx span:first-child svg {
    position: absolute;
    z-index: 1;
    top: 4px;
    left: 2px;
    fill: none;
    stroke: white;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }
  & .cbx span:first-child:before {
    content: "";
    width: 100%;
    height: 100%;
    background: ${StyleColor.EMPHASIS};
    display: block;
    transform: scale(0);
    opacity: 1;
    border-radius: 50%;
    transition-delay: 0.2s;
  }
  & .cbx span:last-child {
    margin-left: 8px;
  }

  & .cbx:hover span:first-child {
    border-color: ${StyleColor.PRIMARY};
  }

  & .inp-cbx:checked + .cbx span:first-child {
    border-color: none;
    background: ${StyleColor.PRIMARY};
    animation: ${check15} 0.6s ease;
  }
  & .inp-cbx:checked + .cbx span:first-child svg {
    stroke-dashoffset: 0;
  }
  & .inp-cbx:checked + .cbx span:first-child:before {
    transform: scale(2.2);
    opacity: 0;
    transition: all 0.6s ease;
  }
  & .inp-cbx:checked + .cbx span:last-child {
    color: rgb(76, 78, 100);
    transition: all 0.3s ease;
  }
  & .inp-cbx:checked + .cbx span:last-child:after {
    transform: scaleX(1);
    transition: all 0.3s ease;
  }
`;
