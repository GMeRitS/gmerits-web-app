import React from 'react';

import './style.css';

const UserListItem = ({
  userProfileImage,
  userName,
  userDescription
}) => (
  <div className="user-item-container">
    <div className="user-image">
      <img src={userProfileImage} alt="" />
      <div className="user-active-status"></div>
    </div>
    <div className="user-content">
      <div className="user-name">{userName}</div>
      <div className="user-description">{userDescription}</div>
    </div>
  </div>
);

export default UserListItem;

