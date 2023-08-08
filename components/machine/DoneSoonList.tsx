import { useEffect, useState } from "react";
import MachineDto from "../../src/dto/machine/machine.dto";
import styled from "styled-components";
import IsEmpty from "../warning/isEmpty";
import ProgressCircle from "../progress/progressCircle";
import timeModule from "../../src/modules/time.module";

interface IProps {
  list: MachineDto[];
}

export default function DoneMachine({ list }: IProps) {
  const [doneMachine, setDoneMachine] = useState<MachineDto[]>([]);

  useEffect(() => {
    const newMachine = [];
    for (let index = 0; index < list.length; index++) {
      if (list[index].doneTime > 0 && list[index].doneTime <= 3600000) {
        newMachine.push(list[index]);
      }
    }

    setDoneMachine(newMachine.sort((a, b) => a.doneTime - b.doneTime));
  }, [list]);

  return (
    <Container>
      {doneMachine.length > 0 ? (
        <>
          <ProgressCircle
            maxValue={3600000}
            minValue={0}
            value={3600000 - doneMachine[0]?.doneTime}
            innerText={timeModule.msToHHMM(doneMachine[0]?.doneTime)}
          />
          <SoonList>
            <thead>
              <tr>
                <th className="table_head_machine_no">호기</th>
                <th align="left">기계명</th>
                <th>남은시간</th>
              </tr>
            </thead>
            <tbody>
              {doneMachine.map((soonMachine: MachineDto, index: number) => {
                return (
                  <tr key={`done_soon_machine_${index}`}>
                    <td>{soonMachine?.machineNo}</td>
                    <td align="left">{soonMachine?.mid}</td>
                    <td>{timeModule.msToHHMM(soonMachine?.doneTime)}</td>
                  </tr>
                );
              })}
            </tbody>
          </SoonList>
        </>
      ) : (
        <IsEmpty title="현재 1시간 미만의 공정 임박 기계가 없습니다." />
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
`;

const SoonList = styled.table`
  border-collapse: collapse;
  width: 100%;

  & * {
    font-size: 12px;
    font-weight: 500;
  }

  & thead {
    height: 32px;
    border-bottom: 1px solid #d5d7da;
  }

  & .table_head_machine_no {
    width: 56px;
  }

  & tbody tr {
    height: 32px;
    text-align: center;
  }
  & tbody tr td {
    font-size: 14px;
    font-weight: 700;
  }

  & tbody tr:first-child td {
    color: #3a79ec;
    font-size: 14px;
    font-weight: 700;
  }
`;
