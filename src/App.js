import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './App.css';

import RoutePathConstants from './constants/RoutePathConstants';
import history from './history';
import userLoginScreen from './screens/LoginScreen';
import welcomingChatBot from './screens/WelcomingChatBot/WelcomingChatBot';
import SigninWithEmailScreen from './screens/SigninWithEmailScreen';
import LoadingOverlayContainer from './containers/LoadingOverlayContainer';
import AuthApp from './components/AuthApp';

const { loginScreen, welcomingScreen, magicLogin } = RoutePathConstants;

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
