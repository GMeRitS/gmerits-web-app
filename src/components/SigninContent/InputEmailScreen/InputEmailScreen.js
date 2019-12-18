import React from 'react';
import _ from 'lodash';

import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const InputEmailScreen = ({
  email,
  shouldStartButtonVisible,
  onInputEmailChange,
  onClearAllButtonClick,
  onStartButtonClick
}) => {
  return (
    <div>
      <p className="signin-with-email-label">Enter your email to get started</p>
      <div className="email-signin-input">
        <input
          className="sign-in-email-input"
          type="email"
          placeholder="email"
          value={email}
          onChange={onInputEmailChange}
        />
        {!_.isEmpty(email) && (
          <div className="clear-all-input" onClick={onClearAllButtonClick}>
            <FontAwesomeIcon className="icon-clear-all" icon={faTimesCircle} />
          </div>
        )}
      </div>
      {shouldStartButtonVisible && (
        <div className="start-button" onClick={onStartButtonClick}>
          Start
        </div>
      )}
    </div>
  );
};

export default InputEmailScreen;
