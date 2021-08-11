import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }
`;

const PostItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const PostItem = ({ title, date, category, tags, summary, tumbnail, link }) => {
  return <PostItemContent></PostItemContent>;
};

export default PostItem;
