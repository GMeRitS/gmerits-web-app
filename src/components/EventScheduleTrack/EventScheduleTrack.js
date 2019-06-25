import React, { Component } from 'react';

import './style.css';

import SessionItem from '../SessionItem/SessionItem';

class EventScheduleTrack extends Component {
  render() {
    const { trackTitle, onSessionItemClick, onScroll } = this.props;

    return (
      <div className="schedule-track-container">
        <div className="track-title-container">
          <div className="track-title">{trackTitle}</div>
        </div>
        <div className="track-session-content" onScroll={onScroll}>
          <div className="sub-track-session-content">
            <SessionItem
              sessionTheme='#a0ded7'
              onClick={onSessionItemClick}
            />
            <SessionItem
              sessionTheme='#f3b07e'
              onClick={onSessionItemClick}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default EventScheduleTrack;