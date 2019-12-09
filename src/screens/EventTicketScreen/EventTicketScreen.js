import React, { Component } from 'react';
import queryString from 'query-string';

import './style.css';

import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import history from '../../history';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import UserActions from '../../actions/UserActions';
import ScreenHeader from '../../components/ScreenHeader';

import closeTicketIcon from '../../assets/closeTicket.png';

class EventTicketScreen extends Component {
  handleCloseTicketButtonClick = () => {
    history.goBack();
  };

  render() {
    const { qrCode, username, eventname, trackname } = queryString.parse(
      history.location.search
    );
    // const {
    //   User: { myDetail }
    // } = this.props;

    //if (_.isEmpty(myDetail)) return null;

    return (
      <div className="event-ticket-container">
        <ScreenHeader
          defaultGradientTop="rgb(22, 10, 32)"
          defaultGradientBottom="rgb(22, 10, 32)"
          screenHeaderName="YOUR EVENT TICKET"
          buttonBackVisible={true}
        />
        <div className="qr-code-container">
          <div className="qr-code-sub-container">
            <div className="qr-code">
              <QRCode value={qrCode} size={190} className="qr-code-style" />
            </div>
            <div className="event-ticket-name">
              <p>{username}</p>
              <p>{eventname}</p>
              <p className="event-ticket-track-name">{trackname}</p>
            </div>
          </div>
          <button
            className="close-ticket-button"
            onClick={this.handleCloseTicketButtonClick}
          >
            <img src={closeTicketIcon} className="close-ticket-icon" alt="" />
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['User']),
  dispatch => bindActionCreators({ ...UserActions }, dispatch)
)(EventTicketScreen);
