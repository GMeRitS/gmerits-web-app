import React, { Component } from 'react';

import './style.css';
import history from '../../history';
import IsMobileSize from '../../helpers/MobileDetect';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import events from '../../MockData/Events';
import RoutePathConstants from '../../constants/RoutePathConstants';

const { eventList } = RoutePathConstants;

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

    const {
      match: {
        params: {eventId}
      }
    } = this.props;

    const { eventList } = this.state;
    const currentEvent = eventList.find(event => event.id.toString() === eventId);

    this.setState({ currentEvent });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  handleScreenNameClick = () => {
    history.push(`/${eventList}`);
  };

  render() {
    const { isOnMobileSize, currentEvent: { eventName } } = this.state;

    let stringResult = '';
    if(eventName) {
      let stringOne = eventName.substring(0, 16);
      let stringTwo = eventName.slice((eventName.length - 14), eventName.length);
      stringResult = stringOne + '...' + stringTwo;
    }

    return isOnMobileSize ? (
      <div className="event-schedule-container">
        <ScreenHeader
          headerBackgroundColor="blue"
          screenHeaderName={stringResult}
          onScreenHeaderClick={this.handleScreenNameClick}
          infoIconVisible={true}
          mapIconVisible={true}
          showEventListArrowIconVisible={true}
          screenHeaderEventNameVisible={true}
        />
        <div className="event-schedule-content">
          this will be a schedule
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default EventScheduleScreen;