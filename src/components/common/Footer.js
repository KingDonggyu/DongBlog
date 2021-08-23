import React from "react";
import styled from "styled-components";

const FooterWrapper = styled.div`
  color: white;
  display: grid;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;
  @media (max-width: 1100px) {
    
    padding: 15px;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      Thank You for Visiting My Blog, Have a Good Day 😆
      <br />© 2021 Developer KimDonggyu.
    </FooterWrapper>
  );
};

export default Footer;
