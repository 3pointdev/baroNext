import {
  faPenToSquare,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "components/alert/alert";
import CircleButton from "components/button/circleButton";
import PageContainer from "components/container/pageContainer";
import CardLayout from "components/layout/cardLayout";
import { inject, observer } from "mobx-react";
import { NextRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import MonitorDto from "src/dto/monitor/monitor.dto";
import MonitorListDto from "src/dto/monitor/monitorList.dto";
import MonitorViewModel from "src/viewModels/monitor/monitor.viewModel";
import styled from "styled-components";

interface IProps {
  monitorViewModel: MonitorViewModel;
  router: NextRouter;
}

function MonitorSettingView(props: IProps) {
  const monitorViewModel = props.monitorViewModel;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));
    monitorViewModel.getListMachine();
    monitorViewModel.getList();

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  const ButtonStyle = {
    style: {
      width: "16px",
      height: "16px",
    },
    iconStyle: {
      width: "12px",
      height: "12px",
    },
  };

  return (
    <PageContainer>
      <CardLayout style={{ height: "100%" }}>
        <LayoutTitle>모니터링 관리</LayoutTitle>
        <DragWrap>
          {monitorViewModel.list.length > 0 && (
            <DragMonitor.Wrap>
              {monitorViewModel.list.map(
                (monitor: MonitorListDto, key: number) => (
                  <DragDropContext
                    onDragEnd={monitorViewModel.handleDragEnd}
                    key={`${monitor.name}_dragable_${key}`}
                  >
                    <Droppable droppableId={`${monitor.name}`}>
                      {(provided: DroppableProvided) => (
                        <DragMonitor.Monitor
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          <span>{monitor.name}</span>
                          <DragMonitor.ButtonWrap className="monitor_button">
                            <CircleButton
                              icon={faPenToSquare}
                              onClick={
                                monitorViewModel.handleClickModifyMonitor
                              }
                              value={monitor.id}
                              {...ButtonStyle}
                            />
                            <CircleButton
                              icon={faXmark}
                              {...ButtonStyle}
                              onClick={
                                monitorViewModel.handleClickDeleteMonitor
                              }
                              value={monitor.id}
                            />
                          </DragMonitor.ButtonWrap>
                          <DragMonitor.ItemWrap>
                            {monitor.data.map((item: MonitorDto, index) => (
                              <Draggable
                                key={`${item.id}_${index}_${item.mid}`}
                                draggableId={`${item.itemId}_index`}
                                index={index}
                              >
                                {(provided: DraggableProvided) => (
                                  <DragMonitor.Item
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <p>{item.machineNo}</p>
                                    <h5>{item.mid}</h5>
                                    <DragMonitor.ButtonWrap>
                                      <CircleButton
                                        icon={faPenToSquare}
                                        {...ButtonStyle}
                                        onClick={
                                          monitorViewModel.handleClickModifyMachine
                                        }
                                        value={item.itemId}
                                      />
                                      <CircleButton
                                        icon={faXmark}
                                        {...ButtonStyle}
                                        onClick={
                                          monitorViewModel.handleClickDeleteMachine
                                        }
                                        value={item.itemId}
                                      />
                                    </DragMonitor.ButtonWrap>
                                  </DragMonitor.Item>
                                )}
                              </Draggable>
                            ))}
                            {monitor.data.length < 4 && (
                              <DragMonitor.Item
                                className="add_item"
                                onClick={monitorViewModel.handleClickAddMachine}
                                data-id={monitor.id}
                                data-index={monitor.data.length + 1}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </DragMonitor.Item>
                            )}
                          </DragMonitor.ItemWrap>
                          {provided.placeholder}
                        </DragMonitor.Monitor>
                      )}
                    </Droppable>
                  </DragDropContext>
                )
              )}
              <DragMonitor.AddMonitor
                onClick={monitorViewModel.handleClickAddMonitor}
              >
                <FontAwesomeIcon icon={faPlus} />
              </DragMonitor.AddMonitor>
            </DragMonitor.Wrap>
          )}
        </DragWrap>
      </CardLayout>
      <Alert
        title={monitorViewModel.alertState.title}
        isActive={monitorViewModel.alertState.isActive}
        isPositive={monitorViewModel.alertState.isPositive}
      />
    </PageContainer>
  );
}

export default inject("monitorViewModel")(observer(MonitorSettingView));

const LayoutTitle = styled.h2`
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

const DragWrap = styled.div`
  width: 100%;
`;

const DragMonitor = {
  Wrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 24px;
  `,
  Monitor: styled.div`
    position: relative;
    flex-shrink: 0;
    background: #e1ebfc;
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 18vw;
    min-width: 180px;
    height: 324px;
    box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);

    & span {
      font-weight: 600;
      font-size: 18px;
    }
  `,
  ItemWrap: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-radius: 8px;
  `,
  Item: styled.div`
    position: relative;
    height: 64px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
    z-index: 10;

    & p {
      position: absolute;
      left: 16px;
    }

    &.add_item {
      z-index: 9;
      cursor: pointer;
    }
  `,
  ButtonWrap: styled.div`
    position: absolute;
    display: flex;
    gap: 4px;
    right: 8px;
    top: 8px;

    font-size: 14px;
    cursor: pointer;

    &.monitor_button {
      top: 16px;
      right: 12px;
    }
  `,

  AddMonitor: styled.div`
    flex-shrink: 0;
    background: #e5e5e5;
    background: #e5e5e5;
    border-radius: 8px;
    width: 18vw;
    min-width: 180px;
    box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 32px;

    &:hover {
      background: #d9d9d9;
    }
  `,
};
