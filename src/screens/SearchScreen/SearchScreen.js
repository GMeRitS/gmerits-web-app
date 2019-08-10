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
import LocalStorage from '../../lib/LocalStorage';

const { searchNew, myQREventTicket } = RoutePathConstants;

class SearchScreen extends Component {
  constructor(props, context) {
    super(props, context);

    const {
      User: { searchInput }
    } = props;
    this.state = {
      isOnMobileSize: IsMobileSize(),
      shouldHeaderCollapse: !_.isEmpty(searchInput),
      sortResultOptionsList: [
        {
          id: 0,
          optionName: 'Popular',
          highlightIconArrowVisible: false
        },
        {
          id: 1,
          optionName: 'Online + popular',
          highlightIconArrowVisible: false
        },
        {
          id: 2,
          optionName: 'A - Z',
          highlightIconArrowVisible: true
        }
      ],
      selectedOption: {
        id: 2,
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
    this.props.getMyProfileDetail(LocalStorage.get('uuid'));
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
    this.props.filterSearch(e.target.value.substr(0, 20));
  };

  handleSearchBarClick = () => {
    this.setState({ shouldHeaderCollapse: true });
  };

  handleUncollapseHeader = () => {
    this.setState({ shouldHeaderCollapse: false });
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

    this.props.sortResult(id);
  };

  handleQRCodeButtonClick = () => {
    const { User: { myDetail } } = this.props;
    history.push(`/${myQREventTicket}?qrCode=${LocalStorage.get('uuid')}&username=${myDetail.username}`);
  };

  render() {
    const {
      isOnMobileSize,
      shouldHeaderCollapse,
      view,
      sortResultOptionsList,
      selectedOption
    } = this.state;
    const {
      User: { searchInput, userListAfterSortResult }
    } = this.props;

    return isOnMobileSize ? (
      <div className="search-new-container">
        <ScreenHeader
          headerBackgroundColor="purple-gradient-search-new"
          sideMenuButtonVisible={true}
          qrCodeVisible={true}
          onQRButtonClick={this.handleQRCodeButtonClick}
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
              userListAfterSortResult={userListAfterSortResult}
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
