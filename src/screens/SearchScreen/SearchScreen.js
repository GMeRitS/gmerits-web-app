import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _pick from 'lodash/pick';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import UserActions from '../../actions/UserActions';
import UserListContent from '../../components/SearchNewSreenContent/UserListContent';
import SortResult from '../../components/SearchNewSreenContent/SortResult';
import SortOptionsItem from '../../components/SortOptionsItem';

import RoutePathConstants from '../../constants/RoutePathConstants';
import history from '../../history';

const { searchNew } = RoutePathConstants;

class SearchScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      searchInput: '',
      shouldHeaderCollapse: false,
      selectedOption: null
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

  handleSearchInput = e => {
    this.setState({ searchInput: e.target.value.substr(0, 20) });
    this.props.filterSearch(e.target.value.substr(0, 20));
  };

  handleSearchBarClick = () => {
    this.setState({ shouldHeaderCollapse: true });
  };

  handleUncollapseHeader = () => {
    this.setState({ shouldHeaderCollapse: false, searchInput: '' });
  };


  render() {
    const { isOnMobileSize, searchInput, shouldHeaderCollapse } = this.state;

    // const {
    //   User: { userList, filteredUserList }
    // } = this.props;
    //
    // const renderUserList = _isEmpty(filteredUserList)
    //   ? _isEmpty(searchInput)
    //     ? userList
    //     : filteredUserList
    //   : filteredUserList;

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
              value={searchInput}
              placeholder="What are you looking for?"
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
          {/*<UserListContent*/}
          {/*  searchInput={searchInput}*/}
          {/*  onUserListItemClick={this.handleUserListItemClick}*/}
          {/*/>*/}
          <SortResult
            sortResultContainerWhenCollapse={shouldHeaderCollapse}
            onSortResultItemClick={this.handleSortResultOptionClick}
            isSelectedOption={this.handleChosenSortResultOption}
          />
        </div>
      </div>
    ) : (
      <div>Too big screen size</div>
    );
  }
}

export default connect(
  state => _pick(state, ['User']),
  dispatch => bindActionCreators({ ...UserActions }, dispatch)
)(SearchScreen);
