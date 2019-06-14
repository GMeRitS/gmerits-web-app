import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft, faTimes, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

import './style.css';
import history from '../../history';

import SideMenuButton from '../../components/ToggleSideMenuButton/ToggleSideMenuButton';
import SideMenu from '../SideMenu/SideMenu';
import iconMap from '../../assets/iconMap.png';

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

  handleHideSideMenu = e => {
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
      closeIconVisible,
      mapIconVisible,
      onScreenHeaderClick,
      onCloseButtonClick,
      showEventListArrowIconVisible,
      screenHeaderNameVisible,
      screenHeaderEventNameVisible
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
          {screenHeaderNameVisible && <div className="screen-header-name">{screenHeaderName}</div>}
          {screenHeaderEventNameVisible && (
            <div className="screen-header-name-container">
              <div className="screen-header-name" onClick={onScreenHeaderClick}>{screenHeaderName}</div>
                {showEventListArrowIconVisible && (
                  <FontAwesomeIcon className="icon-show-event-list" icon={faSortDown} />
                )}
              </div>
          )}
          {heartIconVisible && (
            <button className="favourite-button" onClick={onFavouriteCheck}>
              <FontAwesomeIcon className="icon-heart" icon={farHeart} />
            </button>
          )}
          {closeIconVisible && (
            <button className="close-button" onClick={onCloseButtonClick}>
              <FontAwesomeIcon className="icon-close" icon={faTimes} />
            </button>
          )}
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
