import React, { Component } from 'react';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import FavouriteRecommendationPanel from '../../components/FavouriteRecommendationPanel';
import ScreenHeader from '../../components/ScreenHeader';

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

    return (
      <div className="favourite-screen-container">
        <ScreenHeader
          defaultGradientTop="rgb(22, 10, 32)"
          defaultGradientBottom="rgb(35, 24, 45)"
          heartIconVisible={false}
          screenHeaderName="FAVOURITES"
          buttonBackVisible={false}
          sideMenuButtonVisible={true}
        />
        <FavouriteRecommendationPanel />
      </div>
    );
  }
}

export default FavouriteScreen;
