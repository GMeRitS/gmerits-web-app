import React from 'react';

import './style.css';

const UserListItem = ({
  userProfileImage,
  userActiveStatus,
  userName,
  userDescription
}) => (
  <div className="user-item-container">
    <div className="user-item-sub-container">
      <div className="user-image">
        <img src={userProfileImage} alt="" />
        <div className={`user-active-status ${userActiveStatus}`}></div>
      </div>
      <div className="user-content">
        <div className="user-name">{userName}</div>
        <div className="user-description">{userDescription}</div>
      </div>
    </div>
    <span className="separation-line"/>
  </div>
);

export default UserListItem;

