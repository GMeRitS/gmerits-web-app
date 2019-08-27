import React from 'react';

import './style.css';

import ScreenHeader from "../ScreenHeader";

const DefaultScreen = ({
  screenContent,
  backButtonVisible
}) => {
  return (
    <div>
      <ScreenHeader
        headerBackgroundColor="purple-gradient"
        buttonBackVisible={backButtonVisible}
      />
      <div className="screen-content">{screenContent}</div>
    </div>
  )
};

export default DefaultScreen;