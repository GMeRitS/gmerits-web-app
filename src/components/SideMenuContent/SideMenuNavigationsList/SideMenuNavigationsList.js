import React, { Component } from 'react';

import './style.css';

import iconSwitchWorkspace from '../../../assets/iconSwitchWorkspace.png';
import iconEditProfile from '../../../assets/iconEditProfile.png';
import UserAvatar from '../../UserAvatar/UserAvatar';
import userAvatar from '../../../assets/youngBoyAvatar.png';
import votedIcon from '../../../assets/voted.png';
import notVotedIcon from '../../../assets/notVoted.png';
import setYourSelfOffline from '../../../assets/group3.png';
import SideMenuNavigation from '../../SideMenuNavigation/SideMenuNavigation';
import iconNetwork from '../../../assets/network.png';
import iconCalendar from '../../../assets/iconCalendar.png';
import iconChat from '../../../assets/iconChats477.png';
import iconCall from '../../../assets/iconCalls517.png';
import iconFavourite from '../../../assets/iconFavourites.png';
import iconExtralink from '../../../assets/iconExtralink.png';
import history from '../../../history';
import RoutePathConstants from '../../../constants/RoutePathConstants';

const { searchNew, favourite, editProfile, eventList } = RoutePathConstants;

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
      }
    };
  }

  handleMyFavouriteNavigationClick = () => {
    history.push(`/${favourite}`);
    window.location.reload();
  };

  handleEditButtonNavigationClick = () => {
    history.push(`/${editProfile}`);
    window.location.reload();
  };

  handleEventsButtonNavigationClick = () => {
    history.push(`/${eventList}`);
    window.location.reload();
  };

  handleAppNetworkButtonNavigationClick = () => {
    history.push(`/${searchNew}`);
    window.location.reload();
  };

  render() {
    const { user } = this.state;
    const { onSwitchWorkspaceClick } = this.props;

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
                userProfileImage={user.userProfileImage}
                userActiveStatus={user.userActiveStatus}
                avatarSize="user-image-detail"
                profileImageSize="image-detail"
                activeStatusSize="active-status-detail"
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
            />
            <SideMenuNavigation
              icon={iconCalendar}
              navigationName="EVENTS"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-align"
              onNavigationClick={this.handleEventsButtonNavigationClick}
            />
            <SideMenuNavigation
              icon={iconCalendar}
              navigationName="MY EVENTS"
              navigationNameStyle="navigation-name-default"
              elementMargin="large-navigation-element-align"
            />
            <SideMenuNavigation
              icon={iconChat}
              navigationName="MY CHATS"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-align"
            />
            <SideMenuNavigation
              icon={iconCall}
              navigationName="MY CALLS"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-align"
            />
            <SideMenuNavigation
              icon={iconFavourite}
              navigationName="MY FAVOURITES"
              navigationNameStyle="navigation-name-default"
              elementMargin="default-navigation-element-align"
              onNavigationClick={this.handleMyFavouriteNavigationClick}
            />
            <SideMenuNavigation
              icon={iconExtralink}
              navigationName="ADDITIONAL EXTRALINK"
              navigationNameStyle="navigation-name-default"
              elementMargin="large-navigation-element-align"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SideMenu;
