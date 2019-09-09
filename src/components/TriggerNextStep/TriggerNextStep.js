import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import uuidv4 from 'uuid';

import './style.css';

import AuthAction from '../../actions/AuthActions';
import LocalStorage from '../../lib/LocalStorage';

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
    const device_id = LocalStorage.get('deviceId');
    const username = name.value;

    if (!device_id) {
      let newDeviceId = `com.mesensei.marsu.web.${uuidv4(name.value)}`;
      LocalStorage.set('deviceId', newDeviceId);
      this.props.signinAnonymous(newDeviceId, username);
    } else {
      this.props.signinAnonymous(device_id, username);
    }
  };

  render() {
    const { startSearchingButtonStyle } = this.props;

    return (
      <div
        className="start-searching-button-container"
        style={startSearchingButtonStyle}
      >
        <div className="start-searching-button" onClick={this.triggerNext}>
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
