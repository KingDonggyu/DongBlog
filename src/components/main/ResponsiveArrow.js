import React from "react";
import styled from "styled-components";
import { FaAngleDoubleDown } from "react-icons/fa";

const Wrapper = styled.div`
  display: none;
  position: relative;
  text-align: center;
  margin: 14px 0;
  top: 20px;
  animation-duration: 1s;
  animation-name: slideDown;
  animation-iteration-count: infinite;
  @keyframes slideDown {
    to {
      top: 30px;
    }
  }
  @media (max-width: 1100px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Arrow = styled.div`
  cursor: pointer;
  &:hover {
    color: lightgray;
  }
`;

const ResponsiveArrow = ({ scrollBox }) => {
  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = scrollBox.current;
    scrollBox.current.scrollTop = scrollHeight - clientHeight;
  };

  return (
    <Wrapper onClick={scrollToBottom}>
      <Arrow>
        <FaAngleDoubleDown size="30" />
      </Arrow>
    </Wrapper>
  );
};

export default ResponsiveArrow;
