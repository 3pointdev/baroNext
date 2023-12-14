import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyleColor } from "config/color";
import { inject, observer } from "mobx-react";
import { NextRouter, useRouter } from "next/router";
import SquareLogo from "public/images/logo/barofactory-square.svg";
import defaultUser from "public/images/profile/defaultUser.png";
import { useEffect, useState } from "react";
import styled from "styled-components";
import MenuModel from "../../src/models/menu/menu.model";
import SubMenuModel from "../../src/models/menu/subMenu.model";
import MainViewModel from "../../src/viewModels/main/main.viewModel";
import Logo from "../image/logo";
import Linker from "../linker/linker";
import UserModal from "../modal/userModal";

interface IProps {
  mainViewModel: MainViewModel;
}

function Header(props: IProps) {
  const mainViewModel: MainViewModel = props.mainViewModel;
  const [hover, setHover] = useState("");
  const [isOpenUserModal, setIsOpenUserModal] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  useEffect(() => {
    mainViewModel.popAuth();
  }, []);

  const handleToggleUserModal = () => {
    setIsOpenUserModal(!isOpenUserModal);
  };

  return (
    <HeaderContainer>
      <Head.Wrap>
        <Linker href={"/"} boxStyle={{ width: "fit-content" }}>
          <Head.Company>
            <Logo src={SquareLogo.src} alt="BAROFACTORY | 바로팩토리" />
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
      </Head.Wrap>
      <Navi.Wrap>
        <Navi.MenuWrap>
          {mainViewModel.menus.map((item: MenuModel, key: number) => {
            const isActive =
              item.path === "/"
                ? router.asPath === "/"
                : router.asPath.includes(item.path);
            const isHaveSubMenu = item.subMenu.length > 0;
            console.log(router.asPath, item.path);
            let classString = isActive || hover === item.name ? "active" : "";

            classString = classString + " " + item.name;

            const Icon = item.icon;

            return (
              <Navi.MenuItem
                key={key}
                className={classString}
                isMain={item.path === "/"}
                onMouseEnter={() => setHover(item.name)}
                onMouseLeave={() => setHover("")}
                onClick={() => (isHaveSubMenu ? null : router.push(item.path))}
              >
                <Icon />
                <p>{item.title}</p>
                {isHaveSubMenu && <Navi.DropDownIcon icon={faAngleDown} />}

                <Navi.MenuModal
                  onMouseEnter={() => setHover(item.name)}
                  onMouseLeave={() => setHover("")}
                >
                  <Navi.SubMenu
                    className={hover === item.name ? "active" : ""}
                    count={item.subMenu.length}
                  >
                    {item.subMenu.map((sub: SubMenuModel, key) => {
                      return (
                        <Linker key={`sub_menu_${key}`} href={sub.path}>
                          {sub.title}
                        </Linker>
                      );
                    })}
                  </Navi.SubMenu>
                </Navi.MenuModal>
              </Navi.MenuItem>
            );
          })}
        </Navi.MenuWrap>
      </Navi.Wrap>
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

export default inject("mainViewModel")(observer(Header));

const HeaderContainer = styled.header`
  position: relative;
  z-index: 999;
  width: 100%;
  min-width: 604px;
  height: 128px;
  display: flex;
  flex-direction: column;
  box-shadow: ${StyleColor.BOXSHADOW};
`;

const Head = {
  Wrap: styled.div`
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    height: 64px;
    align-items: center;
    border-bottom: 1px solid ${StyleColor.HOVER};
  `,
  Company: styled.div`
    display: flex;
    align-items: center;
    gap: 16px;

    font-size: 24px;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
  `,

  Profile: styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  `,
};

const Navi = {
  Wrap: styled.nav`
    padding: 0 24px;
    flex-shrink: 0;
  `,
  MenuWrap: styled.div`
    height: 64px;
    display: flex;
    align-items: center;
    gap: 12px;
  `,
  MenuItem: styled.div<{ isMain?: boolean }>`
    flex-shrink: 0;
    position: relative;

    width: fit-content;
    height: 47px;
    padding: 0 20px 0 16px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    white-space: nowrap;
    cursor: pointer;

    font-weight: 400;
    font-size: 18px;
    line-height: 1.5;

    & svg {
      width: 32px;
      height: 32px;
    }

    &.worker_manage svg {
      width: 30px;
      height: 30px;
    }
    &.notification_manage svg {
      width: 24px;
      height: 24px;
    }

    &.active {
      background: ${StyleColor.PRIMARY};
      border-radius: 8px;
      box-shadow: ${StyleColor.DEEPSHADOW};

      & p,
      path {
        color: ${StyleColor.LIGHT};
        stroke: ${StyleColor.LIGHT};
      }
    }
    &.active.worker_manage {
      background: ${StyleColor.PRIMARY};
      border-radius: 8px;
      box-shadow: ${StyleColor.DEEPSHADOW};

      & svg,
      p,
      path {
        fill: ${StyleColor.LIGHT};
      }
    }
    &.active.notification_manage {
      background: ${StyleColor.PRIMARY};
      border-radius: 8px;
      box-shadow: ${StyleColor.DEEPSHADOW};

      & svg,
      p,
      path {
        fill: ${StyleColor.LIGHT};
      }
    }
  `,
  MenuModal: styled.div`
    position: absolute;
    left: 0px;
    width: 100%;
    height: 100% !important;
  `,
  SubMenu: styled.ul<{ count: number }>`
    position: absolute;
    top: 48px;
    left: 0px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: ${StyleColor.LIGHT};
    box-shadow: ${StyleColor.BOXSHADOW};
    width: 100%;
    overflow: hidden;
    font-size: 16px;
    height: 0px !important;
    transition: all 0.4s ease;

    &.active {
      height: ${({ count }) => count * 48}px !important;
    }

    & div {
      transition: all 0.2s ease;

      &:hover {
        background: ${StyleColor.HOVER};
      }

      & a {
        padding: 12px;
        display: block;
      }
    }
  `,
  DropDownIcon: styled(FontAwesomeIcon)`
    width: 16px !important;
    height: 16px !important;
  `,
};
const MonitoringWrap = styled.div`
  width: 180px;
  position: absolute;
  right: 120px;
  display: flex;
  align-items: center;
`;
