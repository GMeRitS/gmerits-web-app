import React, { Component } from 'react';

import './style.css';
import IsMobileSize from '../../helpers/MobileDetect';
import SettingsItem from '../../components/SettingsItem/SettingsItem';

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
        <div className="setting-screen-header">
          <p>SETTINGS</p>
        </div>
        <div className="setting-screen-content">
          <SettingsItem buttonVisible={true} arrowVisible={false} />
          <SettingsItem buttonVisible={false} arrowVisible={true} />
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default SettingsScreen;
