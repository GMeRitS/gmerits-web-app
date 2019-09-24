import React, { Component } from 'react';

import './style.css';

import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import LocalStorage from '../../lib/LocalStorage';

const { welcomingScreen, magicLogin, searchNew } = RoutePathConstants;

class LoginScreen extends Component {
  componentDidMount() {
    if(LocalStorage.get('apikey')) {
      history.push(`/${searchNew}`);
    }
  }

  handleSigninAsAnonymousUser = () => {
    history.push(`/${welcomingScreen}`);
  };

  handleSigninWithEmailButtonClick = () => {
    history.push(`/${magicLogin}`);
  };

  render() {
    return (
      <div className="login-container">
        <div className="blur-background" />
        <div className="login-content">
          <div className="login-sub-content">
            <div className="welcome-text">Welcome</div>
            <div
              className="signin-with-email-option"
              onClick={this.handleSigninWithEmailButtonClick}
            >
              <p>SIGN IN WITH EMAIL</p>
            </div>
            <div
              className="signin-as-anonymous"
              onClick={this.handleSigninAsAnonymousUser}
            >
              Skip this
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginScreen;
