import React from 'react';

import './style.css';

import UserAvatar from '../UserAvatar';
import iconOrganization from '../../assets/iconOrganisation.png';

const MAX_BIOGRAPHY_CHARS = 60;

const UserListItem = ({
  onClick,
  id,
  userProfileImage,
  organizationProfileIcon,
  userActiveStatus,
  userName,
  userBiography,
  isMentorUser,
  isImageUrlAvailable,
  isUser
}) => {
  function handleOnClick() {
    onClick(id);
  }

  function renderSwitch(isItemType) {
    switch(isItemType) {
      case '1':
        return (
          <div className="organization-icon">
            <img src={iconOrganization} alt=""/>
          </div>
        );
      case '2':
        return '';
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
          />
        );
      default:
        return (<UserAvatar
          userProfileImage={userProfileImage}
          userActiveStatus={userActiveStatus}
          avatarSize="user-image-standard"
          profileImageSize="image-standard"
          activeStatusSize="active-status-standard"
          activeStatusVisible={true}
          isMentorUser={isMentorUser}
          isImageUrlAvailable={isImageUrlAvailable}
        />);
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
