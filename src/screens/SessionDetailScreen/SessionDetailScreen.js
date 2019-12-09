import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import ScheduleAction from '../../actions/ScheduleAction';
import _ from 'lodash';

import './style.css';

import { getDate } from '../../helpers/getDateHelper';
import iconBooked from '../../assets/iconBooked.png';
import qrCode from '../../assets/qrCode.png';
import IsMobileSize from '../../helpers/MobileDetect';
import ScreenHeader from '../../components/ScreenHeader';
import UserListItem from '../../components/UserListItem';
import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import { connect } from 'react-redux';

const { search, myQREventTicket } = RoutePathConstants;

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
    history.push(`/${search}/${id}`);
  };

  handleReserveButtonClick = () => {
    const {
      match: {
        params: { sessionId }
      }
    } = this.props;
    this.props.getSessionDetail(sessionId);
    this.props.reserveSeat(sessionId);
  };

  handleCancelReservationClick = () => {
    const {
      match: {
        params: { sessionId }
      }
    } = this.props;
    this.props.cancelReservation(sessionId);
  };

  handleShowEventTicketClick = () => {
    const {
      Schedule: { sessionDetail }
    } = this.props;
    const startDate = new Date(getDate(sessionDetail['start_time']));
    const endDate = new Date(getDate(sessionDetail['end_time']));
    const startTime = `${startDate.getHours()}:${
      startDate.getMinutes() < 10
        ? '0' + startDate.getMinutes()
        : startDate.getMinutes()
    }`;
    const endTime = `${endDate.getHours()}:${
      endDate.getMinutes() < 10
        ? '0' + endDate.getMinutes()
        : endDate.getMinutes()
    }`;
    const trackname = `${
      sessionDetail['track_name']
    } ${startTime} - ${endTime}`;
    history.push(
      `/${myQREventTicket}?qrCode=${sessionDetail.qrcode}&eventname=${
        sessionDetail.title
      }&trackname=${trackname}`
    );
  };

  handleFavouriteCheck = () => {
    const {
      match: {
        params: { sessionId }
      },
      Schedule: { sessionDetail }
    } = this.props;

    !_.isEmpty(sessionDetail) && sessionDetail['is_favourite']
      ? this.props.removeFavouriteSchedule(sessionId)
      : this.props.favouriteSchedule(sessionId);
  };

  render() {
    const {
      Schedule: { sessionDetail },
      reserveButtonBackgroundColor
    } = this.props;

    if (_.isEmpty(sessionDetail)) return null;
    let startDate = new Date(getDate(sessionDetail['start_time']));
    let endDate = new Date(getDate(sessionDetail['end_time']));
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

    return (
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
            defaultGradientTop="rgb(22, 10, 32)"
            defaultGradientBottom="rgb(35, 24, 45)"
            isFavouriteIcon={sessionDetail['is_favourite']}
            onFavouriteCheck={this.handleFavouriteCheck}
          />
          {sessionDetail['participant_capacity'] >
          sessionDetail['participant_count']
            ? !sessionDetail['is_reserved'] &&
              sessionDetail['participant_capacity'] !== 0 && (
                <div className="reservation-section-container">
                  <div className="event-detail-header-text reservation-text">
                    You need to reserve a seat for this event. Seats remaining{' '}
                    {sessionDetail['participant_count']}/
                    {sessionDetail['participant_capacity']}
                  </div>
                  <button
                    className={`event-detail-header-text reserve-button purple ${reserveButtonBackgroundColor}`}
                    onClick={this.handleReserveButtonClick}
                  >
                    RESERVE A SEAT
                  </button>
                </div>
              )
            : !sessionDetail['is_reserved'] &&
              sessionDetail['participant_capacity'] !== 0 && (
                <div className="reservation-section-container">
                  <div className="no-seat-label">Oh my!</div>
                  <div className="no-seat-headline">
                    This event is fully booked.
                  </div>
                  <div className="no-seat-suggestion">
                    Add this event to your favourites and we let you know if any
                    seats become available.
                  </div>
                </div>
              )}
          {sessionDetail['is_reserved'] &&
            (sessionDetail.qrcode === null ? (
              <div className="reservation-confirmation-container">
                <div className="icon-reserve-seat">
                  <img src={iconBooked} alt="" />
                </div>
                <div className="reserve-confirmation-headline">
                  You have a seat reservation for this event.
                </div>
                <div
                  className="cancel-reserve-confirmation"
                  onClick={this.handleCancelReservationClick}
                >
                  Cancel the reservation
                </div>
              </div>
            ) : (
              <div className="reservation-confirmation-container">
                <div
                  className="reserved-qr-code"
                  onClick={this.handleShowEventTicketClick}
                >
                  <img src={qrCode} alt="" />
                </div>
                <p className="reserve-confirmation-headline-qr">You're in!</p>
                <p className="reserve-confirmation-headline-qr">
                  View your ticket
                </p>
                <div
                  className="cancel-reserve-confirmation"
                  onClick={this.handleCancelReservationClick}
                >
                  Cancel the reservation
                </div>
              </div>
            ))}
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
    );
  }
}

export default connect(
  state => _.pick(state, ['Schedule']),
  dispatch => bindActionCreators({ ...ScheduleAction }, dispatch)
)(SessionDetailScreen);
