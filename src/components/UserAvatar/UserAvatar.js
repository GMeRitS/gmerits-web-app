import React from 'react';

import './style.css';

const UserAvatar = ({
  userProfileImage,
  userActiveStatus,
  avatarSize,
  profileImageSize,
  activeStatusSize,
  activeStatusVisible
}) => (
  <div className={`user-image ${avatarSize}`}>
    <img src={userProfileImage} className={profileImageSize} alt="" />
    {activeStatusVisible && <div
      className={`user-active-status ${userActiveStatus} ${activeStatusSize}`}
    />}
  </div>
);

export default UserAvatar;
