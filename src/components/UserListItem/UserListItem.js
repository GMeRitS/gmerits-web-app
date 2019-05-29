import React from 'react';

import './style.css';

import UserAvatar from '../UserAvatar/UserAvatar';

const UserListItem = ({
  userProfileImage,
  userActiveStatus,
  userName,
  userDescription
}) => (
  <div className="user-item-container">
    <div className="user-item-sub-container">
      <UserAvatar
        userProfileImage={userProfileImage}
        userActiveStatus={userActiveStatus}
        avatarSize="user-image-standard"
        profileImageSize="image-standard"
        activeStatusSize="active-status-standard"
      />
      <div className="user-content">
        <div className="user-name">{userName}</div>
        <div className="user-description">
          {userDescription.length < 20
            ? `${userDescription}`
            : `${userDescription.substring(0, 70)}...`}
        </div>
      </div>
    </div>
    <span className="separation-line" />
  </div>
);

export default UserListItem;
