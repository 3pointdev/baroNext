import DaumPostcode from "react-daum-postcode";
import styled from "styled-components";

export default function PostCode(props) {
  const { setData, isOpen } = props;

  return (
    isOpen && (
      <DivContainer>
        <DaumPostcode
          onComplete={setData}
          autoClose={true}
          className={"post_code"}
          style={{ height: "100%" }}
        />
      </DivContainer>
    )
  );
}

const DivContainer = styled.div`
  width: 100%;
  height: 100%;
`;
