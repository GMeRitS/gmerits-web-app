import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import ScreenHeader from '../../components/ScreenHeader';
import UserActions from '../../actions/UserActions';
import AppConfigAction from '../../actions/AppConfigAction';
import UserListContent from '../../components/SearchNewSreenContent/UserListContent';
import SortResult from '../../components/SearchNewSreenContent/SortResult';
import AuthDataStorage from '../../helpers/StorageHelpers/AuthDataStorage';
import RoutePathConstants from '../../constants/RoutePathConstants';
import history from '../../history';

const { myQREventTicket } = RoutePathConstants;

class SearchScreen extends Component {
  constructor(props, context) {
    super(props, context);

    const {
      User: { searchInput, selectedOption }
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
        id: selectedOption
      }
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    window.scrollTo(0, 0);

    if (AuthDataStorage.getApiKey()) {
      this.props.getUser();
      this.props.getMyProfileDetail();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  handleSearchInput = e => {
    this.props.filterSearch(e.target.value.substr(0, 20));
    if (e.target.value === '') {
      this.props.getSameTopicUsers({});
    }
  };

  handleSearchBarClick = () => {
    this.setState({ shouldHeaderCollapse: true });
  };

  handleUncollapseHeader = () => {
    this.setState({ shouldHeaderCollapse: false });
    this.props.filterSearch('');
    this.props.getSameTopicUsers({});
  };

  handleSortResultButtonClick = () => {
    this.setState({ view: 'sortResultContentView' });
  };

  handleSortResultOptionsItemClick = id => {
    const { sortResultOptionsList } = this.state;

    this.setState({
      view: 'userListContentView'
    });

    this.props.selectedSortOption(
      sortResultOptionsList.find(option => option.id === id)
    );
    this.props.sortResult(id);
  };

  handleQRCodeButtonClick = () => {
    const {
      User: { myDetail }
    } = this.props;
    history.push(
      `/${myQREventTicket}?qrCode=${AuthDataStorage.getUuid()}&username=${
        myDetail.user.username
      }`
    );
  };

  render() {
    const { shouldHeaderCollapse, view, sortResultOptionsList } = this.state;
    const {
      User: { searchInput, userListAfterSortResult, selectedOption },
      AppConfig: { appConfig }
    } = this.props;

    if (_.isEmpty(appConfig)) return null;

    return (
      <div className="search-new-container">
        <div className="search-new-sub-container">
          <ScreenHeader
            sideMenuButtonVisible={true}
            qrCodeVisible={true}
            onQRButtonClick={this.handleQRCodeButtonClick}
            backgroundHeaderColor={appConfig.colors['default_gradient_top']}
          />
          <div
            className={
              shouldHeaderCollapse
                ? 'search-new-header-collapse'
                : 'search-new-header'
            }
            style={{
              backgroundImage: `url(${
                appConfig.images['search_background']['image_url']
              }), linear-gradient(${
                appConfig.colors['default_gradient_top']
              } 20%, ${appConfig.colors['default_gradient_bottom']})`
            }}
          >
            <div className="header-content">
              <div
                className={
                  shouldHeaderCollapse
                    ? 'header-background-logo-collapse'
                    : 'header-background-logo'
                }
              >
                <img
                  src={appConfig.images['search_logo']['image_url'] ? appConfig.images['search_logo']['image_url'] : ''}
                  alt=""
                />
              </div>
              <div
                className={
                  shouldHeaderCollapse
                    ? 'search-form-container-collapse'
                    : 'search-form-container'
                }
              >
                <form
                  className={
                    shouldHeaderCollapse
                      ? 'search-form-collapse'
                      : 'search-form'
                  }
                >
                  <input
                    type="text"
                    name="searchBar"
                    autoComplete="off"
                    className={
                      shouldHeaderCollapse
                        ? 'search-bar-collapse'
                        : 'search-bar'
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
            </div>
          </div>
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
              onSortResultButtonClick={this.handleSortResultButtonClick}
              userListAfterSortResult={userListAfterSortResult}
              sortResultTextColor={appConfig.colors['default_text_link']}
              sortResultIconColor={appConfig.colors['default_background']}
              profileImageCircleColorTop={
                appConfig.colors['default_gradient_top']
              }
              profileImageCircleColorBottom={
                appConfig.colors['default_gradient_bottom']
              }
            />
          ) : (
            <SortResult
              sortResultContainerWhenCollapse={shouldHeaderCollapse}
              sortResultOptions={sortResultOptionsList}
              onSortResultOptionClick={this.handleSortResultOptionsItemClick}
              selectedOption={selectedOption}
              highLightBoxColor={appConfig.colors['default_background']}
              highLightBoxBorderColor={appConfig.colors['default_background']}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['User', 'AppConfig']),
  dispatch =>
    bindActionCreators({ ...UserActions, ...AppConfigAction }, dispatch)
)(SearchScreen);
