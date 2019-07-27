import React, { Component } from 'react';

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
  componentDidMount() {
    this.props.getMyProfileDetail('8bbc80f0-90a0-5092-ab27-29cc35f52d0c');
  }

  handleCloseTicketButtonClick = () => {
    history.goBack();
  };

  render() {
    const {
      User: { myDetail }
    } = this.props;

    if (_.isEmpty(myDetail)) return null;

    return (
      <div className="event-ticket-container">
        <ScreenHeader
          headerBackgroundColor="purple-gradient"
          screenHeaderName="YOUR EVENT TICKET"
          buttonBackVisible={true}
        />
        <div className="qr-code-container">
          <div className="qr-code-sub-container">
            <div className="qr-code">
              <QRCode
                value={myDetail['uu_id']}
                size={190}
                className="qr-code-style"
              />
            </div>
            <div className="event-ticket-user-name">
              <p>{myDetail.username}</p>
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
