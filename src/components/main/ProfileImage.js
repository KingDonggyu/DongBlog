import React from "react";
import styled from "styled-components";

import profile_image from "../../../static/profile-image.jpeg"

const PROFILE_IMAGE_LINK =
  "https://cdn.pixabay.com/photo/2019/05/13/22/19/cat-baby-4201051_1280.jpg";

const ProfileImageWrapper = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
`;

const ProfileImage = () => {
  return <ProfileImageWrapper src={profile_image} alt="Profile Image" />;
};

export default ProfileImage;
