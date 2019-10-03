import React from 'react';

import './style.css';

import defaultUserProfileImage from '../../assets/defaultUserAvatar.png';

const UserAvatar = ({
  userProfileImage,
  userActiveStatus,
  avatarSize,
  profileImageSize,
  activeStatusSize,
  activeStatusVisible,
  isMentorUser,
  isImageUrlAvailable,
  statusOnline,
  statusOffline
}) => {
  let activeStatusStyle = userActiveStatus ? statusOnline : statusOffline;
  return (
    <div className={`user-image ${avatarSize}`}>
      <div className={isMentorUser ? 'user-image-container' : ''}>
        <img
          src={
            (isImageUrlAvailable !== null && isImageUrlAvailable !== undefined) || isImageUrlAvailable
              ? userProfileImage
              : defaultUserProfileImage
          }
          className={profileImageSize}
          alt=""
        />
      </div>
      {activeStatusVisible && (
        <div
          className={`user-active-status ${activeStatusSize}`}
          style={{ backgroundColor: activeStatusStyle }}
        />
      )}
    </div>
  );
};

export default UserAvatar;
