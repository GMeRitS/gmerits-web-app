import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './style.css';

import ScreenHeader from '../../components/ScreenHeader';
import AuthAction from '../../actions/AuthActions';
import InputEmailScreen from '../../components/SigninContent/InputEmailScreen';
import OpenMailboxScreen from '../../components/SigninContent/OpenMailboxScreen';
import AuthDataStorage from '../../helpers/StorageHelpers/AuthDataStorage';
import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import AppConfigAction from '../../actions/AppConfigAction';

const { search } = RoutePathConstants;

class SigninWithEmailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      shouldStartButtonVisible: false
    };
  }

  componentDidMount() {
    if (AuthDataStorage.getApiKey()) {
      history.push(`/${search}`);
    }
  }

  handleInputEmailOnChange = e => {
    this.setState({ email: e.target.value });
    if (
      e.target.value.match('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$') != null
    ) {
      this.setState({ shouldStartButtonVisible: true });
    } else {
      this.setState({ shouldStartButtonVisible: false });
    }
  };

  handleClearAllInputIconClick = () => {
    this.setState({ email: '', shouldStartButtonVisible: false });
  };

  handleStartButtonClick = () => {
    const { email } = this.state;
    this.props.signin(email);
    this.setState({ view: 'openMailboxScreen' });
  };

  render() {
    const { email, shouldStartButtonVisible, view } = this.state;
    const {
      AppConfig: {
        appConfig: { images, colors }
      }
    } = this.props;

    if (_.isEmpty(images) && _.isEmpty(colors)) return null;
    let signinBackground = images['signin_background']['image_url'];

    return (
      <div
        className="signin-with-email-container"
        style={{
          backgroundImage: `url(${signinBackground}), linear-gradient(${
            colors['default_gradient_top']
          }, ${colors['default_gradient_bottom']}`
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
        <ScreenHeader
          defaultGradientTop="rgb(22, 10, 32)"
          buttonBackVisible={true}
        />
        <div className="signin-with-email-content">
          <div className="signin-with-email-sub-content">
            {view !== 'openMailboxScreen' ? (
              <InputEmailScreen
                email={email}
                shouldStartButtonVisible={shouldStartButtonVisible}
                onInputEmailChange={this.handleInputEmailOnChange}
                onClearAllButtonClick={this.handleClearAllInputIconClick}
                onStartButtonClick={this.handleStartButtonClick}
                startButtonBackgroundColor={colors['default_background']}
              />
            ) : (
              <OpenMailboxScreen emailInput={email} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['AppConfig', 'Auth']),
  dispatch =>
    bindActionCreators({ ...AuthAction, ...AppConfigAction }, dispatch)
)(SigninWithEmailScreen);
