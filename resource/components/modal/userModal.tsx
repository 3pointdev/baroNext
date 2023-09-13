import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyleColor } from "config/constants";
import { MouseEventHandler } from "react";
import styled from "styled-components";
import pageUrlConfig from "../../config/pageUrlConfig";
import UserMenuModel from "../../src/models/menu/userMenu.model";
import Linker from "../linker/linker";

interface IProps {
  onClick: MouseEventHandler;
  onClickLogout: MouseEventHandler;
  isOpen: boolean;
  menus: UserMenuModel[];
  alarm: number;
}

export default function UserModal({
  menus,
  isOpen,
  onClick,
  alarm,
  onClickLogout,
}: IProps) {
  return (
    <>
      <UserContainer isOpen={isOpen}>
        <Menu.Wrap>
          {menus.map((menu: UserMenuModel, key) => {
            return (
              <Menu.Item key={`menu_${key}`} href={menu.path}>
                <div>
                  <FontAwesomeIcon icon={menu.icon} />
                  <p>{menu.title}</p>
                </div>
                {menu.path === pageUrlConfig.alarm && (
                  <Menu.Alarm>{alarm}</Menu.Alarm>
                )}
              </Menu.Item>
            );
          })}
          <Menu.Item onClick={onClickLogout}>
            <div>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p>로그아웃</p>
            </div>
          </Menu.Item>
        </Menu.Wrap>
      </UserContainer>
      <Background isOpen={isOpen} onClick={onClick} />
    </>
  );
}

const UserContainer = styled.div<{ isOpen: boolean }>`
  z-index: 2;
  position: absolute;
  width: 230px;
  background: ${StyleColor.LIGHT};
  box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
  top: 64px;
  right: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background: ${StyleColor.LIGHT};
  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transition: all 0.4s ease;

  overflow: hidden;
`;

const Menu = {
  Wrap: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  `,
  Item: styled(Linker)`
    padding: 0 20px;
    cursor: pointer;
    width: calc(100% - 40px);
    display: flex;
    height: 56px;
    transition: all 0.4s ease;
    align-items: center;
    justify-content: space-between;

    & div {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    &:hover {
      background: ${StyleColor.HOVER};
    }
  `,
  Alarm: styled.p`
    background: red;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    color: ${StyleColor.LIGHT};
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

const Background = styled.div<{ isOpen: boolean }>`
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;

  pointer-events: ${({ isOpen }) => (isOpen ? "auto" : "none")};
`;
