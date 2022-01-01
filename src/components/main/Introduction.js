import React from "react";
import styled from "styled-components";
import { AiFillGithub, AiOutlineInstagram } from "react-icons/ai";

import ProfileImage from "./ProfileImage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderWrapper = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-left: 10px;
  a {
    &:hover {
      color: gray;
    }
  }
`;

const Title = styled.div`
  margin-top: 10px;
  font-size: 17px;
`;

const SubTitle = styled.p`
  margin-top: 10px;
  font-size: 13px;
`;

const Introduction = ({ profileImage }) => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <ProfileImage profileImage={profileImage} />
        <IconWrapper>
          <a href="https://github.com/KingDonggyu" target="_blank">
            <AiFillGithub href="https://github.com/KingDonggyu" size="40" />
          </a>
          <a href="https://www.instagram.com/dg_kim67/" target="_blank">
            <AiOutlineInstagram size="40" />
          </a>
        </IconWrapper>
      </HeaderWrapper>
      <Title>KIM DONGGYU</Title>
      <SubTitle>배우고 정리하고 공유하기 🔥</SubTitle>
    </Wrapper>
  );
};

export default Introduction;
