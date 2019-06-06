import React from 'react';

import './style.css';
import history from '../../history';
import backIcon from '../../assets/back_icon.png';
import RoutePathConstants from '../../constants/RoutePathConstants';
import iconMakeFavourite from '../../assets/iconMakeFavourite.png';

const { userSearch } = RoutePathConstants;

const ScreenHeader = ({ headerBackgroundColor, screenHeaderName }) => (
  <div className={`screen-header-container ${headerBackgroundColor}`}>
    <div className="screen-header-items-container">
      <button
        className="back-button"
        onClick={() => history.push(`/${userSearch}`)}
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
