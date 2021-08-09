import React from "react";
import styled from "styled-components";

const PROFILE_IMAGE_LINK = "";

const ProfileImageWrapper = styled.img`
  width: 100px;
  height: 100px;
`;

const ProfileImage = () => {
  return <ProfileImageWrapper src={PROFILE_IMAGE_LINK} alt="Profile Image" />;
};

export default ProfileImage;
