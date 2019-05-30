import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import UserSearch from './screens/UserSearch/UserSearch';
import UserProfileDetail from './screens/UserProfileDetail/UserProfileDetail';
import RoutePathConstants from './constants/RoutePathConstants';
import history from './history';

const { searchNew, profileDetail } = RoutePathConstants;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path={`/${searchNew}`} component={UserSearch} exact />
            <Route
              path={`/${profileDetail}`}
              component={UserProfileDetail}
              exact
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
