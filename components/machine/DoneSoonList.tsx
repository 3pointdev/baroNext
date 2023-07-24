import { useEffect, useState } from "react";
import MachineDto from "../../src/dto/machine/machine.dto";
import styled from "styled-components";
import IsEmpty from "../warning/isEmpty";

export default function DoneMachine({ list }) {
  const [doneMachine, setDoneMachine] = useState<number[]>([]);

  useEffect(() => {
    setDoneMachine(
      list.findIndex(
        (item: MachineDto) => item.doneTime < 3600000 && item.doneTime > 0
      )
    );
  }, [list]);

  return (
    <Container>
      {doneMachine.length > 0 ? (
        doneMachine.map((index: number) => {
          return (
            <div key={`done_soon_machine_${index}`}>{list[index].doneTime}</div>
          );
        })
      ) : (
        <IsEmpty title="현재 1시간 미만의 공정 임박 기계가 없습니다." />
      )}
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
`;
