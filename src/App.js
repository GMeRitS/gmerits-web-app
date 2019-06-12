import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './App.css';

import RoutePathConstants from './constants/RoutePathConstants';
import history from './history';
import UserSearch from './screens/SearchScreen/SearchScreen';
import UserProfileDetail from './screens/UserProfileDetail/UserProfileDetail';
import organizationScreen from './screens/OrganizationScreen/OrganizationScreen';
import favouriteScreen from './screens/FavouriteScreen/FavouriteScreen';
import settingsScreen from './screens/SettingsScreen/SettingsScreen';
import editProfileScreen from './screens/EditProfile/EditProfile';
import eventDetailScreen from './screens/EventDetailSCreen/EventDetailScreen';
import eventListScreen from './screens/EventsListScreen/EventsListScreen';

const {
  searchNew,
  organization,
  favourite,
  settings,
  editProfile,
  eventDetail,
  eventList
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
    const {
      location: { pathname }
    } = history;

    return (
      //<div className="App">
        <Router history={history}>
          <div className="App">
            <Route render={({location})=> (
            <TransitionGroup className="transition-group">
              <CSSTransition
                key={location.key}
                timeout={450}
                classNames="fade"
              >
                <Switch>
                  <Route exact path={`/${searchNew}`} component={UserSearch} />
                  <Switch>
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
                    <Route exact path={`/${favourite}`} component={favouriteScreen} />
                    <Route exact path={`/${settings}`} component={settingsScreen} />
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
                    <Route
                      exact
                      path={`/${eventList}`}
                      component={eventListScreen}
                    />
                  </Switch>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
            )}/>
          </div>
        </Router>
      //</div>
    );
  }
}

export default App;
