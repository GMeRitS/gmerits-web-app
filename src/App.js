import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import UserSearch from './screens/UserSearch/UserSearch';
import RoutePathConstants from './constants/RoutePathConstants';
import history from './history';
import UserProfileDetail from './screens/UserProfileDetail/UserProfileDetail';

const { userSearch } = RoutePathConstants;

class App extends Component {
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
            </Switch>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
