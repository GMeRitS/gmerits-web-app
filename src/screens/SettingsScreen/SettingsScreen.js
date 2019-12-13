import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import './style.css';
import history from '../../history';
import SettingsItem from '../../components/SettingsItem';
import ScreenHeader from '../../components/ScreenHeader';
import RoutePathConstants from '../../constants/RoutePathConstants';
import AlertBox from '../../components/AlertBox';
import AuthDataStorage from '../../helpers/StorageHelpers/AuthDataStorage';
import AuthActions from '../../actions/AuthActions';

const {
  editProfile,
  serviceTerms,
  privacyPolicy,
  loginScreen
} = RoutePathConstants;

class SettingsScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      logoutAlert: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleEditProfileSettingOnClick = () => {
    history.push(`/${editProfile}`);
  };

  handleServiceTermsSettingOnClick = () => {
    history.push(`/${serviceTerms}`);
  };
  handlePrivacyPolicysSettingOnClick = () => {
    history.push(`/${privacyPolicy}`);
  };

  handleLogoutButtonClick = () => {
    this.setState({ logoutAlert: true });
  };

  handleCancelOptionClick = () => {
    this.setState({ logoutAlert: false });
  };

  handleLogoutOptionClick = () => {
    this.props.signout();
    AuthDataStorage.removeApiKeyAndUuidAndAppKey();
    history.push(`/${loginScreen}`);
  };

  render() {
    const { logoutAlert } = this.state;

    return (
      <div className="setting-screen-container">
        <ScreenHeader
          defaultGradientTop="rgb(22, 10, 32)"
          defaultGradientBottom="rgb(35, 24, 45)"
          screenHeaderName="SETTINGS"
          sideMenuButtonVisible={true}
        />
        <div className="settings-screen-content">
          <div className="setting">
            <p>USER ACCOUNT</p>
          </div>
          <SettingsItem
            settingName="Status"
            switchActiveText="Online"
            switchInactiveText="Offline"
            buttonVisible={true}
            arrowVisible={false}
            logoutIconVisible={false}
          />
          <SettingsItem
            settingName="Edit profile"
            buttonVisible={false}
            arrowVisible={true}
            logoutIconVisible={false}
            onSettingsItemClick={this.handleEditProfileSettingOnClick}
          />
          {/*<SettingsItem*/}
          {/*  settingName="Your Organizations"*/}
          {/*  buttonVisible={false}*/}
          {/*  arrowVisible={true}*/}
          {/*  logoutIconVisible={false}*/}
          {/*/>*/}
          <div className="setting">
            <p>PRIVACY AND SECURITY</p>
          </div>
          {/*<SettingsItem*/}
          {/*  settingName="Who can contact me?"*/}
          {/*  buttonVisible={false}*/}
          {/*  arrowVisible={true}*/}
          {/*  logoutIconVisible={false}*/}
          {/*/>*/}
          <SettingsItem
            settingName="Profile visibility"
            switchActiveText="Visible"
            switchInactiveText="Invisible"
            buttonVisible={true}
            arrowVisible={false}
            logoutIconVisible={false}
          />
          <div className="setting-note">
            <p>
              If you hide your profile the other users will not find it in the
              search results. However, all the information stored on your
              profile is stored safely. You can change your profile back to
              visible at anytime.
            </p>
          </div>
          {/*<div className="setting">*/}
          {/*  <p>NOTIFICATIONS</p>*/}
          {/*</div>*/}
          {/*<SettingsItem*/}
          {/*  settingName="Push notifications"*/}
          {/*  buttonVisible={false}*/}
          {/*  arrowVisible={true}*/}
          {/*  logoutIconVisible={false}*/}
          {/*/>*/}
          {/*<SettingsItem*/}
          {/*  settingName="Email and SMS notifications"*/}
          {/*  buttonVisible={false}*/}
          {/*  arrowVisible={true}*/}
          {/*  logoutIconVisible={false}*/}
          {/*/>*/}
          <div className="setting">
            <p>SUPPORT</p>
          </div>
          <SettingsItem
            settingName="Send Feedback"
            buttonVisible={false}
            arrowVisible={true}
            logoutIconVisible={false}
          />
          <SettingsItem
            settingName="Switch language"
            buttonVisible={false}
            arrowVisible={true}
            logoutIconVisible={false}
          />
          <div className="setting">
            <p>ABOUT</p>
          </div>
          <SettingsItem
            settingName="Service Terms"
            buttonVisible={false}
            arrowVisible={true}
            logoutIconVisible={false}
            onSettingsItemClick={this.handleServiceTermsSettingOnClick}
          />
          <SettingsItem
            settingName="Privacy Policy"
            buttonVisible={false}
            arrowVisible={true}
            logoutIconVisible={false}
            onSettingsItemClick={this.handlePrivacyPolicysSettingOnClick}
          />
          <SettingsItem
            settingName="About Unified Science"
            buttonVisible={false}
            arrowVisible={true}
            logoutIconVisible={false}
          />
          <div className="setting">
            <p>LOGINS</p>
          </div>
          <SettingsItem
            settingName="Log out"
            buttonVisible={false}
            arrowVisible={false}
            logoutIconVisible={true}
            onSettingsItemClick={this.handleLogoutButtonClick}
          />
        </div>
        {logoutAlert && (
          <AlertBox
            alertTextLabel="Are you sure you want to log out?"
            alertText="If you log in later with this device your chat and call history will be restored."
            leftOption="Cancel"
            rightOption="Log out"
            onLeftOptionClick={this.handleCancelOptionClick}
            onRightOptionClick={this.handleLogoutOptionClick}
            leftOptionVisible={true}
            rightOptionVisible={true}
          />
        )}
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['Auth']),
  dispatch => bindActionCreators({ ...AuthActions }, dispatch)
)(SettingsScreen);
