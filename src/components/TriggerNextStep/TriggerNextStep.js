import React, { Component } from 'react';

import './style.css';

import PropTypes from 'prop-types';

class TriggerNextStep extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trigger: false
    }
  }

  triggerNext = () => {
    this.setState({ trigger: true }, () => {
      this.props.triggerNextStep();
    });
  };

  render() {
    const { trigger } = this.state;

    return (
      !trigger &&
      <div
        className="start-searching-button"
        onClick={this.triggerNext}
      >
        OK, START SEARCHING
      </div>
    );
  }
}

TriggerNextStep.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

TriggerNextStep.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};



export default TriggerNextStep;
