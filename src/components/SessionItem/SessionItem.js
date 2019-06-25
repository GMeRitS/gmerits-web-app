import React, { Component } from 'react';

import './style.css';

class SessionItem extends Component {
  render() {
    const { sessionTheme, onClick } = this.props;

    return (
      <div className="session-item" onClick={onClick}>
        <div className="session-side-theme" style={ { backgroundColor: sessionTheme } } />
        <div className="session-content">Session Example</div>
      </div>
    );
  }
}

export default SessionItem;