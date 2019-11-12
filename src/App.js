import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from "lodash";

import './App.css';

import RoutePathConstants from './constants/RoutePathConstants';
import history from './history';
import userLoginScreen from './screens/LoginScreen';
import welcomingChatBot from './screens/WelcomingChatBot/WelcomingChatBot';
import SigninWithEmailScreen from './screens/SigninWithEmailScreen';
import LoadingOverlayContainer from './containers/LoadingOverlayContainer';
import AuthApp from './components/AuthApp';
import LocalStorage from './lib/LocalStorage';
import AppConfigAction from './actions/AppConfigAction';

const {
  loginScreen,
  welcomingScreen,
  magicLogin,
  searchNew
} = RoutePathConstants;

class App extends Component {
  componentDidMount() {
    const {
      location: { pathname }
    } = history;

    const params = new URLSearchParams(history.location.search);
    const appIdentifier = params.get('appIdentifier');
    console.log(appIdentifier);
    this.props.getAppConfig('marsu');
    if (pathname === '/') {
      if (LocalStorage.get('apikey')) {
        history.push(`/${searchNew}`);
      } else {
        history.push(`/${loginScreen}`);
      }
    }
  }

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <LoadingOverlayContainer />
          <TransitionGroup className="transition-group">
            <CSSTransition
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

export default connect(
  state => _.pick(state, ['AppConfig']),
  dispatch => bindActionCreators({ ...AppConfigAction }, dispatch)
)(App);
