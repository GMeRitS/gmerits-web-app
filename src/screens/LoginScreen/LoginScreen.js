import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isEmpty from 'lodash/isEmpty';
import _pick from 'lodash/pick';

import './style.css';

import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import ScreenHeader from '../../components/ScreenHeader';
import AppConfigAction from '../../actions/AppConfigAction';

const { welcomingScreen, magicLogin } = RoutePathConstants;

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'startViewContent'
    };
  }

  handleSigninAsAnonymousUser = () => {
    history.push(`/${welcomingScreen}`);
  };

  handleSigninWithEmailButtonClick = () => {
    history.push(`/${magicLogin}`);
  };

  render() {
    const {
      AppConfig: {
        appConfig: { features }
      }
    } = this.props;
    if (_isEmpty(features)) return null;

    return (
      <div className="login-container login">
        <ScreenHeader buttonBackVisible={true} />
        <div className="blur-background" />
        <div className="login-content">
          <div className="login-sub-content">
            <div className="welcome-text">Welcome</div>
            <div className="signin-view-content">
              <div
                className="signin-with-email-option"
                onClick={this.handleSigninWithEmailButtonClick}
              >
                <p>SIGN IN WITH EMAIL</p>
              </div>
              {features['prioritize_pseudo'] && features['pseudo_enabled'] && (
                <div
                  className="signin-as-anonymous"
                  onClick={this.handleSigninAsAnonymousUser}
                >
                  Skip this
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => _pick(state, ['AppConfig']),
  dispatch => bindActionCreators({ ...AppConfigAction }, dispatch)
)(LoginScreen);
