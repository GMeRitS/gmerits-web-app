import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import history from '../../history';

import './style.css';

const ScreenHeader = ({
  headerBackgroundColor,
  screenHeaderName,
  onFavouriteCheck,
  heartIconVisible
}) => {
  return (
    <div className={`screen-header-container ${headerBackgroundColor}`}>
      <div className="screen-header-items-container">
        <button className="back-button" onClick={history.goBack}>
          <FontAwesomeIcon className="icon-back" icon={faChevronLeft} />
        </button>
        <div className="screen-header-name">{screenHeaderName}</div>
        {heartIconVisible && (<button className="favourite-button" onClick={onFavouriteCheck}>
          <FontAwesomeIcon className="icon-heart" icon={farHeart} />
        </button>)}
      </div>
    </div>
  );
};

export default ScreenHeader;
