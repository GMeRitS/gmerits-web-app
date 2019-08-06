import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import uuidv4 from 'uuid';

import './style.css';

import PropTypes from 'prop-types';
import AuthAction from '../../actions/AuthActions';

class TriggerNextStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      trigger: false
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name } = steps;

    this.setState({ name });
  }

  triggerNext = () => {
    const { name } = this.state;
    const device_id = `com.mesensei.marsu.web.${uuidv4(name.value)}`;
    const username = name.value;

    this.props.signinAnonymous(device_id, username);
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  };

  render() {
    const { trigger } = this.state;

    return (
      !trigger && (
        <div className="start-searching-button" onClick={this.triggerNext}>
          OK, START SEARCHING
        </div>
      )
    );
  }
}

TriggerNextStep.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func
};

TriggerNextStep.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined
};

export default connect(
  state => _.pick(state, ['Auth']),
  dispatch => bindActionCreators({ ...AuthAction }, dispatch)
)(TriggerNextStep);
