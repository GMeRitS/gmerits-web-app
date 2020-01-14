import React, { Component } from 'react';
import queryString from 'query-string';

import './style.css';

import _isEmpty from 'lodash/isEmpty';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import history from '../../history';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import UserActions from '../../actions/UserActions';
import ScreenHeader from '../../components/ScreenHeader';

import closeTicketIcon from '../../assets/closeTicket.png';
import AppConfigAction from '../../actions/AppConfigAction';

class EventTicketScreen extends Component {
  handleCloseTicketButtonClick = () => {
    history.goBack();
  };

  render() {
    const { qrCode, username, eventname, trackname } = queryString.parse(
      history.location.search
    );
    const {
      AppConfig: { appConfig }
    } = this.props;

    if (_isEmpty(appConfig)) return null;

    return (
      <div
        className="event-ticket-container"
        style={{
          backgroundImage: `linear-gradient(${
            appConfig.colors['default_gradient_top']
          },${appConfig.colors['default_gradient_bottom']})`
        }}
      >
        <ScreenHeader
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
  state => _.pick(state, ['User', 'AppConfig']),
  dispatch =>
    bindActionCreators({ ...UserActions, ...AppConfigAction }, dispatch)
)(EventTicketScreen);
