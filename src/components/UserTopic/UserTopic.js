import React, { Component } from 'react';

import './style.css';

import thumbVoted from '../../assets/thumbVoted.png';

class UserTopic extends Component {
  handleEndorsementClick = () => {
    const { onIncrement, userTopic } = this.props;

    onIncrement(userTopic);
  };

  render() {
    const { numberOfEndorsement, skill, voteStatus } = this.props;
    return (
      <div className="user-skill-container">
        <div className="vote-number">{numberOfEndorsement}</div>
        <div className="skill">{skill}</div>
        <div
          className={`vote-button ${voteStatus}`}
          onClick={this.handleEndorsementClick}
        >
          <img src={thumbVoted} alt="" />
        </div>
      </div>
    );
  }
}

export default UserTopic;
