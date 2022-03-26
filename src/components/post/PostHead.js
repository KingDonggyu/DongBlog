import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Img from "gatsby-image";
import { AiFillHome } from "react-icons/ai";

import PostHeadInfo from "./PostHeadInfo";

const Background = styled.div`
  position: relative;
  width: 100%;
  padding: 30px;
  border-bottom: 1px solid #d2d2d7;
  @media (max-width: 1100px) {
    padding: 30px 12px 10px 12px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 30px 30px 10px 30px;
  padding-bottom: 40px;
  h1 {
    font-weight: 400;
  }
  @media (max-width: 1100px) {
    h1 {
      font-size: 20px;
    }
  }
`;

const HomeBtn = styled(Link)`
  margin: 30px;
  color: #495057;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const PostHead = ({
  title,
  date,
  category,
  categoryColor,
  tags,
}) => {
  return (
    <Background>
      <HomeBtn to={"/"}>
        <AiFillHome size="30" />
      </HomeBtn>
      <PostHeadInfo
        date={date}
        category={category}
        categoryColor={categoryColor}
        tags={tags}
      />
      <Wrapper>
        <h1>{title}</h1>
      </Wrapper>
    </Background>
  );
};

export default PostHead;
