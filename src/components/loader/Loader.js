// styles with styled components
import styled from "styled-components";

const Mask = styled.div`
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(20, 20, 20, 0.5);
  transition: all 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
`;

const Loader = styled.div`
  width: 100vw;
  text-align: center;
`;

const LoaderInstance = styled.div`
  width: 24px;
  height: 24px;
  background-color: #0000ff;
  border-radius: 100%;
  display: inline-block;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  &.loader__bounce__first {
    animation-delay: -0.32s;
    margin-right: 8px;
  }
  &.loader__bounce__second {
    animation-delay: -0.16s;
    margin-right: 8px;
  }
  @keyframes sk-bouncedelay {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

/**
 * @name LoaderComponent
 * @description method to create the loader component
 * @returns loader component with bounce animation
 */
const LoaderComponent = () => {
  return (
    <Mask className="loader">
      <Loader className="loader__bounce">
        <LoaderInstance className="loader__bounce__first"></LoaderInstance>
        <LoaderInstance className="loader__bounce__second"></LoaderInstance>
        <LoaderInstance className="loader__bounce__third"></LoaderInstance>
      </Loader>
    </Mask>
  );
};

export default LoaderComponent;
