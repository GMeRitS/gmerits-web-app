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
import AlertBox from '../AlertBox';
import LocalStorage from '../../lib/LocalStorage';
import AuthActions from '../../actions/AuthActions';

const { settings, loginScreen } = RoutePathConstants;

class SideMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      menuOpen: false,
      logoutAlert: false
    };
  }

  componentDidMount() {
    if (!LocalStorage.get('apikey')) {
    } else {
      this.props.getMyProfileDetail(LocalStorage.get('uuid'));
    }
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

  handleLogoutButtonClick = () => {
    this.setState({ logoutAlert: true });
  };

  handleCancelOptionClick = () => {
    this.setState({ logoutAlert: false });
  };

  handleLogoutOptionClick = () => {
    this.props.signout();
    LocalStorage.remove('apikey');
    LocalStorage.remove('uuid');
    history.push(`/${loginScreen}`);
  };

  render() {
    const { view, logoutAlert } = this.state;
    const {
      User: { myDetail }
    } = this.props;

    if (_.isEmpty(myDetail)) return null;

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
            userDetail={myDetail}
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
          <div className="profile-name">{myDetail.username}</div>
          <button onClick={this.handleLogoutButtonClick}>
            <img className="logout-button" src={iconLogout} alt="" />
          </button>
        </div>
        {logoutAlert && (
          <AlertBox
            alertTextLabel="Are you sure you want to log out?"
            alertText="If you log in later with this device your chat and call history will be restored."
            leftOption="Cancel"
            rightOption="Log out"
            onLeftOptionClick={this.handleCancelOptionClick}
            onRightOptionClick={this.handleLogoutOptionClick}
          />
        )}
      </Menu>
    );
  }
}

export default connect(
  state => _.pick(state, ['User', 'Auth']),
  dispatch => bindActionCreators({ ...UserActions, ...AuthActions }, dispatch)
)(SideMenu);
