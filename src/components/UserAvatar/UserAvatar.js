import React from 'react';

import './style.css';

const UserAvatar = ({
  userProfileImage,
  userActiveStatus,
  avatarSize,
  profileImageSize,
  activeStatusSize,
  activeStatusVisible,
  isMentorUser
}) => (
  <div className={`user-image ${avatarSize}`}>
    <div className={isMentorUser ? 'user-image-container' : ''}>
      <img src={userProfileImage} className={`profile-image ${profileImageSize}`} alt="" />
    </div>
    {activeStatusVisible && (
      <div
        className={`user-active-status ${userActiveStatus} ${activeStatusSize}`}
      />
    )}
  </div>
);

export default UserAvatar;
