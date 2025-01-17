import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _pick from 'lodash/pick';
import _isEmpty from 'lodash/isEmpty';

import './App.css';

import RoutePathConstants from './constants/RoutePathConstants';
import history from './history';
import startView from './screens/StartScreen';
import userLoginScreen from './screens/LoginScreen';
import welcomingChatBot from './screens/WelcomingChatBot/WelcomingChatBot';
import SigninWithEmailScreen from './screens/SigninWithEmailScreen';
import LoadingOverlayContainer from './containers/LoadingOverlayContainer';
import AuthApp from './components/AuthApp';
import AppConfigAction from './actions/AppConfigAction';
import AuthActions from './actions/AuthActions';
import AuthDataStorage from './helpers/StorageHelpers/AuthDataStorage';
import AlertBoxAction from './actions/AlertBoxAction';

const {
  startScreen,
  loginScreen,
  welcomingScreen,
  magicLogin,
  search
} = RoutePathConstants;

class App extends Component {
  componentDidMount() {
    const {
      location: { pathname }
    } = history;
    const {
      AppConfig: { appConfig }
    } = this.props;
    const appId = AuthDataStorage.getAppId();

    if (_isEmpty(appConfig) && appId) {
      this.props.getAppConfig(appId);
    }

    if (pathname === '/') {
      if (appId) {
        this.handleInitialRedirection(AuthDataStorage.getAppId());
      } else {
        // Redirect to instruction page to indicate to user that they need a valid organization id
        history.push('https://gmerits.eu/alpha');
      }
    }
  }

  guestRoutes = () => {
    return (
      <Switch>
        <Route path={`/${startScreen}`} component={startView} />
        <Route path={`/${loginScreen}`} component={userLoginScreen} />
        <Route path={`/${welcomingScreen}`} component={welcomingChatBot} />
        <Route path={`/${magicLogin}`} component={SigninWithEmailScreen} />
      </Switch>
    );
  };

  handleInitialRedirection = appId => {
    const {
      AppConfig: { appConfig }
    } = this.props;
    // Store new app id and get app config
    if (
      !AuthDataStorage.getAppId() ||
      AuthDataStorage.hasAppIdChanged(appId) ||
      _isEmpty(appConfig)
    ) {
      AuthDataStorage.storeAppId(appId);
      this.props.getAppConfig(appId);
    }

    // Redirect base on auth data
    if (
      AuthDataStorage.isAuthDataAvailable(appId) &&
      AuthDataStorage.getUserAuthentication()
    ) {
      history.push(`/${search}`);
    } else {
      history.push(`/${startScreen}`);
    }
  };

  handleValidateLoginToken = appId => {
    const urlParams = new URLSearchParams(window.location.search);
    const logintoken = urlParams.get('logintoken');
    const invitetoken = urlParams.get('invitetoken');

    const loginData = { logintoken: logintoken, invitetoken: invitetoken };
    if (loginData.logintoken !== null || loginData.invitetoken !== null) {
      this.props.validateLoginData(loginData, appId);
    }
  };

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <LoadingOverlayContainer />
          <TransitionGroup className="transition-group">
            <CSSTransition timeout={450} classNames="fade">
              <Switch>
                <Route path="/guest">{this.guestRoutes}</Route>
                <Route path="/authed">{props => <AuthApp {...props} />}</Route>
                <Route
                  path="/:appId"
                  component={props => {
                    const {
                      match: {
                        params: { appId }
                      }
                    } = props;

                    this.handleValidateLoginToken(appId);
                    this.handleInitialRedirection(appId);
                    return <div />;
                  }}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => _pick(state, ['AppConfig', 'Auth', 'AlertBox']),
  dispatch =>
    bindActionCreators(
      { ...AppConfigAction, ...AuthActions, ...AlertBoxAction },
      dispatch
    )
)(App);
