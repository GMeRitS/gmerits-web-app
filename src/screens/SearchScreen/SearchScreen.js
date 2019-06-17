import React, { Component } from 'react';

import './style.css';
import emccLogo from '../../assets/emccLogo2.png';
import sortListingImage from '../../assets/sortListing.png';
import IsMobileSize from '../../helpers/MobileDetect';
import UserListItem from '../../components/UserListItem/UserListItem';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

import RoutePathConstants from '../../constants/RoutePathConstants';
import history from '../../history';
import users from '../../MockData/Users';

const { searchNew } = RoutePathConstants;

class UserSearch extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      searchInput: '',
      shouldHeaderCollapse: false,
      userList: users
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    window.scrollTo(0, 0);
  }

  // componentWillMount() {
  //   document.addEventListener('mousedown', this.handleUncollapseHeader, false);
  // }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);

    // document.removeEventListener(
    //   'mousedown',
    //   this.handleUncollapseHeader,
    //   false
    // );
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  handleUserListItemClick = id => {
    history.push(`/${searchNew}/${id}`);
  };

  handleToggleSideMenuButtonClick = () => {
    this.setState(prevState => {
      return { sideMenuOpen: !prevState.sideMenuOpen };
    });
  };

  handleHideSideMenu = e => {
    this.setState({ sideMenuOpen: false });
  };

  handleSearchInput = e => {
    this.setState({ searchInput: e.target.value.substr(0, 20) });
  };

  handleSearchBarClick = () => {
    this.setState({ shouldHeaderCollapse: true });
  };

  handleUncollapseHeader = () => {
    this.setState({ shouldHeaderCollapse: false });
  };

  render() {
    const { isOnMobileSize, searchInput, shouldHeaderCollapse } = this.state;

    let filteredSearchInput = this.state.userList.filter(
      result =>
        result.userName.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    );

    return isOnMobileSize ? (
      <div className="search-new-container">
        <ScreenHeader
          headerBackgroundColor="blue"
          sideMenuButtonVisible={true}
        />
        <div className={shouldHeaderCollapse ? 'search-new-header-collapse' : 'search-new-header'}>
          <div className={shouldHeaderCollapse ? 'emccLogo-collapse' : 'emccLogo'}>
            <img src={emccLogo} alt="" />
          </div>
          <form className="search-form">
            <input
              type="text"
              name="searchBar"
              className={shouldHeaderCollapse ? 'search-bar-collapse' : 'search-bar'}
              placeholder="What are you looking for?"
              value={searchInput}
              onChange={this.handleSearchInput}
              onClick={this.handleSearchBarClick}
            />
            {shouldHeaderCollapse && (<div className="cancel-search-button" onClick={this.handleUncollapseHeader}>Cancel</div>)}
          </form>
        </div>
        <div className={shouldHeaderCollapse ? 'search-new-body-collapse' :'search-new-body'}>
          <div className="sort-results">
            <span>SORT RESULTS</span>
            <img src={sortListingImage} alt="" />
          </div>
          <div className="user-list">
            {filteredSearchInput.map((user, id) => (
              <UserListItem
                onClick={this.handleUserListItemClick}
                key={id}
                id={user.id}
                userProfileImage={user.userProfileImage}
                userActiveStatus={user.userActiveStatus}
                userName={user.userName}
                userBiography={user.userBiography}
              />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div>Too big screen size</div>
    );
  }
}

export default UserSearch;
