import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Alert from "components/alert/alert";
import DefaultButton from "components/button/defaultButton";
import PageContainer from "components/container/pageContainer";
import DefaultInput from "components/input/defaultInput";
import CardLayout from "components/layout/cardLayout";
import { StyleColor } from "config/constants";
import { inject, observer } from "mobx-react";
import { useEffect } from "react";
import UserViewModel from "src/viewModels/user/user.viewModel";
import styled from "styled-components";

interface IProps {
  userViewModel: UserViewModel;
}

function MyPageView(props: IProps) {
  const userViewModel = props.userViewModel;

  useEffect(() => {}, []);

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
            validState={userViewModel.loginAccountModel.nameValid}
            validText={"최소 4자 이상으로 설정해 주세요."}
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
            validState={userViewModel.loginAccountModel.phoneValid}
            validText={`"-"를 제외한 휴대폰번호를 입력해 주세요.`}
          />
          <DefaultButton
            title="변경하기"
            style={{
              width: "100px",
              height: "40px",
              fontSize: "14px",
              flexShrink: "0",
            }}
            onClick={userViewModel.handleClickUserUpdate}
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
            validState={userViewModel.adminAccountModel.idValid}
            validText={"최소 4자 이상으로 설정해 주세요."}
          />
          <DefaultButton
            title="변경하기"
            style={{
              width: "100px",
              height: "40px",
              fontSize: "14px",
              flexShrink: "0",
            }}
            onClick={userViewModel.handleClickAccountUpdate}
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
            onClick={userViewModel.handleClickPasswordUpdate}
          />
        </AccountWrap>
      </CardLayout>
      <Alert
        title={`변경이 완료 되었습니다.`}
        isActive={userViewModel.isOpenAlert}
      />
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
