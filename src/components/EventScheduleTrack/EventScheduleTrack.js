import React, { Component } from 'react';

import './style.css';

import SessionItem from '../SessionItem/SessionItem';

class EventScheduleTrack extends Component {
  render() {
    return (
      <div className="schedule-track-container">
        <div className="track-title">Main Stage</div>
        <div className="track-session-content">
          <div className="sub-track-session-content">
            <SessionItem/>
            <SessionItem/>
          </div>
        </div>
      </div>
    )
  }
}

export default EventScheduleTrack;