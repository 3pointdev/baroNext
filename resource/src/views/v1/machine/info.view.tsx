import { inject, observer } from "mobx-react";
import PageContainer from "components/container/pageContainer";
import CardLayout from "components/layout/cardLayout";
import MachineViewModel from "src/viewModels/machine/machine.viewModel";
import { useEffect } from "react";
import MachineSummaryDto from "src/dto/machine/machineSummary.dto";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

interface IProps {
  machineViewModel: MachineViewModel;
}

function MachineInfoView(props: IProps) {
  const machineViewModel = props.machineViewModel;

  useEffect(() => {
    machineViewModel.getList();
  }, []);

  return (
    <PageContainer>
      <CardLayout style={{ height: "100%" }}>
        <LayoutTitle>기계정보관리</LayoutTitle>
        <MachineWrap>
          {machineViewModel.machineSummary.map(
            (machine: MachineSummaryDto, key: number) => {
              return (
                <MachineItem key={`machine_edit_${key}`}>
                  <MachineNumber>{machine.machineNo}</MachineNumber>
                  <p>{machine.mid}</p>
                  <IconBox
                    onClick={machineViewModel.handleClickEdit}
                    data-id={machine.id}
                  >
                    <EditIcon icon={faPenToSquare} />
                  </IconBox>
                </MachineItem>
              );
            }
          )}
        </MachineWrap>
      </CardLayout>
    </PageContainer>
  );
}

export default inject("machineViewModel")(observer(MachineInfoView));

const LayoutTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

const MachineWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media screen and (max-width: 1258px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 950px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MachineItem = styled.div`
  position: relative;
  box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
  background: #e1ebfc;
  display: flex;
  align-items: center;
  width: calc(100% - 16px);
  height: 64px;
  padding: 8px;
  gap: 32px;
  font-weight: 600;
  font-size: 16px;
  line-height: 1;
`;

const MachineNumber = styled.p`
  background: #f2f6fe;
  width: 72px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconBox = styled.div`
  cursor: pointer;
  transition: all 0.4s;
  border-radius: 50%;
  position: absolute;
  right: 8px;
  top: 8px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(200, 200, 200, 0.5);
  }
`;
const EditIcon = styled(FontAwesomeIcon)`
  width: 16px;
  height: 16px;
`;
