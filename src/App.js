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

const {
  searchNew,
  organization,
  favourite,
  settings,
  serviceTerms,
  editProfile,
  eventDetail,
  eventList,
  privacyPolicy
} = RoutePathConstants;

class App extends Component {
  componentDidMount() {
    const {
      location: { pathname }
    } = history;

    if (pathname === '/') {
      history.push(`/${searchNew}`);
    }
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <TransitionGroup className="transition-group">
            <CSSTransition
              // key={location.key}
              timeout={450}
              classNames="fade"
            >
              <Switch>
                <Route exact path={`/${searchNew}`} component={SearchScreen} />
                <Route
                  exact
                  path={`/${searchNew}/:userId`}
                  component={UserProfileDetail}
                />
                <Route
                  exact
                  path={`/${organization}/:organizationId`}
                  component={organizationScreen}
                />
                <Route
                  exact
                  path={`/${favourite}`}
                  component={favouriteScreen}
                />
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
                <Route
                  exact
                  path={`/${editProfile}`}
                  component={editProfileScreen}
                />
                <Route
                  exact
                  path={`/${eventDetail}`}
                  component={eventDetailScreen}
                />
                <Route path={`/${eventList}`} component={eventListScreen} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </Router>
    );
  }
}

export default App;
