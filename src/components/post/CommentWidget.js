import React, { createRef, useEffect } from "react";
import ReactDisqusComments from "react-disqus-comments";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 10px;
  padding: 10px;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const UtterancesComment = () => {
  const element = createRef(null);
  const src = "https://utteranc.es/client.js";
  const repo = "KingDonggyu/DongBlog"; // 자신 계정의 레포지토리로 설정
  
  useEffect(() => {
    if (element.current === null) return;

    const utterances = document.createElement("script");
    const attributes = {
      src,
      repo,
      "issue-term": "pathname",
      label: "Comment",
      theme: `github-light`,
      crossorigin: "anonymous",
      async: "true",
    };

    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });

    element.current.appendChild(utterances);
  }, []);

  return <Wrapper ref={element} />;
}

const DisqusComment = ({ url, id, title }) => {
  return (
    <Wrapper>
      <ReactDisqusComments
        shortname="dong-blog"
        identifier={id}
        title={title}
        url={url}
      />
    </Wrapper>
  );
};

export default DisqusComment;
