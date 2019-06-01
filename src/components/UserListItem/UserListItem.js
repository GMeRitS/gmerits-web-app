import React from 'react';

import './style.css';

import UserAvatar from '../UserAvatar/UserAvatar';

const MAX_DESCRIPTION_CHARS = 70;

const UserListItem = ({
  onClick,
  id,
  userProfileImage,
  userActiveStatus,
  userName,
  userDescription
}) => {
  function handleOnClick() {
    onClick(id);
  }

  return (
    <div className="user-item-container" onClick={handleOnClick}>
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
            {userDescription.length <= MAX_DESCRIPTION_CHARS
              ? `${userDescription}`
              : `${userDescription.substring(0, MAX_DESCRIPTION_CHARS)}...`}
          </div>
        </div>
      </div>
      <span className="separation-line" />
    </div>
  );
};

export default UserListItem;
