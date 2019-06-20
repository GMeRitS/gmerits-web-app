import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _pick from 'lodash/pick';
import _isEmpty from 'lodash/isEmpty';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import UserListItem from '../../components/UserListItem/UserListItem';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import UserActions from '../../actions/UserActions';

import RoutePathConstants from '../../constants/RoutePathConstants';
import history from '../../history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const { searchNew } = RoutePathConstants;

class SearchScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      searchInput: '',
      shouldHeaderCollapse: false
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    window.scrollTo(0, 0);

    this.props.getUser();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
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
    this.setState({ shouldHeaderCollapse: false, searchInput: '' });
  };

  render() {
    const { isOnMobileSize, searchInput, shouldHeaderCollapse } = this.state;

    const { UserList: { userList } } = this.props;

    let filteredSearchInput = !_isEmpty(userList) && userList.filter(
      result =>
        result.username.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1
    );

    return isOnMobileSize ? (
      <div className="search-new-container">
        <ScreenHeader
          headerBackgroundColor="purple-gradient-search-new"
          sideMenuButtonVisible={true}
        />
        <div
          className={
            shouldHeaderCollapse
              ? 'search-new-header-collapse'
              : 'search-new-header'
          }
        >
          <form
            className={
              shouldHeaderCollapse ? 'search-form-collapse' : 'search-form'
            }
          >
            <input
              type="text"
              name="searchBar"
              className={
                shouldHeaderCollapse ? 'search-bar-collapse' : 'search-bar'
              }
              placeholder="What are you looking for?"
              value={searchInput}
              onChange={this.handleSearchInput}
              onClick={this.handleSearchBarClick}
            />
            {shouldHeaderCollapse && (
              <div
                className="cancel-search-button"
                onClick={this.handleUncollapseHeader}
              >
                Cancel
              </div>
            )}
          </form>
        </div>
        <div
          className={
            shouldHeaderCollapse
              ? 'search-new-body-collapse'
              : 'search-new-body'
          }
        >
          <div className="sort-results">
            <span>SORT RESULTS</span>
            <div className="icon-sort-result-container">
              <FontAwesomeIcon
                className="icon-sort-result"
                icon={faChevronDown}
              />
            </div>
          </div>
          <div className="user-list">
            {!_isEmpty(filteredSearchInput) && filteredSearchInput.map((user, id) => (
              <UserListItem
                onClick={this.handleUserListItemClick}
                key={id}
                id={user['uu_id']}
                userProfileImage={user['image_url']}
                userActiveStatus={user.online}
                userName={user.username}
                userBiography={user.biography}
                isMentorUser={user.mentor}
                isImageUrlAvailable={user['image_url']}
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

export default connect(
  state => _pick(state, ['UserList']),
  dispatch => bindActionCreators({ ...UserActions }, dispatch)
)(SearchScreen);
