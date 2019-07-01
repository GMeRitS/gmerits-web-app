import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';

import './style.css';
import history from '../../history';

import SideMenuNavigationsList from '../SideMenuContent/SideMenuNavigationsList';
import SideMenuWorkspaceView from '../SideMenuContent/SideMenuWorkspaceView';

import RoutePathConstants from '../../constants/RoutePathConstants';
import iconSettings from '../../assets/iconSettings.png';
import iconLogout from '../../assets/iconLogout.png';
import userAvatar from '../../assets/youngBoyAvatar.png';
import votedIcon from '../../assets/voted.png';
import notVotedIcon from '../../assets/notVoted.png';

const { settings } = RoutePathConstants;

class SideMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      menuOpen: false,
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

  handleStateChange = state => {
    this.setState({ menuOpen: state.isOpen });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  handleSwitchWorkspaceIconClick = () => {
    this.setState({ view: 'sideMenuWorkSpaceView' });
  };

  handleWorkSpaceClick = () => {
    this.setState({ view: 'sideMenuNavigationList' });
  };

  handleSettingsNavigationClick = () => {
    history.push(`/${settings}`);
  };

  render() {
    const { view, user } = this.state;

    return (
      <Menu
        customCrossIcon={false}
        isOpen={this.state.menuOpen}
        onStateChange={state => this.handleStateChange(state)}
      >
        {view !== 'sideMenuWorkSpaceView' ? (
          <SideMenuNavigationsList
            onSwitchWorkspaceClick={this.handleSwitchWorkspaceIconClick}
            onCloseSideMenuClick={this.closeMenu}
          />
        ) : (
          <SideMenuWorkspaceView
            onWorkSpaceItemCLick={this.handleWorkSpaceClick}
          />
        )}
        <div className="side-menu-footer">
          <button
            onClick={() => {
              this.handleSettingsNavigationClick();
              this.closeMenu();
            }}
          >
            <img className="setting-button" src={iconSettings} alt="" />
          </button>
          <div className="profile-name">{user.userName}</div>
          <button>
            <img className="logout-button" src={iconLogout} alt="" />
          </button>
        </div>
      </Menu>
    );
  }
}

export default SideMenu;
