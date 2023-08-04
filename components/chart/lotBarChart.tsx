import { defaults } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import styled from "styled-components";
import LotDto from "../../src/dto/report/lot.dto";
import chartModule from "../../src/modules/chart.module";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  LineController,
  BarController
);

interface IProps {
  data: LotDto[];
  averageLotTime: number;
}

export default function LotBarChart({ data = [], averageLotTime }: IProps) {
  //교체시간을 달성율로 변환하는 함수
  const calculateProgressPercent = (numbers: number[], criteria: number) => {
    const progressPercent = numbers.map((time) => {
      const percent = (criteria / time) * 100;
      return Math.round(percent);
    });
    return progressPercent;
  };

  //ms의 시간을 sec로 변환
  const dataArray = data.map((lot: LotDto) => lot.idle / 1000);

  //infinite를 제거하고 달성율 변환
  const persents = calculateProgressPercent(
    dataArray.filter((value) => Number.isFinite(value)),
    averageLotTime
  );

  // Bar의 배경색을 결정하는 함수
  const getBarBackgroundColor = (value) => {
    return value > 100 ? "rgb(125, 134, 153)" : "rgb(255, 77, 73)";
  };

  const chartData = {
    labels: persents.map((_, index) => index + 1),
    datasets: [
      {
        label: "Data",
        data: persents,
        backgroundColor: persents.map((value) => getBarBackgroundColor(value)),
      },
    ],
  };

  const chartOptions = chartModule.setChart({
    tooltip: {
      enabled: false,
    },
    x: {
      display: false,
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
      max: 45, // 축의 최대값을 강제합니다.
      min: 0, // 축의 최소값을 강제합니다.
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
      beginAtZero: true,
      max: 200,
      min: 0,
    },
    aspect: false,
  });
  return (
    <Container>
      <TitleBadge>준비교체 그래프</TitleBadge>
      <CrossLine />
      <ChartWrap count={data.length}>
        <Bar data={chartData} options={chartOptions} />
      </ChartWrap>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const ChartWrap = styled.div<{ count: number }>`
  position: relative;
  overflow-y: hidden;
  overflow-x: auto;
  height: 104px;
  max-width: 100%;
  margin-top: 32px;

  & canvas {
    position: relative;
    width: 100% !important;
    min-width: ${({ count }) => count * 6}px !important;
    max-height: 100%;
  }
`;

const CrossLine = styled.div`
  position: absolute;
  top: 61%;
  z-index: 1;
  width: 100%;
  border: 1px dashed orange;
`;

const TitleBadge = styled.div`
  position: absolute;
  right: 16px;
  top: 0px;
  border: 1px solid #eaeaec;
  background: none;
  border-radius: 8px;
  padding: 4px 16px;
  font-size: 14px;
  font-weight: 700;
`;
