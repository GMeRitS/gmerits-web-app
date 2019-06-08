import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import './App.css';

import RoutePathConstants from './constants/RoutePathConstants';
import history from './history';
import UserSearch from './screens/SearchScreen/SearchScreen';
import UserProfileDetail from './screens/UserProfileDetail/UserProfileDetail';
import organizationScreen from './screens/OrganizationScreen/OrganizationScreen';
import favouriteScreen from './screens/FavouriteScreen/FavouriteScreen';

const { userSearch, organization, favourite } = RoutePathConstants;

class App extends Component {
  componentDidMount() {
    const {
      location: { pathname }
    } = history;

    if (pathname === '/') {
      history.push(`/${userSearch}`);
    }
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route exact path={`/${userSearch}`} component={UserSearch} />
            <Switch>
              <Route
                exact
                path={`/${userSearch}/:userId`}
                component={UserProfileDetail}
              />
              <Route
                exact
                path={`/${organization}/:organizationId`}
                component={organizationScreen}
              />
              <Route exact path={`/${favourite}`} component={favouriteScreen} />
            </Switch>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
