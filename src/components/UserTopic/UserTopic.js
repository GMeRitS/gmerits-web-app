import React from 'react';

import './style.css';

const UserTopPick = ({ numberOfVotes, skill, voteStatus }) => (
  <div className="user-skill-container">
    <div className="vote-number">{numberOfVotes}</div>
    <div className="skill">{skill}</div>
    <div className="vote-button">
      <img src={voteStatus} alt="" />
    </div>
  </div>
);

export default UserTopPick;
