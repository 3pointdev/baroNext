import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserModal from "components/modal/userModal";
import { StyleColor } from "config/color";
import { inject, observer } from "mobx-react";
import { NextRouter, useRouter } from "next/router";
import SquareLogo from "public/images/logo/barofactory-square.svg";
import defaultUser from "public/images/profile/defaultUser.png";
import { useEffect, useState } from "react";
import MenuModel from "src/models/menu/menu.model";
import SubMenuModel from "src/models/menu/subMenu.model";
import styled from "styled-components";
import pageUrlConfig from "../../config/pageUrlConfig";
import authModule from "../../src/modules/auth.module";
import MainViewModel from "../../src/viewModels/main/main.viewModel";
import Logo from "../image/logo";
import Linker from "../linker/linker";

interface IProps {
  mainViewModel: MainViewModel;
}

function MobileHeader(props: IProps) {
  const mainViewModel: MainViewModel = props.mainViewModel;
  const [isOpenUserModal, setIsOpenUserModal] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (!authModule.isLogin()) {
      router.push(pageUrlConfig.login);
    }
    mainViewModel.popAuth();
  }, []);

  const handleToggleUserModal = () => {
    setIsOpenUserModal(!isOpenUserModal);
  };

  return (
    <HeaderContainer>
      <Head.Menu icon={faBars} onClick={() => setIsOpenMenu(true)} />

      <Linker href={"/"} boxStyle={{ width: "fit-content" }}>
        <Head.Company>
          <Logo
            src={SquareLogo.src}
            alt="BAROFACTORY | 바로팩토리"
            size={[32, 32]}
          />
          <p>{mainViewModel.auth.name}</p>
        </Head.Company>
      </Linker>

      <Head.Profile
        src={
          mainViewModel.auth.profileImage
            ? mainViewModel.auth.profileImage
            : defaultUser.src
        }
        alt="profile"
        onClick={handleToggleUserModal}
      />

      <SlideMenu.Wrap className={isOpenMenu ? "is_open" : ""}>
        <SlideMenu.Head>
          <SlideMenu.Close
            icon={faXmark}
            onClick={() => setIsOpenMenu(false)}
            style={{ cursor: "pointer" }}
          />
        </SlideMenu.Head>
        <SlideMenu.Menu>
          {mainViewModel.menus.map((item: MenuModel, key: number) => {
            const isActive =
              item.path === "/"
                ? router.asPath === "/"
                : router.asPath.includes(item.path);
            const isHaveSubMenu = item.subMenu.length > 0;

            return (
              <MainMenuItem
                key={key}
                className={""}
                onClick={() => (isHaveSubMenu ? null : router.push(item.path))}
              >
                <p>{item.title}</p>
                <Icon>
                  <item.icon />
                </Icon>
                <SubMenuWrap>
                  {item.subMenu.map((sub: SubMenuModel, key) => {
                    return (
                      <Linker key={`sub_menu_${key}`} href={sub.path}>
                        {sub.title}
                      </Linker>
                    );
                  })}
                </SubMenuWrap>
              </MainMenuItem>
            );
          })}

          <MainMenuItem className="slide_menu" onClick={() => {}}>
            <p className="logout" onClick={() => {}}>
              로그아웃
            </p>
          </MainMenuItem>
        </SlideMenu.Menu>
        <SlideMenu.Foot>BAROFACTORY</SlideMenu.Foot>
      </SlideMenu.Wrap>

      {mainViewModel.auth.enterpriseId && (
        <UserModal
          onClick={handleToggleUserModal}
          onClickLogout={mainViewModel.insertLogout}
          isOpen={isOpenUserModal}
          menus={mainViewModel.userMenu}
          alarm={mainViewModel.alarm.unRead}
        />
      )}
    </HeaderContainer>
  );
}

export default inject("mainViewModel")(observer(MobileHeader));

const HeaderContainer = styled.header`
  position: relative;
  z-index: 999;
  width: calc(100vw - 32px);
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-shadow: ${StyleColor.BOXSHADOW};
`;

const Head = {
  Company: styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    font-size: 16px;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
  `,

  Profile: styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
  `,

  Menu: styled(FontAwesomeIcon)`
    width: 24px;
    height: 24px;
    font-size: 24px;
    z-index: 2;
    cursor: pointer;
  `,
};

const SlideMenu = {
  Wrap: styled.div`
    z-index: 3;
    position: fixed;
    left: -100vw;
    top: 0px;
    background: ${StyleColor.LIGHT};
    width: 100vw;
    height: 100vh;
    transition: all 0.4s ease;
    display: flex;
    flex-direction: column;

    &.is_open {
      left: 0px;
    }
  `,
  Head: styled.div`
    width: calc(100% - 32px);
    height: 36px;
    display: flex;
    padding: 16px;
    align-items: center;
    justify-content: end;
  `,
  Close: styled(FontAwesomeIcon)`
    width: 24px;
    height: 24px;
    font-size: 24px;
    z-index: 2;
    cursor: pointer;
  `,
  Menu: styled.div`
    width: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: end;
    font-size: 28px;
    font-weight: 600;
    padding: 0 16px;
  `,
  Foot: styled.div`
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 20px;
    font-size: 20px;
    line-height: 32px;
    font-weight: 700;
    color: ${StyleColor.DARK}85;
    margin-bottom: 32px;
    text-align: center;
  `,
};

const MainMenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 16px;
  overflow: hidden;
  width: 180px;
  height: 40px;

  & .logout {
    width: 100%;
    text-align: right;
  }
`;

const Icon = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubMenuWrap = styled.div`
  display: none;
`;
