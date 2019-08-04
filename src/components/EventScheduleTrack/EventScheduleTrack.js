import React, { Component } from 'react';

import './style.css';
import _ from 'lodash';

import SessionItem from '../SessionItem';

class EventScheduleTrack extends Component {
  render() {
    const {
      trackTitle,
      onSessionItemClick,
      onScroll,
      sessionPosition,
      sessionList
    } = this.props;

    return (
      <div className="schedule-track-container">
        <div className="track-title-container">
          <div className="track-title-sub-container">
            <div className="track-title">{trackTitle}</div>
          </div>
        </div>
        <div className="track-session-content" onScroll={onScroll}>
          <div className="sub-track-session-content">
            {!_.isEmpty(sessionList) &&
              sessionList.map((session, id) => (
                <SessionItem
                  key={id}
                  sessionTheme={session['theme_color']}
                  id={session.uuid}
                  onClick={onSessionItemClick}
                  sessionPosition={sessionPosition}
                  sessionName={session.title}
                  sessionDescription={session['short_description']}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default EventScheduleTrack;
