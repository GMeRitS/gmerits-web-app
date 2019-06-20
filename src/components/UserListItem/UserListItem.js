import React from 'react';

import './style.css';

import UserAvatar from '../UserAvatar/UserAvatar';

const MAX_BIOGRAPHY_CHARS = 60;

const UserListItem = ({
  onClick,
  id,
  userProfileImage,
  userActiveStatus,
  userName,
  userBiography,
  isMentorUser,
  isImageUrlAvailable
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
          activeStatusVisible={true}
          isMentorUser={isMentorUser}
          isImageUrlAvailable={isImageUrlAvailable}
        />
        <div className="user-content">
          <div
            className={
              userBiography ? 'user-name' : 'no-user-biography-username'
            }
          >
            {userName}
          </div>
          {userBiography && (
            <div className="user-biography">
              {userBiography.length <= MAX_BIOGRAPHY_CHARS
                ? `${userBiography}`
                : `${userBiography.substring(0, MAX_BIOGRAPHY_CHARS)} ...`}
            </div>
          )}
        </div>
      </div>
      <span className="separation-line" />
    </div>
  );
};

export default UserListItem;
