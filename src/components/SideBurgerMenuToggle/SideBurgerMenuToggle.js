import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import './style.css';
import history from '../../history';

import SideMenuNavigationsList from '../SideMenuContent/SideMenuNavigationsList';
import SideMenuWorkspaceView from '../SideMenuContent/SideMenuWorkspaceView';

import RoutePathConstants from '../../constants/RoutePathConstants';
import iconSettings from '../../assets/iconSettings.png';
import iconLogout from '../../assets/iconLogout.png';
import UserActions from '../../actions/UserActions';

const { settings } = RoutePathConstants;

class SideMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      menuOpen: false
    };
  }

  componentDidMount() {
    this.props.getUserDetail('8bbc80f0-90a0-5092-ab27-29cc35f52d0c');
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
    const { view } = this.state;
    const {
      User: { userDetail }
    } = this.props;

    if (_.isEmpty(userDetail)) return null;

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
            userDetail={userDetail}
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
          <div className="profile-name">{userDetail.username}</div>
          <button>
            <img className="logout-button" src={iconLogout} alt="" />
          </button>
        </div>
      </Menu>
    );
  }
}

export default connect(
  state => _.pick(state, ['User']),
  dispatch => bindActionCreators({ ...UserActions }, dispatch)
)(SideMenu);
