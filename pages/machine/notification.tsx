import { inject, observer } from "mobx-react";
import MachineViewModel from "../../src/viewModels/machine/machine.viewModel";
import PageContainer from "../../components/container/pageContainer";
import RangeDatePickHeader from "../../components/header/rangeDatePickHeader";
import DefaultTable from "../../components/table/defaultTable";
import styled from "styled-components";
import { useEffect, useRef } from "react";
import Selector from "../../components/input/selector";
import SelectorOption from "../../components/input/selectorOption";
import { SortType } from "../../config/constants";
import DefaultInput from "../../components/input/defaultInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import MachineSummaryDto from "../../src/dto/machine/machineSummary.dto";

interface IProps {
  machineViewModel: MachineViewModel;
}

function MachineNotificationView(props: IProps) {
  const machineViewModel = props.machineViewModel;

  useEffect(() => {
    machineViewModel.getList();
    machineViewModel.insertListNotification();
  }, []);

  return (
    <PageContainer style={{ gap: "16px" }}>
      <RangeDatePickHeader
        start={machineViewModel.notiModel.startDay}
        end={machineViewModel.notiModel.endDay}
        onChange={machineViewModel.handleChangeDay}
        title="알람조회"
        childrenStyle={{ gap: "4px" }}
      >
        <Selector
          onChange={machineViewModel.handleChangeSort}
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%)`,
            backgroundPosition: `calc(100% - 16px) calc(1em + 2px),
    calc(100% - 8px) calc(1em + 2px), calc(100% - 2.5em) 0.5em`,
            width: "120px",
            height: "42px",
          }}
          defaultValue={SortType.DESCENDING}
        >
          <SelectorOption title="최신순" value={SortType.DESCENDING} />
          <SelectorOption title="과거순" value={SortType.ASCENDING} />
        </Selector>
        <Selector
          onChange={machineViewModel.handleChangeMachineFilter}
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%)`,
            backgroundPosition: `calc(100% - 16px) calc(1em + 2px),
    calc(100% - 8px) calc(1em + 2px), calc(100% - 2.5em) 0.5em`,
            width: "120px",
            height: "42px",
          }}
          defaultValue={"default"}
        >
          <>
            <SelectorOption title="전체보기" value={"default"} />
            {machineViewModel.machineSummary.map(
              (machine: MachineSummaryDto, key: number) => {
                return (
                  <SelectorOption
                    title={machine.mid}
                    value={machine.mid}
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
      </RangeDatePickHeader>
      <TableLayout>
        <TablePadding>
          <DefaultTable
            header={machineViewModel.tableHeader}
            data={machineViewModel.notiList.notifications}
            isRowSpan={false}
            resultCount={`결과 ${machineViewModel.notiList.notifications.length.toLocaleString(
              "en-US",
              { style: "decimal", useGrouping: true }
            )}개`}
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
