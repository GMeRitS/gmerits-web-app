import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './App.css';

import RoutePathConstants from './constants/RoutePathConstants';
import history from './history';
import SearchScreen from './screens/SearchScreen';
import UserProfileDetail from './screens/UserProfileDetail';
import organizationScreen from './screens/OrganizationScreen';
import favouriteScreen from './screens/FavouriteScreen';
import settingsScreen from './screens/SettingsScreen';
import editProfileScreen from './screens/EditProfile';
import eventDetailScreen from './screens/SessionDetailScreen';
import eventListScreen from './screens/EventsListScreen';
import serviceTermsScreen from './screens/ServiceTermsScreen';
import privacyPolicyScreen from './screens/PrivacyPolicyScreen';
import userLoginScreen from './screens/LoginScreen';
import EventTicketScreen from './screens/EventTicketScreen';
import SameTopicUserListScreen from './screens/SameTopicUserListScreen';
import welcomingChatBot from './screens/WelcomingChatBot/WelcomingChatBot';
import SigninWithEmailScreen from './screens/SigninWithEmailScreen';
import LoadingOverlayContainer from './containers/LoadingOverlayContainer';
import AuthApp from './components/AuthApp';

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
  loginScreen,
  welcomingScreen,
  myQREventTicket,
  sameTopicUserList,
  magicLogin
} = RoutePathConstants;

class App extends Component {
  componentDidMount() {
    const {
      location: { pathname }
    } = history;

    if (pathname === '/') {
      history.push(`/${loginScreen}`);
    }
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <LoadingOverlayContainer />
          <TransitionGroup className="transition-group">
            <CSSTransition
              // key={location.key}
              timeout={450}
              classNames="fade"
            >
              <Switch>
                <Route
                  exact
                  path={`/${loginScreen}`}
                  component={userLoginScreen}
                />
                <Route
                  exact
                  path={`/${welcomingScreen}`}
                  component={welcomingChatBot}
                />
                <Route
                  exact
                  path={`/${magicLogin}`}
                  component={SigninWithEmailScreen}
                />
                <AuthApp />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </Router>
    );
  }
}

export default App;
