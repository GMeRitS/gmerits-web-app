import React, { Component } from 'react';

import './style.css';
import IsMobileSize from '../../helpers/MobileDetect';
import events from '../../MockData/Events';

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

  render() {
    const {
      isOnMobileSize,
    } = this.state;

    return isOnMobileSize ? (
      <div className="event-schedule-container">
        <div className="event-schedule-content">this will be a schedule</div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default EventScheduleScreen;
