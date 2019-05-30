import React from 'react';

import './style.css';

const UserAvatar = ({
  userProfileImage,
  userActiveStatus,
  avatarSize,
  profileImageSize,
  activeStatusSize
}) => (
  <div className={`user-image ${avatarSize}`}>
    <img src={userProfileImage} className={profileImageSize} alt="" />
    <div
      className={`user-active-status ${userActiveStatus} ${activeStatusSize}`}
    />
  </div>
);

export default UserAvatar;
