import React from "react";
import styled from "styled-components";

import ProfileImage from "./ProfileImage";

const IntroductionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: white;
  margin-top: 20px;
  font-size: 25px;
  font-weight: 700;
`;

const SubTitle = styled.div`
  margin-top: 5px;
  font-size: 15px;
  font-weight: 400;
`;

const Introduction = () => {
  return (
    <IntroductionWrapper>
      <ProfileImage />
      <Title>KIM DONGGYU</Title>
      <SubTitle>배우고 정리하고 공유하기</SubTitle>
    </IntroductionWrapper>
  );
};

export default Introduction;
