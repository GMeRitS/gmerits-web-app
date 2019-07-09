import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import ScreenHeader from '../../components/ScreenHeader';
import UserActions from '../../actions/UserActions';
import UserListContent from '../../components/SearchNewSreenContent/UserListContent';
import SortResult from '../../components/SearchNewSreenContent/SortResult';

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
      sortResultOptionsList: [
        {
          id: 1,
          optionName: 'Popular',
          highlightIconArrowVisible: false
        },
        {
          id: 2,
          optionName: 'Online + popular',
          highlightIconArrowVisible: false
        },
        {
          id: 3,
          optionName: 'A - Z',
          highlightIconArrowVisible: true
        }
      ],
      selectedOption: {
        id: 3,
        optionName: 'A - Z',
        highlightIconArrowVisible: true
      }
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
    this.props.filterSearch('');
  };

  handleSortResultButtonClick = () => {
    this.setState({ view: 'sortResultContentView' });
  };

  handleSortResultOptionsItemClick = id => {
    const { sortResultOptionsList } = this.state;

    this.setState({
      view: 'userListContentView',
      selectedOption: sortResultOptionsList.find(option => option.id === id)
    });
  };

  render() {
    const {
      isOnMobileSize,
      searchInput,
      shouldHeaderCollapse,
      view,
      sortResultOptionsList,
      selectedOption
    } = this.state;

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
          {view !== 'sortResultContentView' ? (
            <UserListContent
              searchInput={searchInput}
              onUserListItemClick={this.handleUserListItemClick}
              onSortResultButtonClick={this.handleSortResultButtonClick}
            />
          ) : (
            <SortResult
              sortResultContainerWhenCollapse={shouldHeaderCollapse}
              sortResultOptions={sortResultOptionsList}
              onSortResultOptionClick={this.handleSortResultOptionsItemClick}
              selectedOption={selectedOption}
            />
          )}
        </div>
      </div>
    ) : (
      <div>Too big screen size</div>
    );
  }
}

export default connect(
  state => _.pick(state, ['User']),
  dispatch => bindActionCreators({ ...UserActions }, dispatch)
)(SearchScreen);
