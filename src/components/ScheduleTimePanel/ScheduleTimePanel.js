import React, { Component } from 'react';

import './style.css';

import { getDate } from '../../helpers/getDateHelper';

class ScheduleTimePanel extends Component {
  handleCreateScheduleTimePanel = () => {
    const { scheduleTime } = this.props;
    let scheduleStartDate = new Date(getDate(scheduleTime['start_time']));
    let scheduleEndDate = new Date(getDate(scheduleTime['end_time']));

    let timePanel = [],
      startHour = scheduleStartDate.getHours(),
      startMinute = scheduleStartDate.getMinutes(),
      endHour = scheduleEndDate.getHours();

    for (let i = startHour; i <= endHour; i++) {
      if (startMinute < 30) {
        timePanel.push(
          <div key={i + ':00'} className="time">
            {i}:00
          </div>
        );
        // timePanel.push(<div key={i + ":15"} className="time">{i}:15</div>);
        timePanel.push(
          <div key={i + ':30'} className="time">
            {i}:30
          </div>
        );
        // timePanel.push(<div key={i + ":45"} className="time">{i}:45</div>)
      } else {
        timePanel.push(
          <div key={i + ':30'} className="time">
            {i}:30
          </div>
        );
        timePanel.push(
          <div key={i + ':00'} className="time">
            {i + 1}:00
          </div>
        );
      }
    }
    return timePanel;
  };

  render() {
    return (
      <div className="time-panel">
        <div className="time-panel-header">
          <div className="sub-time-panel-header" />
        </div>
        <div className="time-panel-content">
          {this.handleCreateScheduleTimePanel()}
        </div>
      </div>
    );
  }
}

export default ScheduleTimePanel;
