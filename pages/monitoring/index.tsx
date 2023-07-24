import { inject, observer } from "mobx-react";
import { useEffect, useState } from "react";
import MainViewModel from "../../src/viewModels/main/main.viewModel";
import React from "react";
import styled from "styled-components";
import moment from "moment";
import BarofactorySquare from "../../public/images/logo/barofactory-square";

interface IProps {
  mainViewModel: MainViewModel;
}

function MonitoringView(props: IProps) {
  const mainViewModel = props.mainViewModel;
  const [time, setTime] = useState<string>("");

  const getFormattedTime = () => {
    return moment().format("YYYY.MM.DD HH:mm:ss");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getFormattedTime());
    }, 1000);

    setTime(getFormattedTime());
    mainViewModel.initialize();

    return () => {
      clearInterval(interval);
      if (mainViewModel.socket?.socket?.readyState === WebSocket.OPEN) {
        mainViewModel.socket.disconnect();
      }
    };
  }, []);

  return (
    <MonitoringContainer>
      <Header.Wrap>
        <Header.LeftSide>
          <BarofactorySquare color={"#ffffff"} />
          <Header.Time>{time}</Header.Time>
        </Header.LeftSide>
        <Header.Title>전체공정현황</Header.Title>
        <Header.Enterprise>{mainViewModel.auth.name}</Header.Enterprise>
      </Header.Wrap>
      <Article.Wrap>
        <Article.Head>
          <tr>
            <th>호기</th>
            <th>기계명</th>
            <th>공정</th>
            <th>진행률</th>
            <th>완료/목표</th>
            <th>공정 시작일</th>
            <th>완료 예정일</th>
            <th>실CT</th>
            <th>구분</th>
          </tr>
        </Article.Head>
        <Article.Body></Article.Body>
      </Article.Wrap>
    </MonitoringContainer>
  );
}

export default inject("mainViewModel")(observer(MonitoringView));

const MonitoringContainer = styled.div`
  background: #2e3257;
  height: 100vh;
  & * {
    color: #fff;
  }
`;

const Header = {
  Wrap: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 64px;
    padding: 0 16px;
  `,
  LeftSide: styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 24px;
  `,
  Time: styled.p`
    height: 34px;
    font-size: 34px;
  `,
  Title: styled.p`
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    font-size: 30px;
    font-weight: 600;
  `,
  Enterprise: styled.p`
    font-size: 28px;
  `,
};

const Article = {
  Wrap: styled.table`
    width: 100vw;
  `,
  Head: styled.thead`
    width: 100vw;
    & th {
      background: #c4c4c4;
    }
  `,
  Body: styled.tbody``,
};
