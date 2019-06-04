import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import UserSearch from './screens/SearchScreen/SearchScreen';
import RoutePathConstants from './constants/RoutePathConstants';
import history from './history';
import UserProfileDetail from './screens/UserProfileDetail/UserProfileDetail';

const { userSearch } = RoutePathConstants;

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
            </Switch>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
