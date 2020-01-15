import React from 'react';

import './style.css';

import UserAvatar from '../UserAvatar';
import iconOrganization from '../../assets/iconOrganisation.png';
import iconHashTagTopic from '../../assets/iconHashtagRound.png';

const MAX_BIOGRAPHY_CHARS = 60;

const UserListItem = ({
  onClick,
  id,
  userProfileImage,
  userActiveStatus,
  userName,
  userBiography,
  isMentorUser,
  isImageUrlAvailable,
  isUser,
  statusOnline,
  statusOffline,
  profileImageCircleColorTop,
  profileImageCircleColorBottom
}) => {
  function handleOnClick() {
    onClick(id, isUser);
  }

  function renderSwitch(isItemType) {
    switch (isItemType) {
      case '1':
        return (
          <div className="organization-topic-icon">
            <img src={iconOrganization} alt="" />
          </div>
        );
      case '2':
        return (
          <div className="organization-topic-icon">
            <img src={iconHashTagTopic} alt="" />
          </div>
        );
      case '3':
        return (
          <UserAvatar
            userProfileImage={userProfileImage}
            userActiveStatus={userActiveStatus}
            avatarSize="user-image-standard"
            profileImageSize="image-standard"
            activeStatusSize="active-status-standard"
            activeStatusVisible={true}
            isMentorUser={isMentorUser}
            isImageUrlAvailable={isImageUrlAvailable}
            statusOnline={statusOnline}
            statusOffline={statusOffline}
            profileImageCircleColorTop={profileImageCircleColorTop}
            profileImageCircleColorBottom={profileImageCircleColorBottom}
          />
        );
      default:
        return (
          <UserAvatar
            userProfileImage={userProfileImage}
            userActiveStatus={userActiveStatus}
            avatarSize="user-image-standard"
            profileImageSize="image-standard"
            activeStatusSize="active-status-standard"
            activeStatusVisible={true}
            isMentorUser={isMentorUser}
            isImageUrlAvailable={isImageUrlAvailable}
            statusOnline={statusOnline}
            statusOffline={statusOffline}
            profileImageCircleColorTop={profileImageCircleColorTop}
            profileImageCircleColorBottom={profileImageCircleColorBottom}
          />
        );
    }
  }

  return (
    <div className="user-item-container" onClick={handleOnClick}>
      <div className="user-item-sub-container">
        {/*<UserAvatar*/}
        {/*  userProfileImage={userProfileImage}*/}
        {/*  userActiveStatus={userActiveStatus}*/}
        {/*  avatarSize="user-image-standard"*/}
        {/*  profileImageSize="image-standard"*/}
        {/*  activeStatusSize="active-status-standard"*/}
        {/*  activeStatusVisible={true}*/}
        {/*  isMentorUser={isMentorUser}*/}
        {/*  isImageUrlAvailable={isImageUrlAvailable}*/}
        {/*/>*/}
        {renderSwitch(isUser)}
        <div className="user-content">
          <div
            className={`user-name ${
              userBiography ? '' : 'no-user-biography-username'
            }`}
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
