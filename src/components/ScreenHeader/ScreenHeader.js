import React from 'react';

import './style.css';
import backIcon from '../../assets/back_icon.png';
import iconMakeFavourite from '../../assets/iconMakeFavourite.png';

const ScreenHeader = ({ headerBackgroundColor, screenHeaderName, routePushBack }) => (
  <div className={`screen-header-container ${headerBackgroundColor}`}>
    <div className="screen-header-items-container">
      <button
        className="back-button"
        onClick={routePushBack}
      >
        <img src={backIcon} alt="" />
      </button>
      <div className="screen-header-name">{screenHeaderName}</div>
      <button className="favourite-button">
        <img src={iconMakeFavourite} alt="" />
      </button>
    </div>
  </div>
);

export default ScreenHeader;
