import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';

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
import queryString from 'query-string';
import AuthDataStorage from '../../helpers/StorageHelpers/AuthDataStorage';

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
  loginScreen
} = RoutePathConstants;

class AuthApp extends Component {
  componentDidMount() {
    const {
      location: { pathname }
    } = this.props;
    const { loginToken } = queryString.parse(history.location.search);
    const isMagicLogin =
      pathname === `/${editProfile}` && !_isEmpty(loginToken);

    if (!AuthDataStorage.getApiKey() && pathname !== '/' && !isMagicLogin) {
      history.push(`/${loginScreen}`);
    }
  }

  render() {
    return (
      <div className="authed-app">
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

export default AuthApp;
