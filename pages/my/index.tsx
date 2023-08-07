import { inject, observer } from "mobx-react";
import UserViewModel from "../../src/viewModels/user/user.viewModel";
import { useEffect } from "react";
import PageContainer from "../../components/container/pageContainer";
import CardLayout from "../../components/layout/cardLayout";
import styled from "styled-components";

interface IProps {
  userViewModel: UserViewModel;
}

function MyPageView(props: IProps) {
  const userViewModel = props.userViewModel;

  useEffect(() => {
    userViewModel.getMe();
  }, []);

  console.log(userViewModel.user);
  console.log(userViewModel.auth);
  return (
    <PageContainer style={{ flexDirection: "row" }}>
      <CardWrap className="left">
        <CardLayout className="infomation">
          <Profile.Image src={userViewModel.user.profileImage} />
          {/* <Profile.Name src={userViewModel.auth.profileImage} /> */}
          <CardTitle>기본정보</CardTitle>
        </CardLayout>
        <CardLayout className="setup">
          <CardTitle>바로팩토리 설치 정보</CardTitle>
        </CardLayout>
        <CardLayout className="contract">
          <CardTitle>계약정보</CardTitle>
        </CardLayout>
        <CardLayout className="message">
          <CardTitle>문자설정</CardTitle>
        </CardLayout>
      </CardWrap>
      <CardWrap className="right">
        <CardLayout className="account">
          <CardTitle>로그인 등록 계정관리</CardTitle>
        </CardLayout>
        <CardLayout className="admin">
          <CardTitle>관리자 계정</CardTitle>
        </CardLayout>
        <CardLayout className="monitor">
          <CardTitle>모니터 관리 계정</CardTitle>
        </CardLayout>
      </CardWrap>
    </PageContainer>
  );
}

export default inject("userViewModel")(observer(MyPageView));

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;

  & .infomation {
  }

  & .setup {
  }

  & .contract {
  }

  & .message {
  }

  & .account {
  }

  & .admin {
  }

  & .monitor {
  }
`;

const CardTitle = styled.h4``;

const Profile = {
  Image: styled.img``,
};
