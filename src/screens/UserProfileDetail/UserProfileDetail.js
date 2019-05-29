import React, { Component } from 'react';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import userAvatarWomen from "../../assets/img_avatar_women.png";

class UserProfileDetail extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      user: {
        userProfileImage: userAvatarWomen,
        userActiveStatus: 'active',
        userName: 'Doc Emilia',
        userDescription:
          'I’m the marketing manager and co-founder of Sisters in Business and'
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
    console.log(IsMobileSize());
  };

  render() {
    const { isOnMobileSize, user } = this.state;
    // const {
    //   userProfileImage,
    //   userActiveStatus
    // } = this.props;

    return isOnMobileSize ? (
      <div className="profile-container">
        <div className="profile-header">
          <div className="user-detail-avatar">
            <UserAvatar
              userProfileImage={user.userProfileImage}
              userActiveStatus={user.userActiveStatus}
              avatarSize="user-image-detail"
              profileImageSize="image-detail"
              activeStatusSize="active-status-detail"
            />
          </div>
          <div className="user-detail-name">{user.userName}</div>
        </div>
      </div>
    ) : (
      <div>Too big screen size</div>
    )
  }
}

export default UserProfileDetail;

