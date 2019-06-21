import React, { Component } from 'react';

import './style.css';
import history from '../../history';

import SideMenuNavigationsList from '../SideMenuContent/SideMenuNavigationsList/SideMenuNavigationsList';
import SideMenuWorkspaceView from '../SideMenuContent/SideMenuWorkspaceView/SideMenuWorkSpaceView';

import RoutePathConstants from '../../constants/RoutePathConstants';
import iconSettings from '../../assets/iconSettings.png';
import iconLogout from '../../assets/iconLogout.png';
import userAvatar from '../../assets/youngBoyAvatar.png';
import votedIcon from '../../assets/voted.png';
import notVotedIcon from '../../assets/notVoted.png';

const { searchNew, settings } = RoutePathConstants;

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: '',
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

  handleSwitchWorkspaceIconClick = () => {
    this.setState({ view: 'sideMenuWorkSpaceView' });
  };

  handleWorkSpaceClick = () => {
    history.push(`/${searchNew}`);
  };

  handleSettingsNavigationClick = () => {
    history.push(`/${settings}`);
  };

  render() {
    const { view, user } = this.state;

    return (
      <div className="side-menu-container">
        {view !== 'sideMenuWorkSpaceView' ? (
          <SideMenuNavigationsList
            onSwitchWorkspaceClick={this.handleSwitchWorkspaceIconClick}
          />
        ) : (
          <SideMenuWorkspaceView
            onWorkSpaceItemCLick={this.handleWorkSpaceClick}
          />
        )}
        <div className="side-menu-footer">
          <button onClick={this.handleSettingsNavigationClick}>
            <img className="setting-button" src={iconSettings} alt="" />
          </button>
          <div className="profile-name">{user.userName}</div>
          <button>
            <img className="logout-button" src={iconLogout} alt="" />
          </button>
        </div>
      </div>
    );
  }
}

export default SideMenu;
