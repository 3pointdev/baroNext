import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

export default function IsEmpty({ title }) {
  return (
    <Container>
      <FontAwesomeIcon icon={faTriangleExclamation} size="lg" />
      <p>{title}</p>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  & path {
    color: #ff4d49;
  }

  & p {
    font-size: 12px;
    color: #ff4d49;
    line-height: 2;
    margin-top: 10px;
  }
`;
