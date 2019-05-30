import React, { Component } from 'react';

import './style.css';
import emccLogo from '../../assets/emccLogo2.png';
import sortListingImage from '../../assets/sortListing.png';
import userAvatar from '../../assets/youngBoyAvatar.png';
import avatarBoy from '../../assets/img_avatar_boy.png';
import userAvatarWomen from '../../assets/img_avatar_women.png';

import IsMobileSize from '../../helpers/MobileDetect';
import UserListItem from '../../components/UserListItem/UserListItem';

class UserSearch extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      userList: [
        {
          userProfileImage: userAvatar,
          userActiveStatus: 'active',
          userName: 'Mia',
          userDescription:
            'I’m a award winning designer. If you need tutoring for art studies'
        },
        {
          userProfileImage: avatarBoy,
          userActiveStatus: 'active',
          userName: 'Tom',
          userDescription:
            'Tom graduated in 2003 with a BA in Engineering and is an active alumni '
        },
        {
          userProfileImage: userAvatar,
          userActiveStatus: 'active',
          userName: 'Zharif',
          userDescription:
            'Football is my life! I’m a professional football player and a junior coach'
        },
        {
          userProfileImage: userAvatarWomen,
          userActiveStatus: 'offline',
          userName: 'Yeo',
          userDescription:
            'I’m the marketing manager and co-founder of Sisters in Business and'
        },
        {
          userProfileImage: userAvatar,
          userActiveStatus: 'active',
          userName: 'John',
          userDescription:
            'I’m a award winning designer. If you need tutoring for art studies'
        },
        {
          userProfileImage: avatarBoy,
          userActiveStatus: 'active',
          userName: 'Oscar',
          userDescription:
            'Oscar graduated in 2003 with a BA in Engineering and is an active alumni'
        },
        {
          userProfileImage: userAvatarWomen,
          userActiveStatus: 'active',
          userName: 'Maj-Lis',
          userDescription:
            'Football is my life! I’m a professional football player and a junior coach'
        }
      ]
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
    console.log(IsMobileSize());
  };

  render() {
    const { isOnMobileSize, userList } = this.state;

    return isOnMobileSize ? (
      <div className="search-new-container">
        <div className="search-new-header">
          <div className="menuToggle">
            <span />
            <span />
            <span />
          </div>
          <div className="emccLogo">
            <img src={emccLogo} alt="" />
          </div>
          <form className="search-form">
            <input type="text" name="searchBar" className="search-bar" />
          </form>
        </div>
        <div className="search-new-body">
          <div className="show-more-results">
            <span>SHOW RESULTS</span>
            <img src={sortListingImage} alt="" />
          </div>
          <div className="user-list">
            {userList.map((user, id) => (
              <UserListItem
                key={id}
                userProfileImage={user.userProfileImage}
                userActiveStatus={user.userActiveStatus}
                userName={user.userName}
                userDescription={user.userDescription}
              />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div>Too big screen size</div>
    );
  }
}

export default UserSearch;
