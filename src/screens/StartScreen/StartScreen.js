import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isEmpty from 'lodash/isEmpty';
import _pick from 'lodash/pick';

import './style.css';

import RoutePathConstants from '../../constants/RoutePathConstants';
import history from '../../history';
import AppConfigAction from '../../actions/AppConfigAction';
import AuthDataStorage from '../../helpers/StorageHelpers/AuthDataStorage';
const {
  loginScreen,
  welcomingScreen,
  search,
  editProfile
} = RoutePathConstants;

class StartScreen extends Component {
  componentDidMount() {
    if (
      AuthDataStorage.isAuthDataAvailable(AuthDataStorage.getAppId()) &&
      AuthDataStorage.getUserAuthentication()
    ) {
      history.push(`/${search}`);
    }
  }
  handleStartUsingAppButtonClick = () => {
    const {
      AppConfig: {
        appConfig: { features }
      }
    } = this.props;

    _isEmpty(features['pseudo_prioritize_login']) &&
    features['pseudo_prioritize_login']
      ? history.push(`/${welcomingScreen}`)
      : history.push(`/${loginScreen}`);
  };

  handleStartUsingAppButtonToCreateProfileClick = () => {
    history.push(`/${editProfile}`);
  };

  handleMentorSigninButtonClick = () => {
    history.push(`/${loginScreen}`);
  };

  render() {
    const {
      AppConfig: {
        appConfig: { features, images, colors }
      }
    } = this.props;
    if (_isEmpty(features)) return null;
    let signinBackground = images['signin_background']['image_url'];

    return (
      <div
        className="login-container start"
        style={{
          backgroundImage: `url(${signinBackground}), linear-gradient(${
            colors['default_gradient_top']
          }, ${colors['default_gradient_bottom']})`
        }}
      >
        <div
          className="blur-background"
          style={{
            backgroundImage: `url(${signinBackground}), linear-gradient(${
              colors['default_gradient_top']
            }, ${colors['default_gradient_bottom']}`
          }}
        />
        <div className="login-content">
          <div className="login-sub-content">
            <div className="welcome-text">Welcome</div>
            <div className="start-view-content">
              <div className="welcoming-text">
                <p>
                  Welcome to network. By pressing Start, you accept the SERVICE
                  TERMS and PRIVACY POLICY.
                </p>
              </div>
              <button
                className="start-using-app-button"
                onClick={
                  _isEmpty(AuthDataStorage.getApiKey())
                    ? this.handleStartUsingAppButtonClick
                    : this.handleStartUsingAppButtonToCreateProfileClick
                }
              >
                <p style={{ color: colors['default_text_link'] }}>Start using app </p>
              </button>
              {features['pseudo_prioritize_login'] &&
                _isEmpty(AuthDataStorage.getApiKey()) && (
                  <div
                    className="mentor-sign-in-button"
                    onClick={this.handleMentorSigninButtonClick}
                  >
                    <p>Mentor sign in</p>
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
)(StartScreen);
