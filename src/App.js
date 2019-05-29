import React, { Component } from 'react';
import {Router, Route, Switch } from 'react-router-dom';

import SearchNew from './screens/SearchNew/SearchNew';
import ProfileDE from './screens/ProfileDE/ProfileDe';
import RoutePathConstants from './constants/RoutePathConstants';
import history from './history';


const { searchNew, profileDE } = RoutePathConstants;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <Switch>
            <Route path={`/${searchNew}`} component={SearchNew} exact/>
            <Route path={`/${profileDE}`} component={ProfileDE} exact/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
