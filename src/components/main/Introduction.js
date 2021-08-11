import React from "react";
import styled from "styled-components";

import ProfileImage from "./ProfileImage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 25px;
  font-weight: 700;
`;

const SubTitle = styled.div`
  margin-top: 10px;
  font-size: 15px;
  font-weight: 400;
`;

const Introduction = () => {
  return (
    <Wrapper>
      <ProfileImage />
      <Title>KIM DONGGYU</Title>
      <SubTitle>배우고 정리하고 공유하기</SubTitle>
    </Wrapper>
  );
};

export default Introduction;
