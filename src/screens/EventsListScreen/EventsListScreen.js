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

    console.log(eventList.find(event => event.id.toString() === eventId));

    this.setState({ currentEvent });
    console.log(currentEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  handleEventListItemClick = id => {
    //this.setState({ selectedEvent: id });
    history.push(`/${eventSchedule}/${id}`);
  };

  handleScreenNameClick = eventId => {
    history.push(`/${eventSchedule}/${eventId}`);
  };

  render() {
    const { isOnMobileSize, eventList, currentEvent } = this.state;

    if (!currentEvent || !currentEvent.eventName) return null;

    let currentEventName = '';
    if(currentEvent.eventName) {
      let substringOne = currentEvent.eventName.substring(0, 16);
      let substringTwo = currentEvent.eventName.slice((currentEvent.eventName.length - 14), currentEvent.eventName.length);
      currentEventName = substringOne + '...' + substringTwo;
    }

    return isOnMobileSize ? (
      <div className="event-list-container">
        <ScreenHeader
          headerBackgroundColor="blue"
          screenHeaderName={currentEvent ? (currentEvent.eventName.length <= MAX_EVENT_NAME_CHARACTERS ? currentEvent.eventName : currentEventName) : 'events'}
          sideMenuButtonVisible={true}
          screenHeaderNameVisible={!currentEvent}
          screenHeaderEventNameVisible={!!currentEvent }
          showScheduleArrowIconVisible={true}
          eventId={currentEvent.id}
          onEventNameClick={this.handleScreenNameClick}
        />
        <div className="event-list">
          {eventList && (eventList.map((event, id) => (
            <EventListItem
              key={id}
              eventName={event.eventName}
              eventDay={event.eventDay}
              eventMonth={event.eventMonth}
              id={event.id}
              onClick={this.handleEventListItemClick}
              //selectedEvent={selectedEvent}
            />
          )))}
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default EventsListScreen;