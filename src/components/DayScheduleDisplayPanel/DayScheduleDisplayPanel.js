import React, { Component } from 'react';
import { Tabs, TabLink, TabContent } from 'react-tabs-redux';
import _ from 'lodash';

import './style.css';
import EventScheduleTrack from '../EventScheduleTrack';
import ScheduleTimePanel from "../ScheduleTimePanel";
import history from "../../history";

import RoutePathConstants from '../../constants/RoutePathConstants';

const { eventDetail } = RoutePathConstants;

class DayScheduleDisplayPanel extends Component {
  handleSessionItemClick = id => {
    history.push(`/${eventDetail}/${id}`);
  };

  render() {
    const { scheduleDetail } = this.props;

    if (_.isEmpty(scheduleDetail)) return null;

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
            ))
          }
          </div>
          {scheduleDetail.days &&
            scheduleDetail.days.map((day, id) => (
              <TabContent key={id}  for={`tab${id}`}>
                <div className="schedule">
                  <ScheduleTimePanel />
                  <div className="tracks">
                    {
                      !_.isEmpty(day.tracks) && day.tracks.map((track, id) => (
                       <EventScheduleTrack
                         key={id}
                         onSessionItemClick={this.handleSessionItemClick}
                         sessionList={track.sessions}
                         trackTitle={track.title}
                         sessionPosition="100"
                       />
                     ))
                    }
                  </div>
                </div>
              </TabContent>
            ))
          }
        </Tabs>
      </div>
    );
  }
}

export default DayScheduleDisplayPanel;
