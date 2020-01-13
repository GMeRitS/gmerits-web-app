import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _pick from 'lodash/pick';

import './style.css';

import RoutePathConstants from '../../constants/RoutePathConstants';
import history from '../../history';
import SearchScreen from '../../screens/SearchScreen';
import SameTopicUserListScreen from '../../screens/SameTopicUserListScreen';
import UserProfileDetail from '../../screens/UserProfileDetail';
import EventTicketScreen from '../../screens/EventTicketScreen';
import organizationScreen from '../../screens/OrganizationScreen';
import favouriteScreen from '../../screens/FavouriteScreen';
import settingsScreen from '../../screens/SettingsScreen';
import serviceTermsScreen from '../../screens/ServiceTermsScreen';
import privacyPolicyScreen from '../../screens/PrivacyPolicyScreen';
import editProfileScreen from '../../screens/EditProfile';
import eventDetailScreen from '../../screens/SessionDetailScreen';
import eventListScreen from '../../screens/EventsListScreen';
import AuthDataStorage from '../../helpers/StorageHelpers/AuthDataStorage';

import AlertBox from '../AlertBox';
import AlertBoxAction from '../../actions/AlertBoxAction';

const {
  search,
  organization,
  favourite,
  settings,
  serviceTerms,
  editProfile,
  eventDetail,
  eventList,
  privacyPolicy,
  myQREventTicket,
  sameTopicUserListScreen,
  startScreen
} = RoutePathConstants;

class AuthApp extends Component {
  componentDidMount() {
    const {
      location: { pathname }
    } = this.props;

    if (!AuthDataStorage.getApiKey() && pathname !== '/') {
      history.push(`/${startScreen}`);
    }
  }

  handleLeftOptionClick = () => {
    this.props.alertBoxHide();
  };

  render() {
    const {
      AlertBox: {
        visible,
        alertTextLabel,
        alertText,
        leftOption,
        rightOption,
        leftOptionVisible
      }
    } = this.props;

    return (
      <div className="authed-app">
        {visible && (
          <AlertBox
            alertTextLabel={alertTextLabel}
            alertText={alertText}
            leftOption={leftOption}
            rightOption={rightOption}
            onLeftOptionClick={this.handleLeftOptionClick}
            leftOptionVisible={leftOptionVisible}
          />
        )}
        <Switch>
          <Route exact path={`/${search}`} component={SearchScreen} />
          <Route path={`/${search}/:userId`} component={UserProfileDetail} />
          <Route
            path={`/${sameTopicUserListScreen}/:topicId`}
            component={SameTopicUserListScreen}
          />
          <Route path={`/${myQREventTicket}`} component={EventTicketScreen} />
          <Route
            path={`/${organization}/:organizationId`}
            component={organizationScreen}
          />
          <Route path={`/${favourite}`} component={favouriteScreen} />
          <Route path={`/${settings}`} component={settingsScreen} />
          <Route path={`/${serviceTerms}`} component={serviceTermsScreen} />
          <Route path={`/${privacyPolicy}`} component={privacyPolicyScreen} />
          <Route path={`/${editProfile}`} component={editProfileScreen} />
          <Route
            path={`/${eventDetail}/:sessionId`}
            component={eventDetailScreen}
          />
          <Route path={`/${eventList}`} component={eventListScreen} />
        </Switch>
      </div>
    );
  }
}

export default connect(
  state => _pick(state, ['AlertBox']),
  dispatch => bindActionCreators({ ...AlertBoxAction }, dispatch)
)(AuthApp);
