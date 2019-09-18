import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

import './style.css';
import history from '../../history';

import iconMap from '../../assets/iconMap.png';
import iconInfo from '../../assets/iconInfo.png';
import iconNotFavourite from '../../assets/iconMakeFavourite.png';
import iconFavourite from '../../assets/favouritedIcon.png';
import qrCodeIcon from '../../assets/qrCode.png';
import backIcon from '../../assets/backWhite.png';
//import closeIcon from '../../assets/closeIcon.png';
import SideBurgerMenuToggle from '../SideBurgerMenuToggle';

class ScreenHeader extends Component {
  handleEventNameOnClick = () => {
    const { onEventNameClick, eventId } = this.props;
    onEventNameClick(eventId);
  };

  render() {
    const {
      screenHeaderName,
      onFavouriteCheck,
      heartIconVisible,
      buttonBackVisible,
      sideMenuButtonVisible,
      infoIconVisible,
      //closeIconVisible,
      mapIconVisible,
      //onCloseButtonClick,
      arrowUp,
      clickableScreenHeaderName,
      isFavouriteIcon,
      qrCodeVisible,
      onQRButtonClick,
      defaultGradientTop,
      defaultGradientBottom
    } = this.props;

    return (
      <div className="screen-header-container" style={{ backgroundImage: `linear-gradient(${defaultGradientTop}, ${defaultGradientBottom})` }}>
        <div className="screen-header-items-container">
          {buttonBackVisible && (
            <button className="back-button" onClick={history.goBack}>
              <img src={backIcon} alt="" className="icon-back" />
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
              {isFavouriteIcon ? (
                <img src={iconFavourite} alt="" className="icon-heart" />
              ) : (
                <img src={iconNotFavourite} alt="" className="icon-heart" />
              )}
            </button>
          )}
          {/*{closeIconVisible && (*/}
          {/*  <button className="close-button" onClick={onCloseButtonClick}>*/}
          {/*    <div className="icon-close">*/}
          {/*      <img src={closeIcon} alt="" />*/}
          {/*    </div>*/}
          {/*  </button>*/}
          {/*)}*/}
          {qrCodeVisible && (
            <button className="show-qr-code-button" onClick={onQRButtonClick}>
              <img src={qrCodeIcon} className="qr-code-icon" alt="" />
            </button>
          )}
          {mapIconVisible && (
            <button className="map-button">
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
