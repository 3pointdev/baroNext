import styled, { keyframes } from "styled-components";
import FactoryIcon from "../../public/images/icons/factoryIcon";
import { StyleColor } from "config/constants";

export default function DefaultLoading() {
  return (
    <LoadingFactory>
      <div className="loading_in_shadow"></div>
      <div className="loading_in_box"></div>
      <p>Loading...</p>
    </LoadingFactory>
  );
}

const animate = keyframes`
17% { border-bottom-right-radius: 3px; }
25% { transform: translateY(9px) rotate(22.5deg); }
50% {
    transform: translateY(18px) scale(1,.9) rotate(45deg) ;
    border-bottom-right-radius: 40px;
  }
  75% { transform: translateY(9px) rotate(67.5deg); }
  100% { transform: translateY(0) rotate(90deg); }

`;

const shadow = keyframes`
    50% {
      transform: scale(1.2,1);
    }
  `;

const LoadingFactory = styled.div`
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);

  & .loading_in_box {
    width: 50px;
    height: 50px;
    background: ${StyleColor.PRIMARY};
    animation: ${animate} 0.5s linear infinite;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 3px;
  }

  & .loading_in_shadow {
    width: 50px;
    height: 5px;
    background: ${StyleColor.LIGHT};
    opacity: 0.1;
    position: absolute;
    top: 59px;
    left: 0;
    border-radius: 50%;
    animation: ${shadow} 0.5s linear infinite;
  }

  & p {
    width: 100%;
    position: absolute;
    left: -2px;
    top: 80px;
    text-align: center;
  }
`;
