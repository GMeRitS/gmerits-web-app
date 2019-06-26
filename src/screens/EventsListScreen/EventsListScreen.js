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
const MAX_EVENT_NAME_CHARACTERS_ON_SMALL_SCREEN_DEVICES = 19;

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
    const {
      history: {
        location: { pathname }
      }
    } = this.props;
    const {
      currentEvent: { id }
    } = this.state;

    isEventListPage(pathname)
      ? history.push(`/${eventListRoute}/${id}/${eventSchedule}`)
      : history.push(`/${eventListRoute}`);
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
  shortenScreenHeaderNameOnSmallScreen = screenHeaderName => {
    if (!screenHeaderName) return '';

    let currentEventName;
    let substringOne = screenHeaderName.substring(0, 12);
    let substringTwo = screenHeaderName.slice(
      screenHeaderName.length - 11,
      screenHeaderName.length
    );
    currentEventName = substringOne + '...' + substringTwo;
    return currentEventName;
  };

  render() {
    const { isOnMobileSize, eventList, currentEvent } = this.state;
    const {
      match: { path },
      history: {
        location: { pathname }
      }
    } = this.props;
    const currentEventName = this.shortenScreenHeaderName(
      currentEvent.eventName
    );

    const currentEventNameOnSmallScreen = this.shortenScreenHeaderNameOnSmallScreen(
      currentEvent.eventName
    );

    return isOnMobileSize ? (
      <div className="event-list-container">
        <ScreenHeader
          headerBackgroundColor="purple-gradient"
          screenHeaderName={
            _isEmpty(currentEvent)
              ? 'events'
              : (window.innerWidth <= 320
                ? currentEvent.eventName.length <=
                  MAX_EVENT_NAME_CHARACTERS_ON_SMALL_SCREEN_DEVICES
                : currentEvent.eventName.length <= MAX_EVENT_NAME_CHARACTERS)
              ? currentEvent.eventName
              : window.innerWidth <= 320
              ? currentEventNameOnSmallScreen
              : currentEventName
          }
          sideMenuButtonVisible={isEventListPage(pathname)}
          clickableScreenHeaderName={!_isEmpty(currentEvent)}
          arrowUp={isEventListPage(pathname)}
          onEventNameClick={this.handleScreenNameClick}
          infoIconVisible={!isEventListPage(pathname)}
          mapIconVisible={!isEventListPage(pathname)}
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
