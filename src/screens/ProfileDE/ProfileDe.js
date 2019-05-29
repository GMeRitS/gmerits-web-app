import React, { Component } from 'react';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';

class ProfileDE extends Component {
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
    console.log(IsMobileSize());
  };

  render() {
    const { isOnMobileSize } = this.state;

    return isOnMobileSize ? (
      <div className="profile-container">
        <div className="profile-header">

        </div>
      </div>
    ) : (
      <div>Too big screen size</div>
    )
  }
}

export default ProfileDE;

