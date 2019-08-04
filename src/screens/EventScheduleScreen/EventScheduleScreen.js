import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScheduleAction from '../../actions/ScheduleAction';
import _ from 'lodash';

import './style.css';
import history from '../../history';

import IsMobileSize from '../../helpers/MobileDetect';
import events from '../../MockData/Events';
import EventScheduleTrack from '../../components/EventScheduleTrack';
import ScheduleTimePanel from '../../components/ScheduleTimePanel';
import DayPanel from '../../components/DayScheduleDisplayPanel';

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

    const {
      match: {
        params: { eventId }
      }
    } = this.props;

    this.props.getScheduleDetail(eventId);
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
    const {
      Schedule: { scheduleDetail }
    } = this.props;

    if (_.isEmpty(scheduleDetail)) return null;
    console.log(scheduleDetail);

    return isOnMobileSize ? (
      <div className="event-schedule-container">
        <div className="event-schedule-content">
          <DayPanel scheduleDetail={scheduleDetail} />
          {/*<div className="schedule">*/}
          {/*  <ScheduleTimePanel />*/}
            {/*<div className="tracks">*/}
              {/*<EventScheduleTrack*/}
              {/*  onSessionItemClick={this.handleSessionItemClick}*/}
              {/*  trackTitle="Main Stage"*/}
              {/*  sessionPosition="100"*/}
              {/*/>*/}
              {/*<EventScheduleTrack*/}
              {/*  onSessionItemClick={this.handleSessionItemClick}*/}
              {/*  trackTitle="Creative Stage"*/}
              {/*  sessionPosition=""*/}
              {/*/>*/}
              {/*<EventScheduleTrack*/}
              {/*  onSessionItemClick={this.handleSessionItemClick}*/}
              {/*  trackTitle="Founder Stage"*/}
              {/*  sessionPosition="300"*/}
              {/*/>*/}
              {/*<EventScheduleTrack*/}
              {/*  onSessionItemClick={this.handleSessionItemClick}*/}
              {/*  trackTitle="WS 1 Area"*/}
              {/*  sessionPosition="210"*/}
              {/*/>*/}
              {/*<EventScheduleTrack*/}
              {/*  onSessionItemClick={this.handleSessionItemClick}*/}
              {/*  trackTitle="WS 2 Area"*/}
              {/*  sessionPosition=""*/}
              {/*/>*/}
            {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default connect(
  state => _.pick(state, ['Schedule']),
  dispatch => bindActionCreators({ ...ScheduleAction }, dispatch)
)(EventScheduleScreen);
