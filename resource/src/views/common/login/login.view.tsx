import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WorkEnvironmentBadge from "components/badge/workEnvironmentBadge";
import DefaultButton from "components/button/defaultButton";
import Logo from "components/image/logo";
import Checkbox from "components/input/checkbox";
import CustomSelector from "components/input/customSelector";
import DefaultInput from "components/input/defaultInput";
import { StyleColor } from "config/constants";
import { inject, observer } from "mobx-react";
import { NextRouter } from "next/router";
import Alert1 from "public/images/login/login-alert-1.svg";
import Alert2 from "public/images/login/login-alert-2.svg";
import Alert3 from "public/images/login/login-alert-3.svg";
import Character from "public/images/login/login-character.svg";
import SquareLogo from "public/images/logo/barofactory-square.svg";
import { useEffect, useRef, useState } from "react";
import AuthViewModel from "src/viewModels/auth/auth.viewModel";
import styled, { keyframes } from "styled-components";

interface IProps {
  authViewModel: AuthViewModel;
  router: NextRouter;
}

function LoginView(props: IProps) {
  const authViewModel: AuthViewModel = props.authViewModel;
  const alertImages = [Alert1.src, Alert2.src, Alert3.src];
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [isContactMode, setIsContactMode] = useState<boolean>(false);
  const [isMount, setIsMount] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isRedirect = props.router.query.redirect === "1";

  console.log(isRedirect);
  const handleTogglePasswordView = () => {
    setViewPassword(!viewPassword);
    inputRef.current?.focus();
  };

  const handleToggleContactMode = () => {
    setIsContactMode(!isContactMode);
  };

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <PageContainer>
      <Header>
        <Logo src={SquareLogo.src} alt="companyLogo" size={[66.5, 40]} />
        <WorkEnvironmentBadge title="REACT" />
        <div />
      </Header>

      <Intro.Preface>
        <Intro.ImageWrap>
          <Intro.CharacterImage src={Character.src} />
          {alertImages.map((src: string, key: number) => {
            return (
              <Intro.AlertImage
                src={src}
                className={`alert_${key}`}
                key={`alert_image_${key}`}
              />
            );
          })}
        </Intro.ImageWrap>
      </Intro.Preface>

      <Login.FormWrap>
        {isContactMode ? (
          <>
            {isMount && (
              <Login.BackWard onClick={handleToggleContactMode}>
                <FontAwesomeIcon icon={faArrowRightToBracket} />
              </Login.BackWard>
            )}
            <Login.TextWrap>
              <Login.Title>아이디, 비밀번호가 기억이 안나시나요?</Login.Title>
              <Login.SubTitle>
                문의요청을 하시면 가입시 등록했던 연락처로 문자메세지가
                전송됩니다
              </Login.SubTitle>
            </Login.TextWrap>
            <DefaultInput
              type="text"
              value={authViewModel.findAccount.company}
              name="company"
              onChange={authViewModel.handleChangeContact}
              placeholder="회사명"
            />
            <DefaultInput
              type="text"
              value={authViewModel.findAccount.contact}
              name="contact"
              onChange={authViewModel.handleChangeContact}
              placeholder="등록된 연락처"
            />
            <CustomSelector
              options={[
                { title: "아이디 문의", id: "id" },
                { title: "비밀번호 문의", id: "password" },
              ]}
              onClick={authViewModel.handleClickCategory}
              value={authViewModel.findAccount.inquiry}
              defaultTitle={"문의내용"}
            />
            <DefaultButton
              title="요청하기"
              onClick={async () => {
                if (await authViewModel.insertContact()) {
                  setIsContactMode(false);
                }
              }}
              dynamic
              isActive={authViewModel.isContactReady}
            />
            <Login.Number>
              <p>진행에 어려움이 있으면 아래 연락처로 연락주시기 바랍니다.</p>
              <a href="tel:032-675-0101">032-675-0101</a>
            </Login.Number>
          </>
        ) : (
          <>
            <Login.TextWrap>
              <Login.Title>바로팩토리에 오신걸 환영합니다!</Login.Title>
              <Login.SubTitle>
                생산현장의 모든 상황을 BARO 파악해 보세요!
              </Login.SubTitle>
            </Login.TextWrap>
            <DefaultInput
              type="text"
              value={authViewModel.account.account}
              name="account"
              onChange={authViewModel.handleChangeAccount}
              placeholder="아이디"
            />
            <DefaultInput
              type={viewPassword ? "text" : "password"}
              value={authViewModel.account.password}
              name="password"
              onChange={authViewModel.handleChangeAccount}
              placeholder="비밀번호"
              reference={inputRef}
              onKeyDown={(event) =>
                authViewModel.handleKeyDownEnter(event, isRedirect)
              }
            >
              <FontAwesomeIcon
                icon={viewPassword ? faEye : faEyeSlash}
                className="view_password_icon"
                onClick={handleTogglePasswordView}
              />
            </DefaultInput>
            <Checkbox
              title="자동로그인"
              onChange={authViewModel.handleChangeAutoLogin}
              value={authViewModel.isAutoLogin}
            />
            <DefaultButton
              title="로그인"
              onClick={() => authViewModel.handleLogin(isRedirect)}
            />
            <Login.ContactUs>
              <p>아이디 및 비밀번호를 잊으셨나요?</p>
              <a onClick={handleToggleContactMode}>문의하기</a>
            </Login.ContactUs>
          </>
        )}
      </Login.FormWrap>
    </PageContainer>
  );
}

