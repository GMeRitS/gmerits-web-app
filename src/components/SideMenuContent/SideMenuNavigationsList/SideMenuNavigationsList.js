import React, { Component } from 'react';
import _ from 'lodash';

import './style.css';

import iconSwitchWorkspace from '../../../assets/iconSwitchWorkspace.png';
import iconEditProfile from '../../../assets/iconEditProfile.png';
import UserAvatar from '../../UserAvatar/UserAvatar';
import setYourSelfOffline from '../../../assets/group3.png';
import SideMenuNavigation from '../../SideMenuNavigation/SideMenuNavigation';
import iconNetwork from '../../../assets/network.png';
import iconCalendar from '../../../assets/iconCalendar.png';
import iconChat from '../../../assets/iconChats477.png';
import iconCall from '../../../assets/iconCalls517.png';
import iconFavourite from '../../../assets/iconFavourites.png';
//import iconExtralink from '../../../assets/iconExtralink.png';
import iconInfo from '../../../assets/iconInfo.png';
import iconMap from '../../../assets/iconMap.png';
import history from '../../../history';
import RoutePathConstants from '../../../constants/RoutePathConstants';

const { searchNew, favourite, editProfile, eventList } = RoutePathConstants;

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldAboutEventVisible: true,
      shouldVenueMapVisible: true
    };
  }

  handleMyFavouriteNavigationClick = () => {
    history.push(`/${favourite}`);
  };

  handleEditButtonNavigationClick = () => {
    history.push(`/${editProfile}`);
  };

  handleEventsButtonNavigationClick = () => {
    history.push(`/${eventList}`);
  };

  handleAppNetworkButtonNavigationClick = () => {
    history.push(`/${searchNew}`);
  };

  render() {
    const {
      onSwitchWorkspaceClick,
      onCloseSideMenuClick,
      userDetail
    } = this.props;

    const { shouldAboutEventVisible, shouldVenueMapVisible } = this.state;

    if (_.isEmpty(userDetail)) return null;

    return (
      <div className="side-menu-navigation-list-container">
        <div className="side-menu-navigation-list-header">
          <div className="sub-side-menu-navigation-list-header">
            <div className="profile-action">
              <button onClick={onSwitchWorkspaceClick}>
                <img
                  className="icon switch-workspace"
                  src={iconSwitchWorkspace}
                  alt=""
                />
              </button>
              <UserAvatar
                userProfileImage={userDetail['image_url']}
                isImageUrlAvailable={userDetail['image_url']}
                userActiveStatus={userDetail.online}
                avatarSize="user-image-detail"
                profileImageSize="image-detail"
                activeStatusSize="active-status-detail"
                activeStatusVisible={true}
              />
              <button onClick={this.handleEditButtonNavigationClick}>
                <img
                  className="icon edit-profile"
                  src={iconEditProfile}
                  alt=""
                />
              </button>
            </div>
            <button className="profile-active-option">
              <img src={setYourSelfOffline} alt="" />
            </button>
          </div>
        </div>
        <div className="side-menu-navigation-list-content">
          <div className="navigation-list">
            <SideMenuNavigation
              icon={iconNetwork}
              navigationName="APPNAME NETWORK"
              navigationNameStyle="navigation-name-bold"
              onNavigationClick={this.handleAppNetworkButtonNavigationClick}
              onCloseSideMenuClick={onCloseSideMenuClick}
            />
            <SideMenuNavigation
              icon={iconCalendar}
              navigationName="EVENTS"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-align"
              onNavigationClick={this.handleEventsButtonNavigationClick}
              onCloseSideMenuClick={onCloseSideMenuClick}
            />
            <SideMenuNavigation
              icon={iconCalendar}
              navigationName="MY EVENTS"
              navigationNameStyle="navigation-name-default"
              elementMargin="large-navigation-element-align"
              onNavigationClick={() => {}}
              onCloseSideMenuClick={onCloseSideMenuClick}
            />
            <SideMenuNavigation
              icon={iconChat}
              navigationName="MY CHATS"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-align"
              onNavigationClick={() => {}}
              onCloseSideMenuClick={onCloseSideMenuClick}
            />
            <SideMenuNavigation
              icon={iconCall}
              navigationName="MY CALLS"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-align"
              onNavigationClick={() => {}}
              onCloseSideMenuClick={onCloseSideMenuClick}
            />
            <SideMenuNavigation
              icon={iconFavourite}
              navigationName="MY FAVOURITES"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-align"
              onNavigationClick={this.handleMyFavouriteNavigationClick}
              onCloseSideMenuClick={onCloseSideMenuClick}
            />
            {shouldAboutEventVisible && (
              <SideMenuNavigation
                icon={iconInfo}
                navigationName="ABOUT EVENT"
                navigationNameStyle="navigation-name-default"
                elementMargin="large-navigation-element-align"
                onNavigationClick={() => {}}
                onCloseSideMenuClick={onCloseSideMenuClick}
              />
            )}
            {shouldVenueMapVisible && (
              <SideMenuNavigation
                icon={iconMap}
                navigationName="VENUE MAP"
                navigationNameStyle="navigation-name-default"
                elementMargin="default-navigation-element-align"
                onNavigationClick={() => {}}
                onCloseSideMenuClick={onCloseSideMenuClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default SideMenu;
