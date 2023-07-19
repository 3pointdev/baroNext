import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import MainViewModel from "../src/viewModels/main/main.viewModel";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MainView(props: any) {
  const mainViewModel: MainViewModel = props.mainViewModel;
  const [time, setTime] = useState<string>("");

  function getFormattedTime() {
    return moment().format("YYYY.MM.DD HH:mm:ss");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    setTime(getFormattedTime());
    mainViewModel.getMachineList();
    mainViewModel.getProcessedQuantity();
    mainViewModel.initializeSocket(mainViewModel.onMessage);

    return () => {
      clearInterval(interval);
      if (mainViewModel.socket?.socket?.readyState === WebSocket.OPEN) {
        mainViewModel.socket.disconnect();
      }
    };
  }, []);

  return (
    <Container.Page>
      <Container.Time>{time}</Container.Time>
      <Container.RowFlex>
        <Container.Chart>
          <p>기계별 가공 수량</p>
          {mainViewModel.processChart ? (
            <Bar
              options={mainViewModel.processChart.options}
              data={mainViewModel.processChart.data}
            />
          ) : (
            <div>
              <p>가공 기계가 없습니다.</p>
            </div>
          )}
        </Container.Chart>
        <Container.Imminent>
          <p>공정 임박 기계</p>
        </Container.Imminent>
      </Container.RowFlex>
    </Container.Page>
  );
}

export default inject("mainViewModel")(observer(MainView));

const Container = {
  Page: styled.div`
    margin: 0 auto;
    max-width: 1200px;
    height: 100vh;
    background: #f7f8f8;
    padding: 32px;
  `,
  RowFlex: styled.div`
    display: flex;
    gap: 32px;
  `,
  Time: styled.p`
    width: 100%;
    height: 24px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
  `,
  Chart: styled.section`
    flex-shrink:0;
    background: #fff;
    border-radius: 8px;
    width: 690px;
    height 410px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: space-between;
    padding: 24px;

    & p {
      width: 100%;
      font-weight: 600;
      text-align: center;
    }

    & canvas {
      max-width: 690px !important;
      max-height: 428px !important;
      margin: -12px 0 0 -12px;
  }`,
  Imminent: styled.section`
    background: #fff;
    border-radius: 8px;
    width: 100%;
    height 410px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content: space-between;
    padding: 24px;

    & p {
      width: 100%;
      font-weight: 600;
      text-align: center;
    }

    & canvas {
      max-width: 690px !important;
      max-height: 428px !important;
      margin: -12px 0 0 -12px;
  }`,
};
