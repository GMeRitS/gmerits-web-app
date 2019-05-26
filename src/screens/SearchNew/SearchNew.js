import React, { Component } from 'react';

import './style.css';
import emccLogo from '../../assets/emccLogo2.png';
import sortListingImage from '../../assets/sortListing.png';
import userAvatar from '../../assets/youngBoyAvatar.jpg';

import IsMobileSize from '../../helpers/MobileDetect';
import UserListItem from '../../components/UserListItem/UserListItem';

class SearchNew extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize()
    }
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
    console.log(IsMobileSize());
  };



  render() {
    const { isOnMobileSize } = this.state;

    return(
      isOnMobileSize ? <div className="search-new-container">
        <div className="search-new-header">
          <div className="menuToggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="emccLogo">
            <img src={emccLogo} alt=""/>
          </div>
          <form className="search-form">
           <input type="text" name="searchBar" className="search-bar"/>
          </form>
        </div>
        <div className="search-new-body">
          <div className="show-more-results">
            <span>SHOW RESULTS</span>
            <img src={sortListingImage} alt=""/>
          </div>
          <UserListItem
            userProfileImage={userAvatar}
            userName="Mia"
            userDescription="I’m a award winning designer. If you need tutoring for art studies..."
          />
        </div>
      </div> : <div>Too big screen size</div>
    )
  }
}

export default SearchNew;