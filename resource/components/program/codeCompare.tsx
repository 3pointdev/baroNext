import DefaultDatePicker from "components/datePicker/defaultDatePicker";
import CustomSelector, { Options } from "components/input/customSelector";
import { StyleColor } from "config/color";
import { CompareType } from "config/constants";
import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import FunctionDto from "src/dto/program/function.dto";
import ProgramDto from "src/dto/program/program.dto";
import CompareViewModel from "src/viewModels/program/compare.viewModel";
import styled from "styled-components";

interface IProps {
  title: string;
  type: CompareType;
  machineList: ProgramDto[];
  compareViewModel?: CompareViewModel;
}

function CodeCompare({ title, type, compareViewModel, machineList }: IProps) {
  const { target, data } = compareViewModel;
  const [programOption, setProgramOption] = useState<Options[]>([]);
  const [machineOption, setMachineOption] = useState<Options[]>([]);

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

  useEffect(() => {
    setMachineOption(
      machineList.map((machine: ProgramDto) => {
        return { title: machine.name, id: +machine.machineNo };
      })
    );
  }, [machineList]);

  const handleChangeDate = (date: string) => {
    compareViewModel.handleChangeDate(date, type);
  };

  return (
    <Container
      style={{
        width: "100%",
        overflow: "auto",
        gap: "0",
      }}
    >
      <FilterWrap>
        <LayoutTitle>{title}</LayoutTitle>
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
            useToday
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
          disable={
            type === CompareType.CRITERIA
              ? compareViewModel.target.criteriaMachine < 1
              : compareViewModel.target.compareMachine < 1
          }
          disableText="기계를 먼저 선택해 주세요."
        />
      </FilterWrap>
      <CodeParagraph>
        <OverflowWrap>
          {type === CompareType.CRITERIA
            ? data.criteriaCode.map((line: string, index: number) => {
                const compareTarget = compareViewModel.compareTarget[index];
                return (
                  <div key={`code_criteria_${index}`}>
                    <p
                      className={
                        compareTarget?.includes(true) ? "different" : ""
                      }
                    >
                      {index}
                    </p>
                    <SyllableWrap>
                      {line.split("").map((code: string, key: number) => {
                        return (
                          <p
                            key={`criteria_text_syllable_${key}`}
                            className={compareTarget?.[key] ? "different" : ""}
                          >
                            {code}
                          </p>
                        );
                      })}
                    </SyllableWrap>
                  </div>
                );
              })
            : data.compareCode.map((line: string, index: number) => {
                const compareTarget = compareViewModel.compareTarget[index];
                return (
                  <div key={`code_compare_${index}`}>
                    <p
                      className={
                        compareTarget?.includes(true) ? "different" : ""
                      }
                    >
                      {index}
                    </p>
                    <SyllableWrap>
                      {line.split("").map((code: string, key: number) => {
                        return (
                          <p
                            key={`compare_text_syllable_${key}`}
                            className={compareTarget?.[key] ? "different" : ""}
                          >
                            {code}
                          </p>
                        );
                      })}
                    </SyllableWrap>
                  </div>
                );
              })}
        </OverflowWrap>
      </CodeParagraph>
    </Container>
  );
}

export default inject("compareViewModel")(observer(CodeCompare));

const Container = styled.div``;

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
  position: sticky;
  top: 0px;
  background: ${StyleColor.LIGHT};
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const MachineWrap = styled.div`
  display: flex;
  gap: 16px;

  & .option_wrap {
    z-index: 100;
  }
`;

const CodeParagraph = styled.div`
  margin-top: 16px;
  white-space: pre-line;
  line-height: 2;
  height: calc(100% - 240px);
`;

const OverflowWrap = styled.div`
  height: 100%;
  overflow: scroll;
  & > div {
    display: flex;
    gap: 16px;
  }
  & .different {
    color: ${StyleColor.WARNNING};
  }
`;

const SyllableWrap = styled.div`
  display: flex;
`;
