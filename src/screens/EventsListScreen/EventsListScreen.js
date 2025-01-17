import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch } from 'react-router-dom';

import './style.css';

import ScreenHeader from '../../components/ScreenHeader';
import EventListItem from '../../components/EventListItem';
import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import eventScheduleScreen from '../EventScheduleScreen';
import ScreenHeaderPresenter from '../../presenters/ScreenHeaderPresenter';
import ScheduleAction from '../../actions/ScheduleAction';
import AppConfigAction from '../../actions/AppConfigAction';

const { eventSchedule, eventList: eventListRoute } = RoutePathConstants;
const { isEventListPage } = ScreenHeaderPresenter;
const MAX_EVENT_NAME_CHARACTERS = 30;
const MAX_EVENT_NAME_CHARACTERS_ON_SMALL_SCREEN_DEVICES = 19;

class EventsListScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      shouldDropDownOptionVisible: false
    };
  }

  componentDidMount() {
    this.props.getScheduleList();
  }

  handleEventListItemClick = id => {
    const {
      Schedule: { scheduleList }
    } = this.props;

    this.props.currentEvent(scheduleList.find(event => event.uuid === id));
    history.push(`/${eventListRoute}/${id}/${eventSchedule}`);
  };

  handleScreenNameClick = () => {
    const {
      history: {
        location: { pathname }
      },
      Schedule: {
        currentEvent: { uuid }
      }
    } = this.props;

    isEventListPage(pathname)
      ? history.push(`/${eventListRoute}/${uuid}/${eventSchedule}`)
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
    const {
      match: { path },
      history: {
        location: { pathname }
      },
      Schedule: { scheduleList, currentEvent },
      AppConfig: { appConfig }
    } = this.props;
    const currentEventName = this.shortenScreenHeaderName(currentEvent.title);

    const currentEventNameOnSmallScreen = this.shortenScreenHeaderNameOnSmallScreen(
      currentEvent.title
    );

    if (
      _.isEmpty(scheduleList) &&
      _.isEmpty(currentEvent) &&
      _.isEmpty(appConfig)
    )
      return null;

    return (
      <div className="event-list-container">
        <ScreenHeader
          defaultGradientTop={appConfig.colors['default_gradient_top']}
          defaultGradientBottom={appConfig.colors['default_gradient_bottom']}
          screenHeaderName={
            _.isEmpty(currentEvent)
              ? 'events'
              : (window.innerWidth <= 320
                ? currentEvent.title.length <=
                  MAX_EVENT_NAME_CHARACTERS_ON_SMALL_SCREEN_DEVICES
                : currentEvent.title.length <= MAX_EVENT_NAME_CHARACTERS)
              ? currentEvent.title
              : window.innerWidth <= 320
              ? currentEventNameOnSmallScreen
              : currentEventName
          }
          sideMenuButtonVisible={true}
          clickableScreenHeaderName={!_.isEmpty(currentEvent)}
          arrowUp={isEventListPage(pathname)}
          onEventNameClick={this.handleScreenNameClick}
        />
        <Switch>
          <Route
            exact
            path={
              scheduleList.length > 1
                ? `${path}`
                : `${path}/:eventId/${eventSchedule}`
            }
            component={() => (
              <div className="event-list">
                {scheduleList &&
                  scheduleList.map((event, id) => (
                    <EventListItem
                      key={id}
                      eventName={event.title}
                      eventDay={event['start_day_number']}
                      eventMonth={event['start_month_name_short']}
                      id={event.uuid}
                      onClick={this.handleEventListItemClick}
                      isSelected={currentEvent.uuid === event.uuid}
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
    );
  }
}

export default connect(
  state => _.pick(state, ['Schedule', 'AppConfig']),
  dispatch =>
    bindActionCreators({ ...ScheduleAction, ...AppConfigAction }, dispatch)
)(EventsListScreen);
