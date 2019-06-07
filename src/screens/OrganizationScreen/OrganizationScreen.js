import React, { Component } from 'react';

import './style.css';

import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import organizations from '../../MockData/Organizations';
import IsMobileSize from '../../helpers/MobileDetect';

class OrganizationScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      currentOrganization: {},
      organizations: organizations
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    const {
      match: {
        params: { organizationId }
      }
    } = this.props;
    const { organizations } = this.state;
    const currentOrganization = organizations.find(
      organization => organization.id.toString() === organizationId
    );

    this.setState({ currentOrganization });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  render() {
    const { isOnMobileSize, currentOrganization } = this.state;
    if (!currentOrganization) return null;

    return isOnMobileSize ? (
      <div className="organization-container">
        <div className="organization-header">
          <ScreenHeader
            headerBackgroundColor="blue"
            screenHeaderName={currentOrganization.organizationName}
          />
          <div className="organization-sub-header">
            <img src={currentOrganization.organizationImage} alt="" />
            {currentOrganization.organizationDescription && <div className="organization-description">
              <p>{currentOrganization.organizationDescription}</p>
            </div>}
          </div>
        </div>
        <div className="organization-content" />
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default OrganizationScreen;
