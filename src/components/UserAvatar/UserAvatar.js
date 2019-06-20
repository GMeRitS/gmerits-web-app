import React from 'react';

import './style.css';

import noUserAvatarDefaultImage from '../../assets/noUserAvatarImage.jpg';

const UserAvatar = ({
  userProfileImage,
  userActiveStatus,
  avatarSize,
  profileImageSize,
  activeStatusSize,
  activeStatusVisible,
  isMentorUser,
  isImageUrlAvailable
}) => (
  <div className={`user-image ${avatarSize}`}>
    <div className={isMentorUser ? 'user-image-container' : ''}>
      <img src={isImageUrlAvailable !== null ? userProfileImage : noUserAvatarDefaultImage} className={profileImageSize} alt="" />
    </div>
    {activeStatusVisible && (
      <div
        className={`user-active-status ${userActiveStatus} ${activeStatusSize}`}
      />
    )}
  </div>
);

export default UserAvatar;
