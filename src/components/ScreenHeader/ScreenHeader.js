import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

import './style.css';
import backIcon from '../../assets/back_icon.png';


const ScreenHeader = ({ headerBackgroundColor, screenHeaderName, routePushBack, favouriteCheck }) => {
  return (
  <div className={`screen-header-container ${headerBackgroundColor}`}>
    <div className="screen-header-items-container">
      <button
        className="back-button"
        onClick={routePushBack}
      >
        <img src={backIcon} alt="" />
      </button>
      <div className="screen-header-name">{screenHeaderName}</div>
      <button className="favourite-button" onClick={favouriteCheck}>
        <FontAwesomeIcon className="icon-heart" icon={farHeart} />
      </button>
    </div>
  </div>
)};

export default ScreenHeader;
