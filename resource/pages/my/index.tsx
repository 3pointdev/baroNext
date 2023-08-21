import { inject, observer } from "mobx-react";
import UserViewModel from "../../src/viewModels/user/user.viewModel";
import { MouseEvent, useEffect, useState } from "react";
import PageContainer from "../../components/container/pageContainer";
import CardLayout from "../../components/layout/cardLayout";
import styled from "styled-components";
import UserInfomation from "../../components/user/userInformation";
import DefaultButton from "../../components/button/defaultButton";
import DotList from "../../components/list/DotList";
import SwitchButton from "../../components/button/switchButton";
import DefaultInput from "../../components/input/defaultInput";
import DefaultBadge from "../../components/badge/defaultBadge";
import DefaultModal from "../../components/modal/defaultModal";
import PostCode from "../../components/tools/postCode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

interface IProps {
  userViewModel: UserViewModel;
}

function MyPageView(props: IProps) {
  const userViewModel = props.userViewModel;
  const [isOpenModifyModal, setIsOpenModifyModal] = useState<boolean>(false);

  useEffect(() => {
    userViewModel.popAuth();
    userViewModel.getMe();
  }, []);

  const handleClickOpenModifyModal = (event: MouseEvent<HTMLButtonElement>) => {
    setIsOpenModifyModal(!isOpenModifyModal);
  };

  return (
    <PageContainer
      style={{
        flexDirection: "row",
        justifyContent: "center",
        overflow: "auto",
      }}
    >
      <CardWrap className="left">
        <CardLayout className="infomation" style={{ alignItems: "center" }}>
          <Profile.Image src={userViewModel.user.profileImage} />
          <Profile.Name>{userViewModel.user.enterprise}</Profile.Name>
          <UserInfomation data={userViewModel.user} />
          <DefaultButton
            title="수정하기"
            onClick={handleClickOpenModifyModal}
            style={{ width: "100px", height: "40px", fontSize: "14px" }}
          />
        </CardLayout>
        <CardLayout className="setup">
          <CardTitle>바로팩토리 설치 정보</CardTitle>
          <DotList list={["엣지 1개", "모니터 3개", "생산관리 플랫폼"]} />
        </CardLayout>
        <CardLayout className="contract">
          <CardTitle>계약정보</CardTitle>
          <DefaultBadge title="베이직" style={{ left: "88px", top: "12px" }} />
          <DotList list={["계약일 : ", "계약종료일 : "]} />
        </CardLayout>
        <CardLayout className="message">
          <CardTitle>문자설정</CardTitle>
          <SwitchButton
            checked={userViewModel.smsChecked}
            onChange={userViewModel.handleChangeSmsCheck}
          />
          <DotList
            list={[
              "작업완료시, 관리자 연락처로 문자 메세지가 자동 발송됩니다.",
            ]}
          />
        </CardLayout>
      </CardWrap>
      <CardWrap className="right">
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
            />
          </AccountWrap>
        </CardLayout>
        <CardLayout className="monitor">
          <CardTitle>모니터 관리 계정</CardTitle>
          <SubTitle>아이디 변경</SubTitle>
          <AccountWrap>
            <DefaultInput
              value={userViewModel.monitorAccountModel.id}
              onChange={userViewModel.handleChangeMonitorAccount}
              type="text"
              boxstyle={{ flexShrink: "unset", height: "40px" }}
              placeholder="아아디"
              style={{ height: "24px" }}
              useLabel
              name="monitoring_account_id"
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
              name="monitoring_account_password"
              value={userViewModel.monitorAccountModel.password}
              onChange={userViewModel.handleChangeMonitorAccount}
              type={
                userViewModel.monitorAccountModel.isViewPassword
                  ? "text"
                  : "password"
              }
              placeholder="비밀번호"
              boxstyle={{ flexShrink: "unset", height: "40px" }}
              style={{ height: "24px" }}
              validState={userViewModel.monitorAccountModel.passwordValid}
              validText={"최소 4자 이상으로 설정해 주세요."}
            >
              <FontAwesomeIcon
                icon={
                  userViewModel.monitorAccountModel.isViewPassword
                    ? faEye
                    : faEyeSlash
                }
                className="view_password_icon"
                onClick={userViewModel.handleToggleViewPassword}
                data-id={"monitor"}
              />
            </DefaultInput>
            <DefaultInput
              useLabel
              name="monitoring_account_passwordCheck"
              value={userViewModel.monitorAccountModel.passwordCheck}
              onChange={userViewModel.handleChangeMonitorAccount}
              type={
                userViewModel.monitorAccountModel.isViewPassword
                  ? "text"
                  : "password"
              }
              placeholder="비밀번호 확인"
              boxstyle={{ flexShrink: "unset", height: "40px" }}
              style={{ height: "24px" }}
              validState={userViewModel.monitorAccountModel.passwordCheckValid}
              validText={"비밀번호를 한번 더 입력해주세요."}
            >
              <FontAwesomeIcon
                icon={
                  userViewModel.monitorAccountModel.isViewPassword
                    ? faEye
                    : faEyeSlash
                }
                className="view_password_icon"
                onClick={userViewModel.handleToggleViewPassword}
                data-id={"monitor"}
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
            />
          </AccountWrap>
        </CardLayout>
      </CardWrap>
      <DefaultModal
        isActive={isOpenModifyModal}
        onClick={handleClickOpenModifyModal}
      >
        <CardTitle style={{ fontSize: "20px" }}>청구서 정보 변경</CardTitle>
        <InputWrap>
          <DefaultInput
            useLabel
            name="company_name"
            value={userViewModel.billInformationModel.name}
            onChange={userViewModel.handleChangeBillInfomation}
            type="text"
            placeholder="회사명"
            boxstyle={{ flexShrink: "unset", height: "48px" }}
            style={{ height: "32px" }}
          />
          <DefaultInput
            useLabel
            name="company_license"
            value={userViewModel.billInformationModel.license}
            onChange={userViewModel.handleChangeBillInfomation}
            type="text"
            placeholder="사업자번호"
            boxstyle={{ flexShrink: "unset", height: "48px" }}
            style={{ height: "32px" }}
          />
          <DefaultInput
            useLabel
            name="company_president"
            value={userViewModel.billInformationModel.president}
            onChange={userViewModel.handleChangeBillInfomation}
            type="text"
            placeholder="대표자"
            boxstyle={{ flexShrink: "unset", height: "48px" }}
            style={{ height: "32px" }}
          />
          <DefaultInput
            useLabel
            name="company_email"
            value={userViewModel.billInformationModel.email}
            onChange={userViewModel.handleChangeBillInfomation}
            type="text"
            placeholder="이메일"
            boxstyle={{ flexShrink: "unset", height: "48px" }}
            style={{ height: "32px" }}
          />
          <DefaultInput
            useLabel
            name="company_contact"
            value={userViewModel.billInformationModel.contact}
            onChange={userViewModel.handleChangeBillInfomation}
            type="text"
            placeholder="회사 연락처"
            boxstyle={{ flexShrink: "unset", height: "48px" }}
            style={{ height: "32px" }}
          />
          <DefaultInput
            useLabel
            name="company_zip"
            value={userViewModel.billInformationModel.zip}
            type="text"
            placeholder="우편번호"
            boxstyle={{ flexShrink: "unset", height: "48px" }}
            style={{ height: "32px" }}
            readOnly
            onClick={userViewModel.handleClickOpenAddressModal}
          />
          <DefaultInput
            useLabel
            name="company_address"
            value={userViewModel.billInformationModel.address}
            type="text"
            placeholder="회사주소"
            boxstyle={{
              flexShrink: "unset",
              height: "48px",
              gridColumn: "1 / 3",
            }}
            style={{ height: "32px" }}
            readOnly
            onClick={userViewModel.handleClickOpenAddressModal}
          />
        </InputWrap>
        <ButtonWrap>
          <DefaultButton
            title="취소"
            style={{ width: "120px", color: "#000" }}
            activeColor="#fff"
            onClick={handleClickOpenModifyModal}
          />
          <DefaultButton
            title="변경"
            style={{ width: "120px" }}
            dynamic
            disableColor="#d9d9d9"
            isActive={false}
          />
        </ButtonWrap>
      </DefaultModal>
      <DefaultModal
        onClick={userViewModel.handleClickOpenAddressModal}
        isActive={userViewModel.isOpenAddress}
        style={{ width: "635px", height: "448px" }}
      >
        <PostCode
          setData={userViewModel.setSearchAddress}
          isOpen={userViewModel.isOpenAddress}
        />
      </DefaultModal>
    </PageContainer>
  );
}

export default inject("userViewModel")(observer(MyPageView));

const CardWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
  margin-bottom: 16px;
  height: max-content;

  &.left {
    width: 30vw;
    min-width: 186px;
  }

  &.right {
    width: 60vw;
    min-width: 380px;
  }

  & .infomation {
    padding-top: 48px;
  }
`;

const CardTitle = styled.h4`
  margin-bottom: 16px;
`;

const SubTitle = styled.h5`
  margin-top: 8px;
`;

const Profile = {
  Image: styled.img`
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
  `,
  Name: styled.h4`
    font-weight: 600;
    font-size: 20px;
    line-height: 2;
  `,
};

const AccountWrap = styled.div`
  display: flex;
  gap: 8px;
`;

const InputWrap = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 24px;
  justify-content: space-around;
  align-items: center;
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;
