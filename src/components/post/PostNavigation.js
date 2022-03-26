import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 97%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  color: #495057;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: center;
    margin: 0;
    height: auto;
  }
`;

const ItemWrapper = styled(Link)`
  width: 45%;
  height: 100%;
  background-color: #f8f9fa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
  box-shadow: 2px 4px 12px rgb(0 0 0 / 5%);
  transition: all 0.3s cubic-bezier(0, 0, 0.5, 1);

  &: hover {
    box-shadow: 2px 4px 16px rgb(0 0 0 / 10%);
    transform: scale3d(1.01, 1.01, 1.01);
  }

  ${({ active }) => !active && `display: none;`};

  ${({ isNext }) =>
    isNext ? `justify-content: flex-end;` : `justify-content: flex-start;`};

  @media (max-width: 1100px) {
    width: 90%;
    height: 80px;
    margin: 20px 0;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  margin-left: 20px;
  overflow: auto;

  ${({ isNext }) => (isNext ? `margin-right: 20px;` : `margin-left: 20px;`)}
`;

const ItemLabel = styled.p`
  font-size: 0.8em;
`;

const ItemTitle = styled.h3`
  font-size: 1.3em;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: 1100px) {
    font-size: 17px;
  }
`;

const NavItem = ({ isNext, node }) => {
  const isActive = node ? true : false;

  const label = isNext ? "다음 포스트" : "이전 포스트";
  const slug = node?.fields.slug;
  const title = node?.frontmatter.title;

  return (
    <ItemWrapper to={slug} active={isActive} isNext={isNext}>
      {!isNext && <IoIosArrowBack size="40" />}
      <TextWrapper isNext={isNext}>
        <ItemLabel>{label}</ItemLabel>
        <ItemTitle>{title}</ItemTitle>
      </TextWrapper>
      {isNext && <IoIosArrowForward size="40" />}
    </ItemWrapper>
  );
};

const PostNavigation = ({ previous, next }) => {
  return (
    <Container>
      <Wrapper>
        <NavItem isNext={false} node={previous} />
        <NavItem isNext={true} node={next} />
      </Wrapper>
    </Container>
  );
};

export default PostNavigation;
