import React, { Component } from 'react';

import './style.css';
import emccLogo from '../../assets/emccLogo2.png';
import sortListingImage from '../../assets/sortListing.png';
import IsMobileSize from '../../helpers/MobileDetect';
import UserListItem from '../../components/UserListItem/UserListItem';
import ToggleSideMenuButton from '../../components/ToggleSideMenuButton/ToggleSideMenuButton';
import SideMenu from '../../components/SideMenu/SideMenu';

import RoutePathConstants from '../../constants/RoutePathConstants';
import history from '../../history';
import users from '../../MockData/Users';

const { searchNew } = RoutePathConstants;

class UserSearch extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      sideMenuOpen: false,
      userList: users
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  handleUserListItemClick = id => {
    history.push(`/${searchNew}/${id}`);
  };

  handleToggleSideMenuButtonClick = () => {
    this.setState(prevState => {
      return { sideMenuOpen: !prevState.sideMenuOpen };
    });
  };

  handleHideSideMenu = e => {
    this.setState({ sideMenuOpen: false });
  };

  render() {
    const { isOnMobileSize, sideMenuOpen, userList } = this.state;

    let sideMenu;
    let backDrop;

    if (sideMenuOpen) {
      sideMenu = <SideMenu />;
      backDrop = (
        <div
          className="side-menu-back-drop"
          onClick={this.handleHideSideMenu}
        />
      );
    }

    return isOnMobileSize ? (
      <div className="search-new-container">
        <div className="search-new-header">
          <ToggleSideMenuButton click={this.handleToggleSideMenuButtonClick} />
          {sideMenu}
          {backDrop}
          <div className="emccLogo">
            <img src={emccLogo} alt="" />
          </div>
          <form className="search-form">
            <input
              type="text"
              name="searchBar"
              className="search-bar"
              placeholder="What are you looking for?"
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
                userBiography={user.userBiography}
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
