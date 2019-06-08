import React, { Component } from 'react';

import './style.css';
import IsMobileSize from "../../helpers/MobileDetect";

class SettingScreen extends Component {
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
      <div>
        Helloooooooooo
      </div>
    ) : <div>Too big screen</div>;
  }
}

export default SettingScreen;