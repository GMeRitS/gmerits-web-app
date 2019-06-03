import React, { Component } from 'react';

import './style.css';
import emccLogo from '../../assets/emccLogo2.png';
import sortListingImage from '../../assets/sortListing.png';
import IsMobileSize from '../../helpers/MobileDetect';
import UserListItem from '../../components/UserListItem/UserListItem';
import ToggleSideMenuButton from '../../components/ToggleSideMenuButton/ToggleSideMenuButton';
import RoutePathConstants from '../../constants/RoutePathConstants';
import history from '../../history';
import users from '../../MockData/Users';

const { userSearch } = RoutePathConstants;

class UserSearch extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      userList: users
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
  };

  handleUserListItemClick = id => {
    history.push(`/${userSearch}/${id}`);
  };

  render() {
    const { isOnMobileSize, userList } = this.state;

    return isOnMobileSize ? (
      <div className="search-new-container">
        <div className="search-new-header">
          <ToggleSideMenuButton />
          <div className="emccLogo">
            <img src={emccLogo} alt="" />
          </div>
          <form className="search-form">
            <input
              type="text"
              name="searchBar"
              className="search-bar"
              placeholder="Who are you looking for?"
            />
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
                onClick={this.handleUserListItemClick}
                key={id}
                id={user.id}
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
