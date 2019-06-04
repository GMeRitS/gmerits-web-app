import React, { Component } from 'react';

import './style.css';

import iconSwitchWorkspace from '../../assets/iconSwitchWorkspace.png';
import iconEditProfile from '../../assets/iconEditProfile.png';
import UserAvatar from '../UserAvatar/UserAvatar';
import userAvatar from "../../assets/youngBoyAvatar.png";
import votedIcon from "../../assets/voted.png";
import notVotedIcon from "../../assets/notVoted.png";
import setYourSelfOffline from '../../assets/group3.png';


class SideMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        id: 1,
        userProfileImage: userAvatar,
        userActiveStatus: 'active',
        userName: 'Mia',
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
      }
    };
  }
  render() {
    const { user } = this.state;

    return(
      <div className="side-menu-container">
        <div className="side-menu-header">
          <div className="sub-side-menu-header">
            <div className="profile-action">
              <button>
                <img className="icon switch-workspace" src={iconSwitchWorkspace} alt="" />
              </button>
              <UserAvatar
                userProfileImage={user.userProfileImage}
                userActiveStatus={user.userActiveStatus}
                avatarSize="user-image-detail"
                profileImageSize="image-detail"
                activeStatusSize="active-status-detail"
              />
              <button>
                <img className="icon edit-profile" src={iconEditProfile} alt="" />
              </button>
            </div>
            <div className="profile-active-option">
              <img src={setYourSelfOffline} alt="" />
            </div>
          </div>
        </div>
        <div className="side-menu-content"></div>
      </div>
    )
  }
}

export default SideMenu;