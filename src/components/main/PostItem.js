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
  align-items: center;
  border-bottom: 1px dashed #606163;
  @media (max-width: 1100px) {
    flex: none;
    height: auto;
  }
`;

const ThumbnailImage = styled(Img)`
  width: 150px;
  height: 100%;
  margin-right: 30px;
  border-radius: 5px;
  border: 1px solid;
  @media (max-width: 1100px) {
    margin-right: 20px;
  }
  @media (max-width: 768px) {
    display: none;
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
