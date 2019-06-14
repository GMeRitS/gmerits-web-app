import React, { Component } from 'react';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import EventListItem from '../../components/EventListItem/EventListItem';
import history from '../../history';
import events from '../../MockData/Events';
import RoutePathConstants from '../../constants/RoutePathConstants';

const { eventSchedule } = RoutePathConstants;

class EventsListScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      eventList: events
    }
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

  handleEventListItemClick = id => {
    history.push(`/${eventSchedule}/${id}`);
  };

  render() {
    const { isOnMobileSize, eventList } = this.state;
    return isOnMobileSize ? (
      <div className="event-list-container">
        <ScreenHeader
          headerBackgroundColor="blue"
          screenHeaderName='EVENTS'
          sideMenuButtonVisible={true}
          screenHeaderNameVisible={true}
          screenHeaderEventNameVisible={false}
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