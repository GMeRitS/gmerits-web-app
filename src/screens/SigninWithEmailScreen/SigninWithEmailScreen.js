import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './style.css';

import ScreenHeader from '../../components/ScreenHeader';
import AuthAction from '../../actions/AuthActions';
import InputEmailScreen from '../../components/SigninWithEmailContent/InputEmailScreen';
import OpenMailboxScreen from '../../components/SigninWithEmailContent/OpenMailboxScreen';
import LocalStorage from '../../lib/LocalStorage';
import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';

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
    if (LocalStorage.get('apikey')) {
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

    return (
      <div className="signin-with-email-container">
        <div className="blur-background" />
        <ScreenHeader
          defaultGradientTop="rgb(22, 10, 32)"
          defaultGradientBottom="rgb(35, 24, 45)"
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
  state => _.pick(state, ['Auth']),
  dispatch => bindActionCreators({ ...AuthAction }, dispatch)
)(SigninWithEmailScreen);
