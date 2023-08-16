import styled from "styled-components";

interface IProps {
  list: string[];
}

export default function DotList({ list }: IProps) {
  return (
    <ListContainer>
      {list.map((item: string, key: number) => {
        return <li key={`${item}_list_${key}`}>{item}</li>;
      })}
    </ListContainer>
  );
}

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;

  font-size: 14px;
  line-height: 20px;
  font-weight: 600;

  & li {
    list-style: inside;
    text-wrap: wrap;

    &::marker {
      color: #b9b9b9;
      font-size: 18px;
    }
  }
`;
