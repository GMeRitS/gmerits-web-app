import React from 'react';

import './style.css';

const ScheduleTimePanel = () => (
    <div className="event-time-container">
      <div className="pre-time-schedule-div"/>
      <div className="time-list-container">
        <div className="sub-time-list-container">
          <span>08:00</span>
          <span>08:15</span>
          <span>08:30</span>
          <span>09:00</span>
          <span>09:15</span>
          <span>09:30</span>
        </div>
      </div>
    </div>
);

export default ScheduleTimePanel;