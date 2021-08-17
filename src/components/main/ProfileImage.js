import React from "react";
import styled from "styled-components";
import Img from "gatsby-image";

const ProfileImageWrapper = styled(Img)`
  width: 130px;
  height: 130px;
  border-radius: 50%;
`;

const ProfileImage = ({ profileImage }) => {
  return <ProfileImageWrapper fluid={profileImage} alt="Profile Image" />;
};

export default ProfileImage;
