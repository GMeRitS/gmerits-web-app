import React from 'react';

import './style.css';

const UserSkill = ({ numberOfVotes, skill, voteStatus }) => (
  <div className="user-skill-container">
    <div className="vote-number">{numberOfVotes}</div>
    <div className="skill">{skill}</div>
    <div className="vote-button">
      <img src={voteStatus} />
    </div>
  </div>
);

export default UserSkill;
