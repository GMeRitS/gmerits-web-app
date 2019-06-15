import React from 'react';

import './style.css';

import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

const ServiceTermsScreen = () => (
  <div className="service-terms-container">
    <ScreenHeader
      headerBackgroundColor="light-mint"
      screenHeaderName="service terms"
      screenHeaderNameVisible={true}
      buttonBackVisible={true}
    />
    <div className="service-terms-content">
      <p>Annoying</p>
    </div>
  </div>
);

export default ServiceTermsScreen;
