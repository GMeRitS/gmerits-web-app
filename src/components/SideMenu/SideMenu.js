import React, { Component } from 'react';

import './style.css';

import iconSwitchWorkspace from '../../assets/iconSwitchWorkspace.png';
import iconEditProfile from '../../assets/iconEditProfile.png';
import UserAvatar from '../UserAvatar/UserAvatar';
import userAvatar from '../../assets/youngBoyAvatar.png';
import votedIcon from '../../assets/voted.png';
import notVotedIcon from '../../assets/notVoted.png';
import setYourSelfOffline from '../../assets/group3.png';
import SideMenuNavigation from '../SideMenuNavigation/SideMenuNavigation';
import iconSettings from '../../assets/iconSettings.png';
import iconLogout from '../../assets/iconLogout.png';
import iconNetwork from '../../assets/network.png';
import iconCalendar from '../../assets/iconCalendar.png';
import iconChat from '../../assets/iconChats477.png';
import iconCall from '../../assets/iconCalls517.png';
import iconFavourite from '../../assets/iconFavourites.png';
import iconExtralink from '../../assets/iconExtralink.png';
import history from '../../history';
import RoutePathConstants from "../../constants/RoutePathConstants";

const { favourite } = RoutePathConstants;

class SideMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        id: 1,
        userProfileImage: userAvatar,
        userActiveStatus: 'active',
        userName: 'OSCAR SVENSSON',
        profession: '',
        userDescription:
          'I’m a award winning designer. If you need tutoring for art studies',
        userSkills: [
          {
            numberOfEndorsement: '174',
            skill: 'BioChemistry',
            voteStatus: votedIcon
          },
          {
            numberOfEndorsement: '154',
            skill: 'Biofuels',
            voteStatus: notVotedIcon
          },
          {
            numberOfEndorsement: '174',
            skill: 'Industrial-academic',
            voteStatus: notVotedIcon
          },
          {
            numberOfEndorsement: '174',
            skill: 'Science communication',
            voteStatus: votedIcon
          },
          {
            numberOfEndorsement: '174',
            skill: 'Entrepreneurship',
            voteStatus: notVotedIcon
          },
          {
            numberOfEndorsement: '174',
            skill: 'Industrial-academic',
            voteStatus: notVotedIcon
          }
        ]
      },
    };
  }

  handleMyFavouriteNavigationClick = () => {
    history.push(`/${favourite}`);
  };

  render() {
    const { user } = this.state;

    return (
      <div className="side-menu-container">
        <div className="side-menu-header">
          <div className="sub-side-menu-header">
            <div className="profile-action">
              <button>
                <img
                  className="icon switch-workspace"
                  src={iconSwitchWorkspace}
                  alt=""
                />
              </button>
              <UserAvatar
                userProfileImage={user.userProfileImage}
                userActiveStatus={user.userActiveStatus}
                avatarSize="user-image-detail"
                profileImageSize="image-detail"
                activeStatusSize="active-status-detail"
              />
              <button>
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
        <div className="side-menu-content">
          <div className="navigation-list">
            <SideMenuNavigation
              icon={iconNetwork}
              navigationName="APPNAME NETWORK"
              navigationNameStyle="navigation-name-bold"
            />
            <SideMenuNavigation
              icon={iconCalendar}
              navigationName="EVENTS"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-margin"
            />
            <SideMenuNavigation
              icon={iconCalendar}
              navigationName="MY EVENTS"
              navigationNameStyle="navigation-name-default"
              elementMargin="large-navigation-element-margin"
            />
            <SideMenuNavigation
              icon={iconChat}
              navigationName="MY CHATS"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-margin"
            />
            <SideMenuNavigation
              icon={iconCall}
              navigationName="MY CALLS"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-margin"
            />
            <SideMenuNavigation
              icon={iconFavourite}
              navigationName="MY FAVOURITES"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-margin"
              onNavigationClick={this.handleMyFavouriteNavigationClick}
            />
            <SideMenuNavigation
              icon={iconExtralink}
              navigationName="ADDITIONAL EXTRALINK"
              navigationNameStyle="navigation-name-default"
              elementMargin="large-navigation-element-margin"
            />
          </div>
          <div className="side-menu-footer">
            <button>
              <img className="setting-button" src={iconSettings} alt="" />
            </button>
            <div className="profile-name">{user.userName}</div>
            <button>
              <img className="logout-button" src={iconLogout} alt="" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SideMenu;
