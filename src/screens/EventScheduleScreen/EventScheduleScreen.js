import React, { Component } from 'react';

import './style.css';
import history from '../../history';

import IsMobileSize from '../../helpers/MobileDetect';
import events from '../../MockData/Events';
import SessionItem from '../../components/SessionItem/SessionItem';
import EventScheduleTrack from '../../components/EventScheduleTrack/EventScheduleTrack';

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
          <p>This will be a schedule</p>
          <SessionItem/>
          <EventScheduleTrack/>
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default EventScheduleScreen;
