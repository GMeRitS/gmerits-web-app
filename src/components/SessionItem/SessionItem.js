import React, { Component } from 'react';

import './style.css';

class SessionItem extends Component {
  render() {
    return (
      <div className="session-item" onClick={this.handleSessionItemClick}>
        <div className="important-session-side-highlight" />
        <div className="session-content">session example</div>
      </div>
    );
  }
}

export default SessionItem;