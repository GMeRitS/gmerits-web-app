import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import uuidv4 from 'uuid';

import './style.css';

import AuthAction from '../../actions/AuthActions';
import AuthDataStorage from '../../helpers/StorageHelpers/AuthDataStorage';

class TriggerNextStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      trigger: false
    };
  }

  triggerNext = () => {
    const { name } = this.state;
    const pseudoUserIdentifier =
      AuthDataStorage.getDeviceId() ||
      `com.mesensei.${AuthDataStorage.getAppId()}.web.${uuidv4(name.value)}`;
    const { username } = this.props;
    const loginData = {
      pseudo_user_identifier: pseudoUserIdentifier,
      username: username
    };

    this.props.validateLoginData(loginData);
  };

  render() {
    const { startSearchingButtonStyle, startSearchingButtonColor } = this.props;

    return (
      <div
        className="start-searching-button-container"
        style={startSearchingButtonStyle}
      >
        <div
          className="start-searching-button"
          onClick={this.triggerNext}
          style={{ backgroundColor: startSearchingButtonColor }}
        >
          <p>OK, START SEARCHING</p>
        </div>
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['Auth']),
  dispatch => bindActionCreators({ ...AuthAction }, dispatch)
)(TriggerNextStep);
