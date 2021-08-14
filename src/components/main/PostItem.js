import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import PostItemHeader from "./PostItemHeader";

const Wrapper = styled(Link)`
  flex: 1;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #606163;
  padding: 20px;
  height: 160px;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
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

const ThumbnailImage = styled.img`
  width: 150px;
  height: 100%;
  margin-right: 30px;
`;

const Date = styled.div`
  color: darkgray;
  text-align: right;
`;

const PostItem = ({ title, date, category, tags, thumbnail }) => {
  return (
    <Wrapper>
      <ThumbnailImage src={thumbnail} alt="Post Item Image" />
      <PostItemContent>
        <PostItemHeader category={category} tags={tags} />
        <h1>{title}</h1>
        <Date>Posted {date}</Date>
      </PostItemContent>
    </Wrapper>
  );
};

export default PostItem;
