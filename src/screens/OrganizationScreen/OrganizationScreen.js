import React, { Component } from 'react';

import './style.css';

import startupRefugees from '../../assets/stratuprefugees.png';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

class OrganizationScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }
  render() {
    return (
      <div className="organization-container">
        <div className="organization-header">
          <ScreenHeader
            headerBackgroundColor="blue"
            screenHeaderName="CHANNEL XYZ"
          />
          <div className="organization-sub-header">
            <img src={startupRefugees} alt="" />
            <div className="organization-description">
              <p>
                XYZ is a event like no other. We offer new, interactive and
                international arena for people who are bold enough to build a
                better future for learning, and dare to share their wild ideas
                and visions.
              </p>
            </div>
          </div>
        </div>
        <div className="organization-content" />
      </div>
    );
  }
}

export default OrganizationScreen;
