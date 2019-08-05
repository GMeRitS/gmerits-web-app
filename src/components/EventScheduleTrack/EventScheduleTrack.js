import React, { Component } from 'react';

import './style.css';
import _ from 'lodash';

import SessionItem from '../SessionItem';
import { getDate } from '../../helpers/getDateHelper';

class EventScheduleTrack extends Component {
  handleCreateSessionList = trackItem => {
    const { scheduleDetail, sessionList, onSessionItemClick } = this.props;

    console.log(scheduleDetail);
    let sessionsList = [],
      hour = new Date(scheduleDetail['start_time']).getHours(),
      minute = new Date(scheduleDetail['start_time']).getMinutes(),
      startTime = hour + (minute === 0 ? 0 : minute < 30 ? 0 : 0.5),
      track = trackItem,
      sessions = sessionList;

    let startHour, startMinute, sessionStartTime, sessionEndHour, sessionEndMinute, sessionEndTime;
    for(let i = 0; i < sessions.length; i++ ) {
      startHour = new Date(sessions[i]['start_time']).getHours();
      startMinute = new Date(sessions[i]['start_time']).getMinutes();
      sessionStartTime = startHour + (startMinute === 0 ? 0 : startMinute / 60);
      sessionEndHour = new Date(sessions[i]['end_time']).getHours();
      sessionEndMinute = new Date(sessions[i]['end_time']).getMinutes();
      sessionEndTime = sessionEndHour + (sessionEndMinute === 0 ? 0 : sessionEndMinute / 60);

      if (startHour === sessionEndHour) {
        sessionStartTime = startHour + (startMinute === 0 ? 0 : startMinute / 60);
        sessionEndTime = sessionEndHour + (sessionEndMinute === 0 ? 0 : sessionEndMinute / 60)
      }
      let sessionWidth = ((sessionEndTime - sessionStartTime) * 2) * 126;

      let far;
      if (minute <= 30) {
        far = ((sessionStartTime - startTime) * 2) * 128 + 73;
        if (minute === 30)
          far = ((sessionStartTime - startTime) * 2) * 128 + 73 + 110
      }
      else {
        if (startMinute <= 30)
          far = ((sessionStartTime - startTime) * 2) * 128 + 73;
        else
          far = ((sessionStartTime - startTime) * 2) * 128 + 73
      }

      if (sessionStartTime === startTime) {
        if (startMinute <= 30 && minute < 30) {
          far = 73;
        }
        else if (minute > 30) {
          far = 73;
        }
        else {
          far = 73 + 110;
        }
      }

      sessionsList.push(
        <SessionItem
          key={i}
          sessionWidth={sessionWidth}
          sessionPosition={far}
          sessionTheme={sessions[i]['theme_color']}
          id={sessions[i].uuid}
          onClick={onSessionItemClick}
          sessionName={sessions[i].title}
          sessionDescription={sessions[i]['short_description']}
        />
      )
    }

    return sessionsList
  };

  render() {
    const {
      trackTitle,
      onScroll
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
            {this.handleCreateSessionList()}
          </div>
        </div>
      </div>
    );
  }
}

export default EventScheduleTrack;
