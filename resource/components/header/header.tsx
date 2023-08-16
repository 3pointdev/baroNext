import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SquareLogo from "public/images/logo/barofactory-square.svg";
import styled from "styled-components";
import MainViewModel from "../../src/viewModels/main/main.viewModel";
import MenuModel from "../../src/models/menu/menu.model";
import { NextRouter, useRouter } from "next/router";
import SubMenuModel from "../../src/models/menu/subMenu.model";
import { useEffect, useState } from "react";
import Logo from "../image/logo";
import WorkEnvironmentBadge from "../badge/workEnvironmentBadge";
import { inject, observer } from "mobx-react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import AlarmModal from "../modal/alarmModal";
import UserModal from "../modal/userModal";
import Linker from "../linker/linker";
import pageUrlConfig from "../../config/pageUrlConfig";
import authModule from "../../src/modules/auth.module";
import CircleButton from "../button/circleButton";

interface IProps {
  mainViewModel: MainViewModel;
}

function Header(props: IProps) {
  const mainViewModel: MainViewModel = props.mainViewModel;
  const [hover, setHover] = useState("");
  const [isOpenAlarmModal, setIsOpenAlarmModal] = useState<boolean>(false);
  const [isOpenUserModal, setIsOpenUserModal] = useState<boolean>(false);
  const router: NextRouter = useRouter();

  useEffect(() => {
    if (!authModule.isLogin()) {
      router.push(pageUrlConfig.login);
    }
  }, []);

  const handleToggleAlarmModal = () => {
    setIsOpenAlarmModal(!isOpenAlarmModal);
  };

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
        <WorkEnvironmentBadge title={process.env.NEXT_PUBLIC_APP_MARK} />
        <Head.User>
          <CircleButton icon={faBell} onClick={handleToggleAlarmModal}>
            <Head.Alarm>{mainViewModel.alarm.unRead}</Head.Alarm>
          </CircleButton>
          <Head.Profile
            src={mainViewModel.auth.profileImage}
            alt="profile"
            onClick={handleToggleUserModal}
          />
        </Head.User>
      </Head.Wrap>
      <Navi.Wrap>
        <Navi.MenuWrap>
          {mainViewModel.menus.map((item: MenuModel, key: number) => {
            let isActive =
              item.path === "/"
                ? router.asPath === "/"
                : router.asPath.includes(item.path);

            return (
              <Navi.MenuItem
                key={key}
                className={
                  isActive ? "active" : hover === item.name ? "active" : ""
                }
                isMain={item.path === "/"}
              >
                <Linker
                  href={item.subMenu.length < 1 ? item.path : ""}
                  onMouseEnter={() => setHover(item.name)}
                  onMouseLeave={() => setHover("")}
                >
                  <div>
                    <FontAwesomeIcon icon={item.icon} />
                    <p>{item.title}</p>
                  </div>
                </Linker>
                {item.subMenu.length > 0 && (
                  <>
                    <Navi.DropDownIcon icon={faAngleDown} />
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
                            <li key={`sub_menu_${key}`}>
                              <Linker href={sub.path}>{sub.title}</Linker>
                            </li>
                          );
                        })}
                      </Navi.SubMenu>
                    </Navi.MenuModal>
                  </>
                )}
              </Navi.MenuItem>
            );
          })}
        </Navi.MenuWrap>
      </Navi.Wrap>
      {mainViewModel.auth.enterpriseId && (
        <>
          <AlarmModal
            onClick={handleToggleAlarmModal}
            active={isOpenAlarmModal}
            list={mainViewModel.alarm.alarms}
            count={mainViewModel.alarm.unRead}
          />
          <UserModal
            onClick={handleToggleUserModal}
            onClickLogout={mainViewModel.insertLogout}
            active={isOpenUserModal}
            data={mainViewModel.auth}
            menus={mainViewModel.userMenu}
            alarm={mainViewModel.alarm.unRead}
          />
        </>
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
  box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
`;

const Head = {
  Wrap: styled.div`
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;
    height: 64px;
    align-items: center;
    border-bottom: 1px solid #eaeaec;
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

  User: styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
  `,

  Alarm: styled.div`
    position: absolute;
    right: 0px;
    top: 0px;
    background: red;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    color: #fff;
    font-size: 12px;
    font-weight: 300;
    line-height: 18px;
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
    width: ${({ isMain }) => (isMain ? "108px" : "140px")};
    height: 47px;
    padding: 0px;
    white-space: nowrap;
    cursor: pointer;

    & p {
      padding-top: 4px;
      font-weight: 400;
      font-size: 18px;
      line-height: 1.5;
    }
    & div {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 100%;
    }
    & svg {
      padding-left: 12px;
      width: 24px;
      height: 24px;
    }
    &.active {
      background: #3a79ec;
      border-radius: 8px;
      box-shadow: 0px 2px 6px rgba(76, 78, 100, 0.42);
      & p,
      path {
        color: white;
      }
    }
  `,
  SubMenu: styled.ul<{ count: number }>`
    position: absolute;
    margin-top: 18px;
    top: 0px;
    left: 0px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
    width: 140px;
    overflow: hidden;
    font-size: 16px;
    height: 0px !important;
    transition: all 0.4s ease;

    &.active {
      height: ${({ count }) => count * 44}px !important;
      top: 16px;
    }

    & li {
      padding: 6px;

      & a {
        padding: 6px;
      }

      &:hover {
        background: #f5f5f5;
      }
    }
  `,
  MenuModal: styled.div`
    position: absolute;
    top: 16px;
    left: 0px;
    width: 100%;
    height: 100% !important;
  `,
  DropDownIcon: styled(FontAwesomeIcon)`
    position: absolute;
    top: 50%;
    right: 12px;

    width: 16px !important;
    height: 16px !important;

    transform: translate(0, -50%);
  `,
};
