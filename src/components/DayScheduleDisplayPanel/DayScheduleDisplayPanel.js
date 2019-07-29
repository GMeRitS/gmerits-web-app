import React, { Component } from 'react';
import { Tabs, TabLink } from 'react-tabs-redux';
import _ from 'lodash';

import './style.css';

class DayScheduleDisplayPanel extends Component {
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
          {scheduleDetail.days &&
            scheduleDetail.days.map((day, id) => (
              <TabLink key={id} to={`tab${id}`} className="tab-link">
                <p>{day['day_name']}</p>
              </TabLink>
            ))}
        </Tabs>
      </div>
    );
  }
}

export default DayScheduleDisplayPanel;
