import React from "react";
import styled from "styled-components";

import Logo from "../../../static/icon.png";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingLogo = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  animation-duration: 2s;
  animation-name: rotation;
  animation-iteration-count: infinite;
  @keyframes rotation {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.h1`
  color: white;
  margin-top: 30px;
`;

const Loading = () => {
  return (
    <Wrapper>
      {/* <LoadingLogo src={Logo} alt="Main Logo" /> */}
      <LoadingText>Loading..</LoadingText>
    </Wrapper>
  );
};

export default Loading;
