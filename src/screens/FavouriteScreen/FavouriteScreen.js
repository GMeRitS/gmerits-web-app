import React, { Component } from 'react';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import FavouriteRecommendationPanel from '../../components/FavouriteRecommendationPanel/FavouriteRecommendationPanel';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

class FavouriteScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize()
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  render() {
    const { isOnMobileSize } = this.state;

    return isOnMobileSize ? (
      <div className="favourite-screen-container">
        <ScreenHeader
          headerBackgroundColor="light-mint"
          heartIconVisible={false}
          screenHeaderName="FAVOURITES"
          buttonBackVisible={false}
          sideMenuButtonVisible={true}
          screenHeaderNameVisible={true}
        />
        <FavouriteRecommendationPanel />
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default FavouriteScreen;
