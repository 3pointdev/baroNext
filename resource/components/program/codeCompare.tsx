import DefaultDatePicker from "components/datePicker/defaultDatePicker";
import CustomSelector, { Options } from "components/input/customSelector";
import { CompareType, StyleColor } from "config/constants";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import FunctionDto from "src/dto/program/function.dto";
import ProgramDto from "src/dto/program/program.dto";
import CompareViewModel from "src/viewModels/program/compare.viewModel";
import styled from "styled-components";
import CardLayout from "../layout/cardLayout";

interface IProps {
  title: string;
  type: CompareType;
  machineList: ProgramDto[];
  compareViewModel?: CompareViewModel;
}

function CodeCompare({ title, type, compareViewModel, machineList }: IProps) {
  const { target, data } = compareViewModel;
  const [programOption, setProgramOption] = useState<Options[]>([]);
  const machineOption = machineList.map((machine: ProgramDto) => {
    return { title: machine.name, id: +machine.machineNo };
  });

  useEffect(() => {
    if (type === CompareType.CRITERIA) {
      setProgramOption(
        data.criteriaProgram.map((program: FunctionDto) => {
          return { title: program.comment, id: program.name };
        })
      );
    } else {
      setProgramOption(
        data.compareProgram.map((program: FunctionDto) => {
          return { title: program.comment, id: program.name };
        })
      );
    }
  }, [target, data]);

  const handleChangeDate = (date: string) => {
    compareViewModel.handleChangeDate(date, type);
  };

  console.log(data.compareCode, data.criteriaCode);

  return (
    <CardLayout
      style={{
        width: "100%",
        overflow: "auto",
        gap: "0",
      }}
    >
      {/* {isLoading.machine && <DefaultLoading />} */}
      <LayoutTitle>{title}</LayoutTitle>
      <FilterWrap>
        <MachineWrap>
          <CustomSelector
            options={machineOption}
            onClick={compareViewModel.handleClickMachine}
            defaultTitle="기계명"
            value={
              type === CompareType.CRITERIA
                ? target.criteriaMachine
                : target.compareMachine
            }
            type={type}
          />
          <DefaultDatePicker
            selected={
              type === CompareType.CRITERIA
                ? target.criteriaDate
                : target.compareDate
            }
            onChange={handleChangeDate}
            height="42px"
            width="200px"
          />
        </MachineWrap>
        <CustomSelector
          options={programOption}
          onClick={compareViewModel.handleClickProgram}
          defaultTitle="프로그램 선택"
          value={
            type === CompareType.CRITERIA
              ? target.criteriaProgram
              : target.compareProgram
          }
          type={type}
        />
      </FilterWrap>
      <CodeParagraph>
        {type === CompareType.CRITERIA ? data.criteriaCode : data.compareCode}
      </CodeParagraph>
    </CardLayout>
  );
}

export default inject("compareViewModel")(observer(CodeCompare));

const LayoutTitle = styled.p`
  z-index: 2 !important;
  background: ${StyleColor.LIGHT};
  width: 100%;
  text-align: left;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;

const FilterWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 16px 0;
`;
const MachineWrap = styled.div`
  display: flex;
  gap: 16px;
`;

const CodeParagraph = styled.p``;
