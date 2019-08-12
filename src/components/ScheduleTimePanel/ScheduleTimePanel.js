import React, { Component } from 'react';

import './style.css';

class ScheduleTimePanel extends Component {
  render() {
    const { handleCreateScheduleTimePanel, timePanel } = this.props;

    return (
      <div className="time-panel" style={{ width: `${timePanel.length * 128}px`}}>
        <div className="time-panel-header">
          <div className="sub-time-panel-header" />
        </div>
        <div className="time-panel-content">
          {handleCreateScheduleTimePanel}
        </div>
      </div>
    );
  }
}

export default ScheduleTimePanel;
