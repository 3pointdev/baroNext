import styled from "styled-components";
import UserDto from "../../src/dto/user/user.dto";

interface IProps {
  data: UserDto;
}

export default function UserInfomation({ data }: IProps) {
  return (
    <Container>
      <CardTitle>기본정보</CardTitle>
      <RowWrap>
        <RowTitle>대표자 :</RowTitle>
        <RowData></RowData>
      </RowWrap>
      <RowWrap>
        <RowTitle>사업자번호 :</RowTitle>
        <RowData></RowData>
      </RowWrap>
      <RowWrap>
        <RowTitle>회사번호 :</RowTitle>
        <RowData>{data.entNumber}</RowData>
      </RowWrap>
      <RowWrap>
        <RowTitle>이메일 :</RowTitle>
        <RowData></RowData>
      </RowWrap>
      <RowWrap>
        <RowTitle>주소 :</RowTitle>
        <RowData>{data.address}</RowData>
      </RowWrap>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
`;

const CardTitle = styled.h4`
  font-weight: 600;
  font-size: 20px;
  line-height: 2;
  border-bottom: 1px solid #eaeaec;
  margin-bottom: 16px;
`;

const RowWrap = styled.div`
  display: flex;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
`;

const RowTitle = styled.p`
  white-space: nowrap;
`;
const RowData = styled.p``;
