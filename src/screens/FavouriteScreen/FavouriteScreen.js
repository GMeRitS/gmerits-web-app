import React, { Component } from 'react';

import './style.css';

import FavouriteRecommendationPanel from '../../components/FavouriteRecommendationPanel';
import ScreenHeader from '../../components/ScreenHeader';

class FavouriteScreen extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
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
