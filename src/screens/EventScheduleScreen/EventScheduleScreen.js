import React, { Component } from 'react';

import './style.css';
import history from '../../history';
import IsMobileSize from '../../helpers/MobileDetect';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import events from '../../MockData/Events';
import RoutePathConstants from '../../constants/RoutePathConstants';

const { eventList } = RoutePathConstants;
const MAX_EVENT_NAME_CHARACTERS = 30;

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

  handleScreenNameClick = eventId => {
    history.push(`/${eventList}/${eventId}`);
  };

  render() {
    const { isOnMobileSize, currentEvent: { eventName }, currentEvent } = this.state;

    let currentEventName = '';
    if(eventName) {
      let substringOne = eventName.substring(0, 16);
      let substringTwo = eventName.slice((eventName.length - 14), eventName.length);
      currentEventName = substringOne + '...' + substringTwo;
    }

    if (!currentEvent || !eventName) return null;

    return isOnMobileSize ? (
      <div className="event-schedule-container">
        <ScreenHeader
          headerBackgroundColor="blue"
          screenHeaderName={currentEvent.eventName.length <= MAX_EVENT_NAME_CHARACTERS ? currentEvent.eventName : currentEventName}
          infoIconVisible={true}
          mapIconVisible={true}
          showEventListArrowIconVisible={true}
          screenHeaderEventNameVisible={true}
          eventId={currentEvent.id}
          onEventNameClick={this.handleScreenNameClick}
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