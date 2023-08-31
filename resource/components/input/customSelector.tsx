import { StyleColor } from "config/constants";
import {
  CSSProperties,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";

interface IProps {
  options: Options[];
  onClick: MouseEventHandler;
  defaultValue?: string | number;
  defaultTitle: string;
  value: string | number;
  style?: CSSProperties;
}

export interface Options {
  title: string;
  id: number | string;
}

export default function CustomSelector({
  options,
  onClick,
  defaultValue = null,
  defaultTitle,
  value,
  style,
}: IProps) {
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(defaultTitle);
  useEffect(() => {
    const target = options.find((option: Options) => option.id === value);
    setSelectedValue(target?.title ? target.title : defaultTitle);
  }, [value]);

  const onClickSelector = () => {
    setIsOpenOption(!isOpenOption);
  };

  const onClickOption = (event: MouseEvent<HTMLSpanElement>) => {
    setIsOpenOption(!isOpenOption);
    onClick(event);
  };

  return (
    <Container style={style}>
      <SelectWrap
        onClick={onClickSelector}
        isOpenOption={isOpenOption}
        isSelected={value !== defaultValue}
      >
        <p>{selectedValue}</p>
      </SelectWrap>
      <OptionWrap isOpenOption={isOpenOption}>
        {defaultValue && (
          <SelectorOption onClick={onClickOption} data-id={defaultValue}>
            {defaultTitle}
          </SelectorOption>
        )}
        {options.map((option: Options) => {
          return (
            <SelectorOption
              key={`filter_options_${option.title}_${option.id}`}
              data-id={option.id}
              onClick={onClickOption}
            >
              {option.title}
            </SelectorOption>
          );
        })}
      </OptionWrap>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
  background: ${StyleColor.LIGHT};
`;

const SelectWrap = styled.div<{ isOpenOption: boolean; isSelected: boolean }>`
  position: absolute;
  right: 0px;
  top: 0px;
  width: calc(100% - 2px);
  height: 54px;
  border: 1px solid #d8d8dd !important;
  border-radius: 8px;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 0px;

  background: ${({ isOpenOption }) =>
    isOpenOption
      ? `linear-gradient(135deg, transparent 50%, gray 50%),
      linear-gradient(45deg, gray 50%, transparent 50%)`
      : `linear-gradient(45deg, transparent 50%, gray 50%),
  linear-gradient(135deg, gray 50%, transparent 50%)`}};

  background-position: calc(100% - 20px) calc(1.4em + 2px),
    calc(100% - 12px) calc(1.4em + 2px), calc(100% - 2.5em) 0.5em;

  background-size: 8px 8px, 8px 8px, 1px 2.4em;
  background-repeat: no-repeat;

  & p {
    padding-left: 10px;
    color: ${({ isSelected }) =>
      isSelected ? StyleColor.DARK : StyleColor.DISABLE} !important;
    font-size: 16px;
    font-weight: 400;
  }
`;

const OptionWrap = styled.div<{ isOpenOption: boolean }>`
  z-index: 99;
  width: calc(100% - 2px);
  position: absolute;
  right: 0px;
  top: 54px;
  background: ${StyleColor.LIGHT};
  border: 1px solid #d8d8dd !important;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-itmes: center;
  overflow-y: scroll;
  max-height: 600px;

  transition: all 0.2s ease;
  opacity: ${({ isOpenOption }) => (isOpenOption ? "1" : "0")};
  pointer-events: ${({ isOpenOption }) => (isOpenOption ? "auto" : "none")};
`;

const SelectorOption = styled.span`
  padding: 16px 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${StyleColor.HOVER};
  }

  &:first-child {
    border-radius: 8px 8px 0 0;
  }

  &:last-child {
    border-radius: 0 0 8px 8px;
  }
`;
