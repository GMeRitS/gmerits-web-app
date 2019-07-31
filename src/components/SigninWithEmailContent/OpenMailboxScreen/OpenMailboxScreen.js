import React from 'react';

import './style.css';

const OpenMailboxScreen = ({
  emailInput
}) => {
  return(
    <div className="open-mailbox-screen-container">
      <div className="open-mailbox-screen-content">
        <div className="check-your-email-label">Check your email</div>
        <div className="open-mailbox-screen-description">We've sent an email for you at {emailInput}. It has a magic link that will sign you in right away</div>
        <div className="open-mail-app-button">
          <p>Open Mail App</p>
        </div>
      </div>
    </div>
  )
};

export default OpenMailboxScreen;