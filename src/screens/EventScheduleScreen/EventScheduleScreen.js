import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScheduleAction from '../../actions/ScheduleAction';
import _ from 'lodash';

import './style.css';
import history from '../../history';

import IsMobileSize from '../../helpers/MobileDetect';
import events from '../../MockData/Events';
import Schedule from '../../components/DayScheduleDisplayPanel';

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

    // window.scrollTo(0, 0);
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

    return (
      <div className="event-schedule-container">
        <div className="event-schedule-content">
          <Schedule scheduleDetail={scheduleDetail} />
        </div>
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['Schedule']),
  dispatch => bindActionCreators({ ...ScheduleAction }, dispatch)
)(EventScheduleScreen);
