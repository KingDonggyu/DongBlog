import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";
import { FaArrowCircleLeft } from "react-icons/fa";

import PostHeadInfo from "./PostHeadInfo";

const Background = styled.div`
  position: relative;
  color: white;
  background-color: #606163;
  width: 100%;
  padding: 30px;
  @media (max-width: 1100px) {
    padding: 30px 12px 10px 12px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 30px;
  @media (max-width: 1100px) {
    h1 {
      font-size: 23px;
    }
  }
`;

const BackBtn = styled.span`
  margin: 20px;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;

const Thumbnail = styled(Img)`
  width: 150px;
  height: 150px;
  border-radius: 5px;
  margin-bottom: 30px;
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
  const goBackPage = () => window.history.back();
  return (
    <Background>
      <BackBtn onClick={goBackPage}>
        <FaArrowCircleLeft size="40" />
      </BackBtn>
      <Wrapper>
        <Thumbnail fluid={fluid} alt="thumbnail" />
        <h1>{title}</h1>
      </Wrapper>
      <PostHeadInfo
        date={date}
        category={category}
        categoryColor={categoryColor}
        tags={tags}
      />
    </Background>
  );
};

export default PostHead;
