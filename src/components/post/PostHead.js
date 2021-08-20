import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";

import PostHeadInfo from "./PostHeadInfo";

const Background = styled.div`
  position: relative;
  color: white;
  background-color: #606163;
  width: 100%;
  padding: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const Thumbnail = styled(Img)`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-bottom: 30px;
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
