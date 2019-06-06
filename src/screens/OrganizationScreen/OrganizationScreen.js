import React, { Component } from 'react';

import './style.css';

import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

class OrganizationScreen extends Component {
  render() {
    return(
      <div className="organization-container">
        <div className="organization-header">
          <ScreenHeader screenHeaderName="CHANNEL XYZ"/>
          <div>
            hello
          </div>
        </div>
      </div>
    )
  }
}

export default OrganizationScreen;