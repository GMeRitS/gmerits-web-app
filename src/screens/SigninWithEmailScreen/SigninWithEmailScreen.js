import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import ScreenHeader from '../../components/ScreenHeader';
import AuthAction from '../../actions/AuthActions';
import InputEmailScreen from '../../components/SigninWithEmailContent/InputEmailScreen';

class SigninWithEmailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      shouldStartButtonVisible: false
    };
  }

  handleInputEmailOnChange = e => {
    this.setState({ email: e.target.value });
    if (_.includes(e.target.value, 'com')) {
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
  };

  render() {
    const { email, shouldStartButtonVisible } = this.state;

    return (
      <div className="signin-with-email-container">
        <div className="blur-background" />
        <ScreenHeader
          headerBackgroundColor="purple-gradient"
          buttonBackVisible={true}
        />
        <div className="signin-with-email-content">
          <div className="signin-with-email-sub-content">
            <InputEmailScreen
              email={email}
              shouldStartButtonVisible={shouldStartButtonVisible}
              onInputEmailChange={this.handleInputEmailOnChange}
              onClearAllButtonClick={this.handleClearAllInputIconClick}
              onStartButtonClick={this.handleStartButtonClick}
            />
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
