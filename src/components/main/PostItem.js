import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Img from "gatsby-image";

import PostItemInfo from "./PostItemInfo";

const Wrapper = styled(Link)`
  /* flex: 1; */
  padding: 20px;
  height: 160px;
  display: flex;
  align-items: flex-start;
  border-bottom: 1px solid #606163;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: #606163;
  }
  @media (max-width: 768px) {
    flex: none;
    height: 130px;
  }
`;

const ThumbnailImage = styled(Img)`
  width: 150px;
  height: 100%;
  margin-right: 30px;
  border-radius: 5px;
  @media (max-width: 768px) {
    width: 70px;
    height: 60px;
    margin-right: 15px;
  }
`;

const PostItem = ({
  title,
  date,
  category,
  categoryColor,
  tags,
  thumbnail: {
    childImageSharp: { fluid },
  },
  link,
}) => {
  return (
    <Wrapper to={link}>
      <ThumbnailImage fluid={fluid} alt="Post Item Image" />
      <PostItemInfo
        title={title}
        date={date}
        category={category}
        categoryColor={categoryColor}
        tags={tags}
      />
    </Wrapper>
  );
};

export default PostItem;
