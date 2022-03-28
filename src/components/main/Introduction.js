import React from "react";
import styled from "styled-components";
import { AiFillGithub, AiOutlineInstagram } from "react-icons/ai";

import ProfileImage from "./ProfileImage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);;
  padding: 30px 0;
  margin: 0 10px 30px 10px;
  background: white;
  @media (max-width: 1100px) {
    padding: 40px;
    margin: 10px 20px;
  }
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
          <a href="https://www.instagram.com/dgyu20/" target="_blank">
            <AiOutlineInstagram size="40" />
          </a>
        </IconWrapper>
      </HeaderWrapper>
      <Title>KIM DONGGYU</Title>
      <SubTitle>그럼에도 불구하고 🔥</SubTitle>
    </Wrapper>
  );
};

export default Introduction;
