import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageContainer from "components/container/pageContainer";
import CustomSelector from "components/input/customSelector";
import DefaultInput from "components/input/defaultInput";
import LayoutHeader from "components/layout/layoutHeader";
import DefaultTable from "components/table/defaultTable";
import { inject, observer } from "mobx-react";
import { NextRouter } from "next/router";
import { useEffect } from "react";
import MachineViewModel from "src/viewModels/machine/machine.viewModel";
import styled from "styled-components";

interface IProps {
  machineViewModel: MachineViewModel;
  router: NextRouter;
}

function MachineNotificationView(props: IProps) {
  const machineViewModel = props.machineViewModel;

  useEffect(() => {
    machineViewModel.getList();
    machineViewModel.insertListNotification();
  }, []);

  return (
    <PageContainer style={{ gap: "16px" }}>
      <LayoutHeader
        start={machineViewModel.notiModel.startDay}
        end={machineViewModel.notiModel.endDay}
        onChange={machineViewModel.handleChangeDay}
        title="알람조회"
        datePickerType="range"
      >
        <CustomSelector
          options={machineViewModel.machineSummary.map((machine) => {
            return { title: machine.mid, id: machine.id };
          })}
          onClick={machineViewModel.handleClickFilter}
          style={{ width: "200px" }}
          defaultTitle="전체보기"
          defaultValue={0}
          value={machineViewModel.notiModel.mkey}
        />

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
