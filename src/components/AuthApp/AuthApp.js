import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import _isEmpty from 'lodash/isEmpty';

import './style.css';

import LocalStorage from '../../lib/LocalStorage';
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

const {
  searchNew,
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

    if (!LocalStorage.get('apikey') && pathname !== '/' && !isMagicLogin) {
      history.push(`/${loginScreen}`);
    } else {
      history.push(`/${searchNew}`);
    }
  }

  render() {
    return (
      <div className="authed-app">
        <Switch>
          <Route exact path={`/${searchNew}`} component={SearchScreen} />
          <Route
            exact
            path={`/${sameTopicUserListScreen}/:topicId`}
            component={SameTopicUserListScreen}
          />
          <Route
            exact
            path={`/${searchNew}/:userId`}
            component={UserProfileDetail}
          />
          <Route
            exact
            path={`/${myQREventTicket}`}
            component={EventTicketScreen}
          />
          <Route
            exact
            path={`/${organization}/:organizationId`}
            component={organizationScreen}
          />
          <Route exact path={`/${favourite}`} component={favouriteScreen} />
          <Route exact path={`/${settings}`} component={settingsScreen} />
          <Route
            exact
            path={`/${serviceTerms}`}
            component={serviceTermsScreen}
          />
          <Route
            exact
            path={`/${privacyPolicy}`}
            component={privacyPolicyScreen}
          />
          <Route exact path={`/${editProfile}`} component={editProfileScreen} />
          <Route
            exact
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
