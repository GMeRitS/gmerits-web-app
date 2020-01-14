import React, { Component } from 'react';

import './style.css';

import thumbVoted from '../../assets/thumbVoted.png';

class UserTopic extends Component {
  handleEndorsementClick = () => {
    const { onVoted, id } = this.props;

    onVoted(id);
  };

  handleTopicClick = () => {
    const { onTopicClick, id } = this.props;

    onTopicClick(id);
  };

  render() {
    const {
      numberOfEndorsement,
      topicName,
      voted,
      topicEndorseDefaultBackgroundColor,
      topicEndorseBackgroundColor
    } = this.props;
    return (
      <div className="user-skill-container">
        <div
          className="vote-number-topic-container"
          onClick={this.handleTopicClick}
        >
          <div className="vote-number">{numberOfEndorsement}</div>
          <div className="topic">{topicName}</div>
        </div>

        <div
          className="vote-button"
          onClick={this.handleEndorsementClick}
          style={{
            backgroundColor: voted
              ? topicEndorseBackgroundColor
              : topicEndorseDefaultBackgroundColor
          }}
        >
          <img src={thumbVoted} alt="" />
        </div>
      </div>
    );
  }
}

export default UserTopic;
