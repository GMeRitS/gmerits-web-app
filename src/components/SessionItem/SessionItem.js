import React, { Component } from 'react';

import './style.css';

class SessionItem extends Component {
  render() {
    const { sessionTheme, onClick, sessionPosition } = this.props;

    return (
      <div
        className="session-item"
        onClick={onClick}
        style={{ marginLeft: `${sessionPosition}px` }}
      >
        <div
          className="session-side-theme"
          style={{ backgroundColor: sessionTheme }}
        />
        <div className="session-content">Session Example</div>
      </div>
    );
  }
}

export default SessionItem;
