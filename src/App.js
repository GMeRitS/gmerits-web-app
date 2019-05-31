import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import UserSearch from './screens/UserSearch/UserSearch';
import UserProfileDetail from './screens/UserProfileDetail/UserProfileDetail';
import RoutePathConstants from './constants/RoutePathConstants';
import history from './history';

const { userSearch, profileDetail } = RoutePathConstants;

class App extends Component {
  componentWillMount() {
    history.push(`/${userSearch}`);
  }

  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path={`/${userSearch}`} exact component={UserSearch} />
            <Route
              path={`/${profileDetail}`}
              exact
              component={UserProfileDetail}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
