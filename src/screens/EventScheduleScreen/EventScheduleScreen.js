import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ScheduleAction from '../../actions/ScheduleAction';
import _ from 'lodash';

import './style.css';
import history from '../../history';

import events from '../../MockData/Events';
import Schedule from '../../components/DayScheduleDisplayPanel';

import RoutePathConstants from '../../constants/RoutePathConstants';

const { eventDetail } = RoutePathConstants;

class EventScheduleScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
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

  handleSessionItemClick = () => {
    history.push(`/${eventDetail}`);
  };

  render() {
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