export default inject("authViewModel")(observer(LoginView));

const modals = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }`;

const PageContainer = styled.section`
  display: inline-flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-flow: row nowrap;
  flex-flow: row nowrap;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  position: relative;
  background-color: #f7f7f9;
`;

const Header = styled.header`
  z-index: 1;
  top: 0px;
  position: fixed;
  width: calc(100% - 64px);
  display: flex;
  align-items: center;
  padding: 0 32px;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0);
  height: 88px;

  & img {
    @media screen and (max-width: 780px) {
      visibility: hidden;
    }
  }

  & div {
    min-width: 66.5px;
  }
`;

const Intro = {
  Preface: styled.div`
    -webkit-box-flex: 1;
    -ms-flex: 1 1 0px;
    flex: 1 1 0;
    height: 100vh;
    position: relative;
    overflow: hidden;
    box-sizing: inherit;
    background: #f7f7f9;

    @media screen and (max-width: 780px) {
      display: none;
    }
  `,
  ImageWrap: styled.div`
    position: absolute;
    bottom: 7.5vh;
    right: 0;
  `,
  CharacterImage: styled.img`
    width: auto;
    height: 68vh;
    display: block;
    word-break: keep-all;
    max-width: 100%;
    border-style: none;
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
    padding: 0;
    margin: 0;
    background-repeat: no-repeat;
    overflow-clip-margin: content-box;
    overflow: clip;
  `,
  AlertImage: styled.img`
    position: absolute;
    max-width: 100%;
    display: block;
    word-break: keep-all;
    border-style: none;
    padding: 0;
    margin: 0;
    background-repeat: no-repeat;
    box-sizing: inherit;
    overflow-clip-margin: content-box;
    overflow: clip;
    -webkit-box-sizing: inherit;

    transform: scale(0);
    animation: ${modals} 0.5s 0.3s 1 linear forwards;
    -webkit-transform: scale(0);
    -webkit-animation: ${modals} 0.5s 0.3s 1 linear forwards;

    &.alert_0 {
      width: auto;
      height: 22vh;
      left: 4vw;
      top: 0;
    }

    &.alert_1 {
      width: auto;
      height: 10vh;
      right: 6vw;
      top: 0vw;

      animation-delay: 0.6s;
      -webkit-animation-delay: 0.6s;
    }
    &.alert_2 {
      width: auto;
      height: 24vh;
      right: 12vw;
      bottom: 8vw;

      -webkit-animation-delay: 0.9s;
      animation-delay: 0.9s;
    }
  `,
};

const Login = {
  FormWrap: styled.section`
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    gap: 16px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 388px;
    height: 100vh;
    padding: 0 56px;
    position: relative;
    background-color: white;
    word-break: keep-all;
    -webkit-box-sizing: inherit;
    box-sizing: inherit;

    @media screen and (max-width: 780px) {
      width: 100%;
    }
  `,
  TextWrap: styled.div`
    width: 100%;
  `,
  Title: styled.h2`
    width: 100%;
    font-size: 24px;
    line-height: 36px;
    font-weight: 700;
    color: #636578;
  `,
  SubTitle: styled.p`
    width: 100%;
    font-size: 14px;
    line-height: 21px;
    font-weight: 600;
    color: #858796;
  `,
  ContactUs: styled.div`
    display: flex;
    gap: 16px;

    & p {
      line-height: 36px;
      text-align: center;
      font-weight: 600;
      color: #858796;
    }

    & a {
      cursor: pointer;
      line-height: 36px;
      text-align: center;
      font-weight: 600;
      color: #3a79ec;
    }
  `,
  Number: styled.div`
    display: flex;
    flex-direction: column;

    & p {
      line-height: 36px;
      text-align: center;
      font-weight: 600;
      color: #858796;
    }

    & a {
      cursor: pointer;
      line-height: 36px;
      text-align: center;
      font-weight: 600;
      color: #3a79ec;
    }
  `,
  BackWard: styled.button`
    z-index: 1;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    position: absolute;
    left: 16px;
    top: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: 0;
    border: 0;
    cursor: pointer;
    transition: all 0.4s;

    & svg {
      width: 24px;
      height: 24px;
    }

    &:hover {
      background: ${StyleColor.HOVER};
    }
  `,
};
