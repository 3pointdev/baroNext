import styled from "styled-components";
import AlarmDto from "../../src/dto/alarm/alarm.dto";
import timeModule from "../../src/modules/time.module";
import DefaultButton from "../button/defaultButton";
import { MouseEventHandler } from "react";

interface IProps {
  list: AlarmDto[];
  onClick: MouseEventHandler;
  count: number;
  active: boolean;
}

export default function AlarmModal({ list, count, active, onClick }: IProps) {
  return (
    <>
      <AlarmContainer active={active}>
        <HeadLine>
          <h3>공지 & 알림사항</h3>
          <span>{`${count} New`}</span>
        </HeadLine>
        {list.map((item: AlarmDto, key: number) => {
          return (
            <Item.Wrap key={`alarm_list_${key}`}>
              <Item.Left>
                <Item.ThumbImage
                  src={item.thumbImage}
                  alt={`${item.title}_alarm_image`}
                />
                <Item.TextWrap>
                  <Item.Title>{item.title}</Item.Title>
                  <Item.Content>{item.content}</Item.Content>
                </Item.TextWrap>
              </Item.Left>
              <Item.CreatedAt>
                {timeModule.toString(item.createdAt)}
              </Item.CreatedAt>
            </Item.Wrap>
          );
        })}
        <ButtonWrap>
          <DefaultButton title="알림내역 보기" />
        </ButtonWrap>
      </AlarmContainer>
      <Background active={active} onClick={onClick} />
    </>
  );
}

const AlarmContainer = styled.div<{ active: boolean }>`
  z-index: 2;
  position: absolute;
  width: 380px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(76, 78, 100, 0.22);
  top: 64px;
  right: 80px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background: #fff;
  pointer-events: ${({ active }) => (active ? "auto" : "none")};
  opacity: ${({ active }) => (active ? "1" : "0")};
  transition: all 0.4s ease;
`;

const HeadLine = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  border-bottom: 1px solid #eaeaec;

  & h3 {
    font-size: 14px;
    color: #4c4e64;
    font-weight: 700;
  }

  & span {
    display: inline-block;
    padding: 2px 8px;
    color: #3a79ec;
    font-weight: 600;
    font-size: 12px;
    border-radius: 12px;
    background-color: #ededff;
  }
`;

const Item = {
  Wrap: styled.div`
    padding: 0 20px;
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
      background: #f5f5f5;
    }
  `,
  Left: styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  ThumbImage: styled.img`
    flex-shrink: 0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
  `,
  TextWrap: styled.div`
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: start;
  `,
  Title: styled.p`
    font-size: 14px;
    font-weight: 600;
    line-height: 18px;
  `,
  Content: styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #858796;
  `,
  CreatedAt: styled.p`
    flex-shrink: 0;
    width: 50px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    color: #bbbcc4;
  `,
};

const ButtonWrap = styled.div`
  padding: 15px 20px;

  border-top: 1px solid #eaeaec;

  & button {
    height: 30px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
  }
`;

const Background = styled.div<{ active: boolean }>`
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;

  pointer-events: ${({ active }) => (active ? "auto" : "none")};
`;
