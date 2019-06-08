import React, { Component } from 'react';

import './style.css';
import IsMobileSize from '../../helpers/MobileDetect';
import SettingsItem from '../../components/SettingsItem/SettingsItem';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

class SettingsScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize()
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };
  render() {
    const { isOnMobileSize } = this.state;
    return isOnMobileSize ? (
      <div className="setting-screen-container">
        <ScreenHeader
          heartIconVisible={false}
          headerBackgroundColor="light-mint"
          screenHeaderName="SETTINGS"
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
          />
          <SettingsItem
            settingName="Your Organizations"
            buttonVisible={false}
            arrowVisible={true}
            logoutIconVisible={false}
          />
          <div className="setting">
            <p>PRIVACY AND SECURITY</p>
          </div>
          <SettingsItem
            settingName="Who can contact me?"
            buttonVisible={false}
            arrowVisible={true}
            logoutIconVisible={false}
          />
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
          <div className="setting">
            <p>NOTIFICATIONS</p>
          </div>
          <SettingsItem
            settingName="Push notifications"
            buttonVisible={false}
            arrowVisible={true}
            logoutIconVisible={false}
          />
          <SettingsItem
            settingName="Email and SMS notifications"
            buttonVisible={false}
            arrowVisible={true}
            logoutIconVisible={false}
          />
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
          />
          <SettingsItem
            settingName="Privacy Policy"
            buttonVisible={false}
            arrowVisible={true}
            logoutIconVisible={false}
          />
          <SettingsItem
            settingName="About [App Name]"
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
          />
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default SettingsScreen;
