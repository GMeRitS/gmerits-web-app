import React from 'react';

import '../style.css';

const BubbleSpeechUser = ({ userChatInput }) => {
  return (
    <div className="bubble-container user">
      <div className="bubble-user-chat">
        {/*<img src={bubbleMentorChat} className="bubble-mentor"/>*/}
        <p>{userChatInput}</p>
      </div>
    </div>
  );
};

export default BubbleSpeechUser;
