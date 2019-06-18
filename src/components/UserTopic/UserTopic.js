import React, { Component } from 'react';

import './style.css';

import thumbVoted from '../../assets/thumbVoted.png';

class UserTopic extends Component {
  handleEndorsementClick = () => {
    const { onVoted, id } = this.props;

    onVoted(id);
  };

  render() {
    const { numberOfEndorsement, topicName, voted } = this.props;
    return (
      <div className="user-skill-container">
        <div className="vote-number">{numberOfEndorsement}</div>
        <div className="topic">{topicName}</div>
        <div
          className={`vote-button ${voted ? 'voted' : ''}`}
          onClick={this.handleEndorsementClick}
        >
          <img src={thumbVoted} alt="" />
        </div>
      </div>
    );
  }
}

export default UserTopic;
