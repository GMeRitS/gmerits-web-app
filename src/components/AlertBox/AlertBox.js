import React from 'react';

import './style.css';

const AlertBox = ({
  alertTextLabel,
  alertText,
  onRightOptionClick,
  rightOption,
  onLeftOptionClick,
  leftOption
}) => (
  <div className="unsaved-alert-container">
    <div className="unsaved-alert-box">
      <div className="unsaved-alert-text-container">
        <p className="unsaved-text-label">{alertTextLabel}</p>
        <p className="unsaved-alert-text">{alertText}</p>
      </div>
      <div className="alert-option-button-container">
        <button className="alert-button no" onClick={onLeftOptionClick}>
          <p>{leftOption}</p>
        </button>
        <button className="alert-button yes" onClick={onRightOptionClick}>
          <p>{rightOption}</p>
        </button>
      </div>
    </div>
  </div>
);

export default AlertBox;
