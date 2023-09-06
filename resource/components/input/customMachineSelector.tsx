import { StyleColor } from "config/constants";
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react";
import ProductDto from "src/dto/report/product.dto";
import styled from "styled-components";

interface IProps {
  options: ProductDto[];
  onClick: MouseEventHandler;
  defaultValue?: string | number;
  defaultTitle: string;
  value: number;
}

export default function CustomMachineSelector({
  options,
  onClick,
  defaultValue = 0,
  defaultTitle,
  value,
}: IProps) {
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(defaultTitle);
  useEffect(() => {
    const target = options.find(
      (option: ProductDto) => +option.machineNo === value
    );
    setSelectedValue(target?.name ? target.name : defaultTitle);
  }, [value]);

  const onClickSelector = () => {
    setIsOpenOption(!isOpenOption);
  };

  const onClickOption = (event: MouseEvent<HTMLSpanElement>) => {
    setIsOpenOption(!isOpenOption);
    onClick(event);
  };

  return (
    <Container>
      <SelectWrap onClick={onClickSelector}>
        <p>{selectedValue}</p>
      </SelectWrap>
      <OptionWrap isOpenOption={isOpenOption}>
        <SelectorOption onClick={onClickOption} data-id={defaultValue}>
          {defaultTitle}
        </SelectorOption>
        {options.map((option: ProductDto, key: number) => {
          return (
            <SelectorOption
              key={`filter_options_${option.name}_${key}`}
              data-id={option.machineNo}
              onClick={onClickOption}
            >
              {option.name}
            </SelectorOption>
          );
        })}
      </OptionWrap>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 180px;
  height: 42px;
`;

const SelectWrap = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid ${StyleColor.BORDER} !important;
  border-radius: 8px;
  color: #6e6e6e;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 0px;
  width: 100%;
  height: 42px;

  background: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 12px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;

  background-size: 8px 8px, 8px 8px, 1px 2.4em;
  background-repeat: no-repeat;
  & p {
    padding-left: 16px;
  }
`;

const OptionWrap = styled.div<{ isOpenOption: boolean }>`
  z-index: 10;
  position: absolute;
  right: 0px;
  top: 48px;
  width: 100%;
  background: ${StyleColor.LIGHT};
  border: 1px solid ${StyleColor.BORDER};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-itmes: center;
  overflow: hidden;
  opacity: ${({ isOpenOption }) => (isOpenOption ? "1" : "0")};
  pointer-events: ${({ isOpenOption }) => (isOpenOption ? "auto" : "none")};
  transition: all 0.2s ease;
`;

const SelectorOption = styled.span`
  padding: 8px 16px;
  cursor: pointer;
  border-bottom: 1px solid ${StyleColor.BORDER};

  &:hover {
    background: ${StyleColor.HOVER};
  }

  &:last-child {
    border: 0;
  }
`;
