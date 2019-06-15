import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Route, Switch } from 'react-router-dom';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import EventListItem from '../../components/EventListItem/EventListItem';
import history from '../../history';
import events from '../../MockData/Events';
import RoutePathConstants from '../../constants/RoutePathConstants';
import eventScheduleScreen from '../EventScheduleScreen/EventScheduleScreen';
import ScreenHeaderPresenter from '../../presenters/ScreenHeaderPresenter';

const { eventSchedule, eventList: eventListRoute } = RoutePathConstants;
const { isEventListPage } = ScreenHeaderPresenter;
const MAX_EVENT_NAME_CHARACTERS = 30;

class EventsListScreen extends Component {
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

  handleEventListItemClick = id => {
    const { eventList } = this.state;

    this.setState({ currentEvent: eventList.find(event => event.id === id) });
    history.push(`/${eventListRoute}/${id}/${eventSchedule}`);
  };

  handleScreenNameClick = () => {
    history.push(`/${eventListRoute}`);
  };

  shortenScreenHeaderName = screenHeaderName => {
    if (!screenHeaderName) return '';

    let currentEventName;
    let substringOne = screenHeaderName.substring(0, 16);
    let substringTwo = screenHeaderName.slice(
      screenHeaderName.length - 14,
      screenHeaderName.length
    );
    currentEventName = substringOne + '...' + substringTwo;
    return currentEventName;
  };

  render() {
    const {
      isOnMobileSize,
      eventList,
      currentEvent
    } = this.state;
    const {
      match: { path }
    } = this.props;
    const currentEventName = this.shortenScreenHeaderName(
      currentEvent.eventName
    );
    console.log(path);
    console.log(isEventListPage());
    return isOnMobileSize ? (
      <div className="event-list-container">
        <ScreenHeader
          headerBackgroundColor="blue"
          screenHeaderName={
            _isEmpty(currentEvent)
              ? 'events'
              : currentEvent.eventName.length <= MAX_EVENT_NAME_CHARACTERS
              ? currentEvent.eventName
              : currentEventName
          }
          sideMenuButtonVisible={isEventListPage()}
          clickableScreenHeaderName={!_isEmpty(currentEvent)}
          showScheduleArrowIconVisible={true}
          onEventNameClick={this.handleScreenNameClick}
        />
        <Switch>
          <Route
            exact
            path={`${path}`}
            component={() => (
              <div className="event-list">
                {eventList &&
                  eventList.map((event, id) => (
                    <EventListItem
                      key={id}
                      eventName={event.eventName}
                      eventDay={event.eventDay}
                      eventMonth={event.eventMonth}
                      id={event.id}
                      onClick={this.handleEventListItemClick}
                      isSelected={currentEvent.id === event.id}
                    />
                  ))}
              </div>
            )}
          />
          <Route
            exact
            path={`${path}/:eventId/${eventSchedule}`}
            component={eventScheduleScreen}
          />
        </Switch>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default EventsListScreen;
