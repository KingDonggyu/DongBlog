import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Img from "gatsby-image";

import PostItemHeader from "./PostItemHeader";

const Wrapper = styled(Link)`
  flex: 1;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #606163;
  padding: 20px;
  height: 150px;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: #606163;
  }
  @media (max-width: 768px) {
    flex: none;
    height: 120px;
  }
`;

const PostItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  color: white;
`;

const ThumbnailImage = styled(Img)`
  width: 150px;
  height: 120px;
  margin-right: 30px;
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    margin-right: 15px;
  }
`;

const Title = styled.h1`
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Date = styled.div`
  color: darkgray;
  text-align: right;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const PostItem = ({
  title,
  date,
  category,
  tags,
  thumbnail: {
    childImageSharp: { fluid },
  },
}) => {
  return (
    <Wrapper>
      <ThumbnailImage fluid={fluid} alt="Post Item Image" />
      <PostItemContent>
        <PostItemHeader category={category} tags={tags} />
        <Title>{title}</Title>
        <Date>Posted {date}</Date>
      </PostItemContent>
    </Wrapper>
  );
};

export default PostItem;
