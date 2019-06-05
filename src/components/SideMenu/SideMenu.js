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
import navigations from '../../MockData/Navigations';
import iconSettings from '../../assets/iconSettings.png';
import iconLogout from '../../assets/iconLogout.png';

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
            numberOfVotes: '174',
            skill: 'BioChemistry',
            voteStatus: votedIcon
          },
          {
            numberOfVotes: '154',
            skill: 'Biofuels',
            voteStatus: notVotedIcon
          },
          {
            numberOfVotes: '174',
            skill: 'Industrial-academic',
            voteStatus: notVotedIcon
          },
          {
            numberOfVotes: '174',
            skill: 'Science communication',
            voteStatus: votedIcon
          },
          {
            numberOfVotes: '174',
            skill: 'Entrepreneurship',
            voteStatus: notVotedIcon
          },
          {
            numberOfVotes: '174',
            skill: 'Industrial-academic',
            voteStatus: notVotedIcon
          }
        ]
      },
      navigationList: navigations
    };
  }
  render() {
    const { user, navigationList } = this.state;

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
            {navigationList.map((nav, id) => (
              <SideMenuNavigation
                key={id}
                icon={nav.icon}
                navigationName={nav.navigationName}
                navigationNameStyle={nav.navigationNameStyle}
                elementMargin={nav.elementMargin}
              />
            ))}
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
