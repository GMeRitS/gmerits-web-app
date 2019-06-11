import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import history from '../../history';
import SideMenuButton from '../../components/ToggleSideMenuButton/ToggleSideMenuButton';

import './style.css';
import SideMenu from "../SideMenu/SideMenu";

class ScreenHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sideMenuOpen: false
    }
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
      sideMenuButtonVisible
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
          {buttonBackVisible && <button className="back-button" onClick={history.goBack}>
            <FontAwesomeIcon className="icon-back" icon={faChevronLeft}/>
          </button>}
          {sideMenuButtonVisible && <SideMenuButton click={this.handleToggleSideMenuButtonClick} />}
          {sideMenu}
          {backDrop}
          <div className="screen-header-name">{screenHeaderName}</div>
          {heartIconVisible && (
            <button className="favourite-button" onClick={onFavouriteCheck}>
              <FontAwesomeIcon className="icon-heart" icon={farHeart}/>
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default ScreenHeader;
