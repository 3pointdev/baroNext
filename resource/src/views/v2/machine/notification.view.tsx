import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageContainer from "components/container/pageContainer";
import DefaultInput from "components/input/defaultInput";
import Selector from "components/input/selector";
import SelectorOption from "components/input/selectorOption";
import LayoutHeader from "components/layout/layoutHeader";
import DefaultTable from "components/table/defaultTable";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import MachineSummaryDto from "src/dto/machine/machineSummary.dto";
import MachineViewModel from "src/viewModels/machine/machine.viewModel";
import styled from "styled-components";

interface IProps {
  machineViewModel: MachineViewModel;
}

function MachineNotificationView(props: IProps) {
  const machineViewModel = props.machineViewModel;

  useEffect(() => {
    machineViewModel.getList();
    machineViewModel.insertListNotification();
  }, []);

  const selectorStyle = {
    backgroundImage: `linear-gradient(45deg, transparent 50%, gray 50%),
linear-gradient(135deg, gray 50%, transparent 50%)`,
    backgroundPosition: `calc(100% - 16px) calc(1em + 2px),
calc(100% - 8px) calc(1em + 2px), calc(100% - 2.5em) 0.5em`,
    width: "120px",
    height: "42px",
  };

  return (
    <PageContainer style={{ gap: "16px" }}>
      <LayoutHeader
        start={machineViewModel.notiModel.startDay}
        end={machineViewModel.notiModel.endDay}
        onChange={machineViewModel.handleChangeDay}
        title="알람조회"
        datePickerType="range"
      >
        <Selector
          onChange={machineViewModel.handleChangeMachineFilter}
          style={selectorStyle}
          defaultValue={0}
        >
          <>
            <SelectorOption title="전체보기" value={0} />
            {machineViewModel.machineSummary.map(
              (machine: MachineSummaryDto, key: number) => {
                return (
                  <SelectorOption
                    title={machine.mid}
                    value={machine.id}
                    key={`machine_mid_filter_${key}`}
                  />
                );
              }
            )}
          </>
        </Selector>
        <DefaultInput
          type="text"
          value={machineViewModel.notiModel.searchKeyword}
          placeholder="검색할 알림을 입력하세요"
          onChange={machineViewModel.handleChangeSearchKeyword}
          onKeyDown={machineViewModel.handleKeyDownSearch}
          boxstyle={{ width: "220px", height: "42px", padding: "0" }}
          style={{
            height: "40px",
            padding: "0 12px",
          }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            onClick={machineViewModel.handleClickSearch}
          />
        </DefaultInput>
      </LayoutHeader>
      <TableLayout>
        <TablePadding>
          <DefaultTable
            header={machineViewModel.tableHeader}
            data={machineViewModel.notiList}
            isRowSpan={false}
            resultCount={`결과 ${machineViewModel.notiList.length.toLocaleString(
              "en-US",
              { style: "decimal", useGrouping: true }
            )}개`}
            onClickSort={machineViewModel.handleClickSort}
          />
        </TablePadding>
      </TableLayout>
    </PageContainer>
  );
}

export default inject("machineViewModel")(observer(MachineNotificationView));

const TableLayout = styled.section`
  overflow: hidden;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
`;

const TablePadding = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
`;
