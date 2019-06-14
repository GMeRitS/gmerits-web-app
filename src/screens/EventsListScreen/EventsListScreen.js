import React, { Component } from 'react';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import EventListItem from '../../components/EventListItem/EventListItem';
import history from '../../history';
import events from '../../MockData/Events';
import RoutePathConstants from '../../constants/RoutePathConstants';

const { eventSchedule } = RoutePathConstants;
const MAX_EVENT_NAME_CHARACTERS = 30;

class EventsListScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      eventList: events,
      currentEvent: {}
    }
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

  handleEventListItemClick = id => {
    history.push(`/${eventSchedule}/${id}`);
  };

  handleScreenNameClick = eventId => {
    history.push(`/${eventSchedule}/${eventId}`);
  };

  render() {
    const { isOnMobileSize, eventList, currentEvent, currentEvent: { eventName } } = this.state;

    let currentEventName = '';
    if(eventName) {
      let substringOne = eventName.substring(0, 16);
      let substringTwo = eventName.slice((eventName.length - 14), eventName.length);
      currentEventName = substringOne + '...' + substringTwo;
    }

    if (!eventName) return null;

    return isOnMobileSize ? (
      <div className="event-list-container">
        <ScreenHeader
          headerBackgroundColor="blue"
          screenHeaderName={currentEvent ? (eventName.length <= MAX_EVENT_NAME_CHARACTERS ? eventName : currentEventName) : 'events'}
          sideMenuButtonVisible={true}
          screenHeaderNameVisible={!currentEvent}
          screenHeaderEventNameVisible={!!currentEvent }
          showScheduleArrowIconVisible={true}
          eventId={currentEvent.id}
          onEventNameClick={this.handleScreenNameClick}
        />
        <div className="event-list">
          {eventList.map((event, id) => (
            <EventListItem
              key={id}
              eventName={event.eventName}
              eventDay={event.eventDay}
              eventMonth={event.eventMonth}
              id={event.id}
              onClick={this.handleEventListItemClick}
            />
          ))}
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default EventsListScreen;