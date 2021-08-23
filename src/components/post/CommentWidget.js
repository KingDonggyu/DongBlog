import React, { createRef, useEffect } from "react";
import styled from "styled-components";

const UtterancesWrapper = styled.div`
  border: 2px dashed;
  margin: 10px;
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;
const src = "https://utteranc.es/client.js";
const repo = "KingDonggyu/DongBlog"; // 자신 계정의 레포지토리로 설정

const CommentWidget = () => {
  const element = createRef(null);

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

  return <UtterancesWrapper ref={element} />;
};

export default CommentWidget;
