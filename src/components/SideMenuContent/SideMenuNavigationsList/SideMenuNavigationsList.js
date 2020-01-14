import React, { Component } from 'react';
import _ from 'lodash';

import './style.css';

import iconSwitchWorkspace from '../../../assets/iconSwitchWorkspace.png';
import iconEditProfile from '../../../assets/iconEditProfile.png';
import UserAvatar from '../../UserAvatar/UserAvatar';
import setYourSelfOffline from '../../../assets/group3.png';
import SideMenuNavigationItem from '../../SideMenuNavigationItem/SideMenuNavigationItem';
import iconNetwork from '../../../assets/network.png';
import iconCalendar from '../../../assets/iconCalendar.png';
import iconChat from '../../../assets/iconChats477.png';
import iconCall from '../../../assets/iconCalls517.png';
import iconFavourite from '../../../assets/iconFavourites.png';
//import iconExtralink from '../../../assets/iconExtralink.png';
// import iconInfo from '../../../assets/iconInfo.png';
// import iconMap from '../../../assets/iconMap.png';
import history from '../../../history';
import RoutePathConstants from '../../../constants/RoutePathConstants';
import AuthDataStorage from '../../../helpers/StorageHelpers/AuthDataStorage';

const { search, favourite, editProfile, eventList } = RoutePathConstants;

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
    history.push(`/${search}`);
  };

  render() {
    const {
      onSwitchWorkspaceClick,
      onCloseSideMenuClick,
      userDetail
    } = this.props;

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
                statusOnline="rgb(126, 211, 33)"
                statusOffline="rgb(195, 195, 197)"
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
            <SideMenuNavigationItem
              icon={iconNetwork}
              navigationName={AuthDataStorage.getAppName()}
              navigationNameStyle="navigation-name-bold"
              onNavigationClick={this.handleAppNetworkButtonNavigationClick}
              onCloseSideMenuClick={onCloseSideMenuClick}
            />
            <SideMenuNavigationItem
              icon={iconCalendar}
              navigationName="EVENTS"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-align"
              onNavigationClick={this.handleEventsButtonNavigationClick}
              onCloseSideMenuClick={onCloseSideMenuClick}
            />
            {/*<SideMenuNavigationItem*/}
            {/*  icon={iconCalendar}*/}
            {/*  navigationName="MY EVENTS"*/}
            {/*  navigationNameStyle="navigation-name-default"*/}
            {/*  elementMargin="large-navigation-element-align"*/}
            {/*  onNavigationClick={() => {}}*/}
            {/*  onCloseSideMenuClick={onCloseSideMenuClick}*/}
            {/*/>*/}
            <SideMenuNavigationItem
              icon={iconChat}
              navigationName="MY CHATS"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-align"
              onNavigationClick={() => {}}
              onCloseSideMenuClick={onCloseSideMenuClick}
            />
            <SideMenuNavigationItem
              icon={iconCall}
              navigationName="MY CALLS"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-align"
              onNavigationClick={() => {}}
              onCloseSideMenuClick={onCloseSideMenuClick}
            />
            <SideMenuNavigationItem
              icon={iconFavourite}
              navigationName="MY FAVOURITES"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-align"
              onNavigationClick={this.handleMyFavouriteNavigationClick}
              onCloseSideMenuClick={onCloseSideMenuClick}
            />
            {/*{shouldAboutEventVisible && (*/}
            {/*  <SideMenuNavigationItem*/}
            {/*    icon={iconInfo}*/}
            {/*    navigationName="ABOUT EVENT"*/}
            {/*    navigationNameStyle="navigation-name-default"*/}
            {/*    elementMargin="large-navigation-element-align"*/}
            {/*    onNavigationClick={() => {}}*/}
            {/*    onCloseSideMenuClick={onCloseSideMenuClick}*/}
            {/*  />*/}
            {/*)}*/}
            {/*{shouldVenueMapVisible && (*/}
            {/*  <SideMenuNavigationItem*/}
            {/*    icon={iconMap}*/}
            {/*    navigationName="VENUE MAP"*/}
            {/*    navigationNameStyle="navigation-name-default"*/}
            {/*    elementMargin="default-navigation-element-align"*/}
            {/*    onNavigationClick={() => {}}*/}
            {/*    onCloseSideMenuClick={onCloseSideMenuClick}*/}
            {/*  />*/}
            {/*)}*/}
          </div>
        </div>
      </div>
    );
  }
}

export default SideMenu;
