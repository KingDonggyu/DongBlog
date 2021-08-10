import React from "react";
import styled from "styled-components";

const PROFILE_IMAGE_LINK =
  "https://cdn.pixabay.com/photo/2019/05/13/22/19/cat-baby-4201051_1280.jpg";

const ProfileImageWrapper = styled.img`
  width: 180px;
  height: 180px;
  margin-top: 30px;
  border-radius: 50%;
`;

const ProfileImage = () => {
  return <ProfileImageWrapper src={PROFILE_IMAGE_LINK} alt="Profile Image" />;
};

export default ProfileImage;
