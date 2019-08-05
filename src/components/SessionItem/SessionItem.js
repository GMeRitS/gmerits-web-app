import React from 'react';

import './style.css';

const SessionItem = ({
  sessionTheme,
  onClick,
  id,
  sessionPosition,
  sessionWidth,
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
      style={{
        width: `${sessionWidth}px`,
        transform: `translate(${sessionPosition}px, 0)`
      }}
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
