import styled from "styled-components";

export default function AddressModal(props) {
  const { onClick, isOpen, children } = props;

  return (
    <>
      <DivBackground
        onClick={onClick}
        style={{
          pointerEvents: isOpen ? "auto" : "none",
          opacity: isOpen ? "0.6" : "0",
        }}
      />
      <DivModal style={{ bottom: isOpen ? "0px" : "-80%" }}>
        <DivHandle />
        {children}
      </DivModal>
    </>
  );
}

const DivHandle = styled.div`
  position: absolute;
  width: 60px;
  height: 4px;
  top: 16px;
  border-radius: 8px;
`;

const DivBackground = styled.div`
  z-index: 1002;
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0);
  transition: all 0.3s ease;
`;

const DivModal = styled.div`
  z-index: 1003;
  height: 80%;
  width: 100%;
  min-width: 320px;
  max-width: 768px;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  transition: bottom 0.3s ease;
  border-radius: 24px 24px 0px 0px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  padding: 50px 0 0;
`;
