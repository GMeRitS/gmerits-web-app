import React from 'react';

import './style.css';

const SessionItem = ({
  sessionTheme,
  onClick,
  id,
  sessionPosition,
  sessionName,
  sessionDescription
}) => {
  function handleSessionItemClick() {
    onClick(id);
  }
  return (
    <div
      className="session-item"
      onClick={handleSessionItemClick}
      style={{ marginLeft: `${sessionPosition}px` }}
    >
      <div
        className="session-side-theme"
        style={{ backgroundColor: sessionTheme }}
      />
      <div className="session-content">
        <p className="session-name">{sessionName}</p>
        <p className="session-description">{sessionDescription}</p>
      </div>
    </div>
  );
};

export default SessionItem;
