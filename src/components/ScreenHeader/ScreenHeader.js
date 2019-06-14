import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

import './style.css';
import history from '../../history';

import SideMenuButton from '../../components/ToggleSideMenuButton/ToggleSideMenuButton';
import SideMenu from '../SideMenu/SideMenu';
import iconMap from '../../assets/iconMap.png';
import iconInfo from '../../assets/iconInfo.png';

class ScreenHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideMenuOpen: false
    };
  }

  handleToggleSideMenuButtonClick = () => {
    this.setState(prevState => {
      return { sideMenuOpen: !prevState.sideMenuOpen };
    });
  };

  handleHideSideMenu = () => {
    this.setState({ sideMenuOpen: false });
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
      showEventListArrowIconVisible,
      showScheduleArrowIconVisible,
      screenHeaderNameVisible,
      screenHeaderEventNameVisible,
      eventId,
      onEventNameClick
    } = this.props;

    const { sideMenuOpen } = this.state;

    let sideMenu;
    let backDrop;

    if (sideMenuOpen) {
      sideMenu = <SideMenu />;
      backDrop = (
        <div
          className="side-menu-back-drop"
          onClick={this.handleHideSideMenu}
        />
      );
    }

    function handleEventNameOnClick() {
      onEventNameClick(eventId);
    }

    return (
      <div className={`screen-header-container ${headerBackgroundColor}`}>
        <div className="screen-header-items-container">
          {buttonBackVisible && (
            <button className="back-button" onClick={history.goBack}>
              <FontAwesomeIcon className="icon-back" icon={faChevronLeft} />
            </button>
          )}
          {sideMenuButtonVisible && (
            <SideMenuButton click={this.handleToggleSideMenuButtonClick} />
          )}
          {sideMenu}
          {backDrop}
          {infoIconVisible && (
            <button className="info-button" onClick={onFavouriteCheck}>
              <div className="icon-info">
                <img src={iconInfo} alt="" />
              </div>
            </button>
          )}
          {screenHeaderNameVisible && <div className="screen-header-name">{screenHeaderName}</div>}
          {screenHeaderEventNameVisible && (
            <div className="screen-header-name-container">
              <div className="screen-header-event-name" onClick={handleEventNameOnClick}>{screenHeaderName}</div>
                {showEventListArrowIconVisible && (
                  <FontAwesomeIcon className="icon-arrow down" icon={faSortDown} />
                )}
                {showScheduleArrowIconVisible && (
                  <FontAwesomeIcon className="icon-arrow up" icon={faSortUp} />
                )}
              </div>
          )}
          {heartIconVisible && (
            <button className="favourite-button" onClick={onFavouriteCheck}>
              <FontAwesomeIcon className="icon-heart" icon={farHeart} />
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
