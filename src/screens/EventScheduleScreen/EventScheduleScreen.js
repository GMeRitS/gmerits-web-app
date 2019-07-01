import React, { Component } from 'react';

import './style.css';
import history from '../../history';

import IsMobileSize from '../../helpers/MobileDetect';
import events from '../../MockData/Events';
import EventScheduleTrack from '../../components/EventScheduleTrack/EventScheduleTrack';
//import ScheduleTimePanel from '../../components/ScheduleTimePanel/ScheduleTimePanel';
import DayPanel from '../../components/DayScheduleDisplayPanel/DayScheduleDisplayPanel';

import RoutePathConstants from '../../constants/RoutePathConstants';

const { eventDetail } = RoutePathConstants;

class EventScheduleScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      eventList: events,
      currentEvent: {}
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  handleSessionItemClick = () => {
    history.push(`/${eventDetail}`);
  };

  render() {
    const { isOnMobileSize } = this.state;

    return isOnMobileSize ? (
      <div className="event-schedule-container">
        <div className="event-schedule-content">
          <DayPanel />
          <div className="schedule">
            <div className="time-panel">
              <div className="time-panel-header">
                <div className="sub-time-panel-header" />
              </div>
              <div className="time-panel-content">
                <div className="time">7:00</div>
                <div className="time">7:15</div>
                <div className="time">7:30</div>
                <div className="time">8:00</div>
                <div className="time">8:15</div>
                <div className="time">8:30</div>
                <div className="time">9:00</div>
                <div className="time">9:15</div>
                <div className="time">9:30</div>
                <div className="time">10:00</div>
                <div className="time">10:15</div>
                <div className="time">10:30</div>
              </div>
            </div>
            <div className="tracks">
              <EventScheduleTrack
                onSessionItemClick={this.handleSessionItemClick}
                trackTitle="Main Stage"
                sessionPosition="100"
              />
              <EventScheduleTrack
                onSessionItemClick={this.handleSessionItemClick}
                trackTitle="Creative Stage"
                sessionPosition=""
              />
              <EventScheduleTrack
                onSessionItemClick={this.handleSessionItemClick}
                trackTitle="Founder Stage"
                sessionPosition="300"
              />
              <EventScheduleTrack
                onSessionItemClick={this.handleSessionItemClick}
                trackTitle="WS 1 Area"
                sessionPosition="210"
              />
              <EventScheduleTrack
                onSessionItemClick={this.handleSessionItemClick}
                trackTitle="WS 2 Area"
                sessionPosition=""
              />
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default EventScheduleScreen;
