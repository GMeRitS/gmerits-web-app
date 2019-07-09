import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faChevronLeft,
  faSortDown,
  faSortUp,
  faHeart
} from '@fortawesome/free-solid-svg-icons';

import './style.css';
import history from '../../history';

import iconMap from '../../assets/iconMap.png';
import iconInfo from '../../assets/iconInfo.png';
import SideBurgerMenuToggle from '../SideBurgerMenuToggle';

class ScreenHeader extends Component {
  handleEventNameOnClick = () => {
    const { onEventNameClick, eventId } = this.props;
    onEventNameClick(eventId);
  };

  render() {
    const {
      headerBackgroundColor,
      screenHeaderName,
      onFavouriteCheck,
      heartIconVisible,
      buttonBackVisible,
      sideMenuButtonVisible,
      infoIconVisible,
      // closeIconVisible,
      mapIconVisible,
      // onCloseButtonClick,
      arrowUp,
      clickableScreenHeaderName,
      isFavouriteIcon
    } = this.props;

    return (
      <div className={`screen-header-container ${headerBackgroundColor}`}>
        <div className="screen-header-items-container">
          {buttonBackVisible && (
            <button className="back-button" onClick={history.goBack}>
              <FontAwesomeIcon className="icon-back" icon={faChevronLeft} />
            </button>
          )}
          {sideMenuButtonVisible && <SideBurgerMenuToggle />}
          {infoIconVisible && (
            <button className="info-button" onClick={onFavouriteCheck}>
              <div className="icon-info">
                <img src={iconInfo} alt="" />
              </div>
            </button>
          )}
          {!clickableScreenHeaderName && (
            <div className="screen-header-name">{screenHeaderName}</div>
          )}
          {clickableScreenHeaderName && (
            <div className="screen-header-name-container">
              <div
                className="screen-header-event-name"
                onClick={this.handleEventNameOnClick}
              >
                {screenHeaderName}
              </div>
              {arrowUp ? (
                <FontAwesomeIcon className="icon-arrow up" icon={faSortUp} />
              ) : (
                <FontAwesomeIcon
                  className="icon-arrow down"
                  icon={faSortDown}
                />
              )}
            </div>
          )}
          {heartIconVisible && (
            <button className="favourite-button" onClick={onFavouriteCheck}>
              <FontAwesomeIcon className="icon-heart" icon={isFavouriteIcon ? faHeart : farHeart} />
            </button>
          )}
          {/*{closeIconVisible && (*/}
          {/*  <button className="close-button" onClick={onCloseButtonClick}>*/}
          {/*    <FontAwesomeIcon className="icon-close" icon={faTimes} />*/}
          {/*  </button>*/}
          {/*)}*/}
          {mapIconVisible && (
            <button className="map-button" onClick={onFavouriteCheck}>
              <div className="icon-map">
                <img src={iconMap} alt="" />
              </div>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default ScreenHeader;
