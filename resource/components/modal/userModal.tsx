import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";
import styled from "styled-components";
import pageUrlConfig from "../../config/pageUrlConfig";
import UserMenuModel from "../../src/models/menu/userMenu.model";
import Linker from "../linker/linker";

interface IProps {
  // data: AuthDto;
  onClick: MouseEventHandler;
  onClickLogout: MouseEventHandler;
  active: boolean;
  menus: UserMenuModel[];
  alarm: number;
}

export default function UserModal({
  // data,
  menus,
  active,
  onClick,
  alarm,
  onClickLogout,
}: IProps) {
  return (
    <>
      <UserContainer active={active}>
        {/* <HeadLine>
          <img src={data.profileImage} alt="user_profile_image" />
          <div>
            <p>{data.name}</p>
            <span>{data.account.toUpperCase()}</span>
          </div>
        </HeadLine> */}
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
      <Background active={active} onClick={onClick} />
    </>
  );
}

const UserContainer = styled.div<{ active: boolean }>`
  z-index: 2;
  position: absolute;
  width: 230px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
  top: 64px;
  right: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background: #fff;
  pointer-events: ${({ active }) => (active ? "auto" : "none")};
  opacity: ${({ active }) => (active ? "1" : "0")};
  transition: all 0.4s ease;

  overflow: hidden;
`;

const HeadLine = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 70px;
  border-bottom: 1px solid #eaeaec;
  gap: 16px;

  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
  }

  & div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  & p {
    font-size: 14px;
    font-weight: 700;
    color: #4c4e64;
  }

  & span {
    font-size: 12px;
    font-weight: 400;
    color: #bfbfbf;
  }
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

    &:nth-child(3),
    &:nth-child(6) {
      border-bottom: 1px solid #eaeaec;
    }
    &:hover {
      background: #f5f5f5;
    }
  `,
  Alarm: styled.p`
    background: red;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

const Background = styled.div<{ active: boolean }>`
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;

  pointer-events: ${({ active }) => (active ? "auto" : "none")};
`;
