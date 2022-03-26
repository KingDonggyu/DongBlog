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

const BackBtn = styled(Link)`
  margin: 20px;
  color: #495057;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const Thumbnail = styled(Img)`
  width: 150px;
  height: 150px;
  border-radius: 5px;
  margin-bottom: 30px;
  border: 1px solid;
  display: none;
  @media (max-width: 1100px) {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
  }
`;

const PostHead = ({
  title,
  date,
  category,
  categoryColor,
  tags,
  thumbnail: {
    childImageSharp: { fluid },
  },
}) => {
  return (
    <Background>
      <BackBtn to={"/"}>
        <AiFillHome size="40" />
      </BackBtn>
      <PostHeadInfo
        date={date}
        category={category}
        categoryColor={categoryColor}
        tags={tags}
      />
      <Wrapper>
        <Thumbnail fluid={fluid} alt="thumbnail" />
        <h1>{title}</h1>
      </Wrapper>
    </Background>
  );
};

export default PostHead;
