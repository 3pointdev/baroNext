import { inject, observer } from "mobx-react";
import UserViewModel from "src/viewModels/user/user.viewModel";
import { MouseEvent, useEffect, useState } from "react";
import PageContainer from "components/container/pageContainer";
import CardLayout from "components/layout/cardLayout";
import styled from "styled-components";
import DefaultButton from "components/button/defaultButton";
import DefaultInput from "components/input/defaultInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { StyleColor } from "config/constants";
import Alert from "components/alert/alert";

interface IProps {
  userViewModel: UserViewModel;
}

function MyPageView(props: IProps) {
  const userViewModel = props.userViewModel;
  const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);

  useEffect(() => {}, []);

  const handleClickPasswordUpdate = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpenAlert(true);
    setTimeout(() => {
      setIsOpenAlert(false);
    }, 3000);
  };

  return (
    <PageContainer>
      <CardLayout className="account">
        <CardTitle>로그인 등록 계정관리</CardTitle>
        <AccountWrap>
          <DefaultInput
            value={userViewModel.loginAccountModel.name}
            onChange={userViewModel.handleChangeLoginAccount}
            type="text"
            boxstyle={{ flexShrink: "unset", height: "40px" }}
            placeholder="담당자 이름"
            style={{ height: "24px" }}
            useLabel
            name="admin_name"
          />

          <DefaultInput
            name="admin_phone"
            useLabel
            value={userViewModel.loginAccountModel.phone}
            onChange={userViewModel.handleChangeLoginAccount}
            type="text"
            placeholder="계정전용 핸드폰 번호"
            boxstyle={{ flexShrink: "unset", height: "40px" }}
            style={{ height: "24px" }}
          />
          <DefaultButton
            title="변경하기"
            style={{
              width: "100px",
              height: "40px",
              fontSize: "14px",
              flexShrink: "0",
            }}
          />
        </AccountWrap>
      </CardLayout>
      <CardLayout className="admin">
        <CardTitle>관리자 계정</CardTitle>
        <SubTitle>아이디 변경</SubTitle>
        <AccountWrap>
          <DefaultInput
            value={userViewModel.adminAccountModel.id}
            onChange={userViewModel.handleChangeAdminAccount}
            type="text"
            boxstyle={{ flexShrink: "unset", height: "40px" }}
            placeholder="아아디"
            style={{ height: "24px" }}
            name="admin_account_id"
            useLabel
          />
          <DefaultButton
            title="변경하기"
            style={{
              width: "100px",
              height: "40px",
              fontSize: "14px",
              flexShrink: "0",
            }}
          />
        </AccountWrap>
        <SubTitle>비밀번호 변경</SubTitle>
        <AccountWrap>
          <DefaultInput
            useLabel
            value={userViewModel.adminAccountModel.password}
            onChange={userViewModel.handleChangeAdminAccount}
            type={
              userViewModel.adminAccountModel.isViewPassword
                ? "text"
                : "password"
            }
            placeholder="비밀번호"
            boxstyle={{ flexShrink: "unset", height: "40px" }}
            style={{ height: "24px" }}
            name="admin_account_password"
            validState={userViewModel.adminAccountModel.passwordValid}
            validText={"최소 4자 이상으로 설정해 주세요."}
          >
            <FontAwesomeIcon
              icon={
                userViewModel.adminAccountModel.isViewPassword
                  ? faEye
                  : faEyeSlash
              }
              className="view_password_icon"
              onClick={userViewModel.handleToggleViewPassword}
              data-id={"admin"}
            />
          </DefaultInput>
          <DefaultInput
            useLabel
            value={userViewModel.adminAccountModel.passwordCheck}
            onChange={userViewModel.handleChangeAdminAccount}
            type={
              userViewModel.adminAccountModel.isViewPassword
                ? "text"
                : "password"
            }
            placeholder="비밀번호 확인"
            boxstyle={{ flexShrink: "unset", height: "40px" }}
            style={{ height: "24px" }}
            name="admin_account_passwordCheck"
            validState={userViewModel.adminAccountModel.passwordCheckValid}
            validText={"비밀번호를 한번 더 입력해주세요."}
          >
            <FontAwesomeIcon
              icon={
                userViewModel.adminAccountModel.isViewPassword
                  ? faEye
                  : faEyeSlash
              }
              className="view_password_icon"
              onClick={userViewModel.handleToggleViewPassword}
              data-id={"admin"}
            />
          </DefaultInput>
          <DefaultButton
            title="변경하기"
            style={{
              width: "100px",
              height: "40px",
              fontSize: "14px",
              flexShrink: "0",
            }}
            onClick={handleClickPasswordUpdate}
          />
        </AccountWrap>
      </CardLayout>
      <Alert title={`변경이 완료 되었습니다.`} isActive={isOpenAlert} />
    </PageContainer>
  );
}

export default inject("userViewModel")(observer(MyPageView));

const CardTitle = styled.h4`
  font-size: 24px;
  font-weight: 600;
  padding-bottom: 16px;
  border-bottom: 1px solid ${StyleColor.HOVER};
`;

const SubTitle = styled.h5`
  font-size: 20px;
  font-weight: 500;
  padding-top: 16px;
`;

const AccountWrap = styled.div`
  display: flex;
  gap: 8px;
`;
