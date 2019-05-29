import React from 'react';

import './style.css';

const UserAvatar = ({
  userProfileImage,
  userActiveStatus,
  profileImageSize,
  activeStatusSize
}) => (
    <div className="user-image">
      <img src={userProfileImage} className={profileImageSize} alt="" />
      <div className={`user-active-status ${userActiveStatus} ${activeStatusSize}`}  />
    </div>
);

export default UserAvatar;
