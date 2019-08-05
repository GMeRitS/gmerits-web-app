import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ScheduleAction from '../../actions/ScheduleAction';
import _ from 'lodash';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import ScreenHeader from '../../components/ScreenHeader';
import UserListItem from '../../components/UserListItem';
import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import { connect } from 'react-redux';

const { searchNew } = RoutePathConstants;

class SessionDetailScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize()
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { sessionId }
      }
    } = this.props;
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    window.scrollTo(0, 0);

    this.props.getSessionDetail(sessionId);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  handleUserListItemClick = id => {
    history.push(`/${searchNew}/${id}`);
  };

  render() {
    const { isOnMobileSize } = this.state;
    const {
      Schedule: { sessionDetail },
      reserveButtonBackgroundColor
    } = this.props;

    if (_.isEmpty(sessionDetail)) return null;
    let startDate = new Date(sessionDetail['start_time']);
    let endDate = new Date(sessionDetail['end_time']);
    let startTime = `${startDate.getHours()}:${
      startDate.getMinutes() < 10
        ? '0' + startDate.getMinutes()
        : startDate.getMinutes()
    }`;
    let endTime = `${endDate.getHours()}:${
      endDate.getMinutes() < 10
        ? '0' + endDate.getMinutes()
        : endDate.getMinutes()
    }`;

    return isOnMobileSize ? (
      <div className="event-detail-container">
        <div
          className="event-detail-header"
          style={{
            backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('${
              sessionDetail.images[0]
            }')`
          }}
        >
          <ScreenHeader
            heartIconVisible={true}
            buttonBackVisible={true}
            headerBackgroundColor="purple-gradient"
          />
          <div className="reservation-section-container">
            <div className="event-detail-header-text reservation-text">
              You need to reserve a seat for this event. Seats remaining 8/30
            </div>
            <button
              className={`event-detail-header-text reserve-button purple ${reserveButtonBackgroundColor}`}
            >
              RESERVE A SEAT
            </button>
          </div>
          <div className="event-detail-header-text event-schedule-time-label">
            <p>
              {sessionDetail['track_name']} {startTime} - {endTime}
            </p>
          </div>
        </div>
        <div className="event-detail-content">
          <div className="event-sub-container description-container">
            <div className="event-detail-sub-header event-description-header event-detail-content-text">
              {sessionDetail.title}
            </div>
            <div className="event-speaker-label event-detail-content-text">
              {sessionDetail['short_description']}
            </div>
            <div className="event-description event-detail-content-text">
              <p>{sessionDetail['long_description']}</p>
            </div>
          </div>
          <div className="event-sub-container event-speaker-list">
            <div className="event-detail-sub-header event-detail-content-text event-speaker-list">
              Speakers
            </div>
            {sessionDetail.speakers.map((speaker, id) => (
              <UserListItem
                onClick={this.handleUserListItemClick}
                key={id}
                userProfileImage={speaker['image_url']}
                id={speaker.uuid}
                userActiveStatus={speaker['is_online']}
                userBiography={speaker.biography}
                userName={speaker.name}
                //isMentorUser={speaker.isMentorUser}
              />
            ))}
          </div>
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
)(SessionDetailScreen);
