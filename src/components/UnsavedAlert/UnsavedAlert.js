import React from 'react';

import './style.css';

const UnsavedAlert = () => (
  <div className="unsaved-alert-container">
    <div className="unsaved-alert-box">
      <div className="unsaved-alert-text-container">
        <p className="unsaved-text-label">Unsaved changes</p>
        <p className="unsaved-alert-text">
          You have unsaved changes. Are you sure you want to cancel?
        </p>
      </div>
      <div className="alert-option-button-container">
        <button className="alert-button no">
          <p>No</p>
        </button>
        <button className="alert-button yes">
          <p>Yes</p>
        </button>
      </div>
    </div>
  </div>
);

export default UnsavedAlert;