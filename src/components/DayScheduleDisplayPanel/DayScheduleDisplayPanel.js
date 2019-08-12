import React, { Component } from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import _ from 'lodash';

import './style.css';
import EventScheduleTrack from '../EventScheduleTrack';
import ScheduleTimePanel from '../ScheduleTimePanel';
import history from '../../history';

import RoutePathConstants from '../../constants/RoutePathConstants';
import { getDate } from '../../helpers/getDateHelper';

const { eventDetail } = RoutePathConstants;

let timePanel;
class DayScheduleDisplayPanel extends Component {
  handleCreateScheduleTimePanel = () => {
    const { scheduleDetail } = this.props;
    let scheduleStartDate = new Date(getDate(scheduleDetail['start_time']));
    let scheduleEndDate = new Date(getDate(scheduleDetail['end_time']));

    timePanel = [];
    let startHour = scheduleStartDate.getHours(),
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

  handleSessionItemClick = id => {
    history.push(`/${eventDetail}/${id}`);
  };

  render() {
    const { scheduleDetail } = this.props;

    if (_.isEmpty(scheduleDetail)) return null;
    this.handleCreateScheduleTimePanel();
    let trackWidth = timePanel.length * 128;
    return (
      <div className="day-schedule-container">
        <Tabs
          className="day-schedule-sub-container"
          activeLinkStyle={{
            borderBottom: '5px solid #333',
            transition: '.3s ease-in-out'
          }}
        >
          <div className="day-tab">
            {scheduleDetail.days &&
              scheduleDetail.days.map((day, id) => (
                <TabLink key={id} to={`tab${id}`} className="tab-link">
                  <p>{day['day_name']}</p>
                </TabLink>
              ))}
          </div>
          {scheduleDetail.days &&
            scheduleDetail.days.map((day, id) => (
              <TabContent key={id} for={`tab${id}`}>
                <div className="schedule">
                  <ScheduleTimePanel
                    scheduleTime={scheduleDetail}
                    handleCreateScheduleTimePanel={this.handleCreateScheduleTimePanel()}
                    timePanel={timePanel}
                  />
                  <div className="tracks">
                    {!_.isEmpty(day.tracks) &&
                      day.tracks.map((track, id) => (
                        <EventScheduleTrack
                          key={id}
                          scheduleDetail={scheduleDetail}
                          onSessionItemClick={this.handleSessionItemClick}
                          sessionList={track.sessions}
                          trackTitle={track.title}
                          track={track}
                          trackWidth={trackWidth}
                        />
                      ))}
                  </div>
                </div>
              </TabContent>
            ))}
        </Tabs>
      </div>
    );
  }
}

export default DayScheduleDisplayPanel;
