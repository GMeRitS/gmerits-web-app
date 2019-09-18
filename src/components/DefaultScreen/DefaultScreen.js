import React from 'react';

import './style.css';

import ScreenHeader from '../ScreenHeader';

const DefaultScreen = ({ screenContent, backButtonVisible }) => {
  return (
    <div>
      <ScreenHeader
        defaultGradientTop="rgb(22, 10, 32)"
        defaultGradientBottom="rgb(35, 24, 45)"
        buttonBackVisible={backButtonVisible}
      />
      <div className="screen-content">{screenContent}</div>
    </div>
  );
};

export default DefaultScreen;
