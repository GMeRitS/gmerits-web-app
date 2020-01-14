import React from 'react';

import '../style.css';

const BubbleSpeechUser = ({ userChatInput, bubbleUserChatBackground, userChatTextColor }) => {
  return (
    <div className="bubble-container user">
      <div className='bubble-chat-container'>
        <div className="bubble-user-chat" style={{ backgroundColor: bubbleUserChatBackground }}>
          <p style={{ color: userChatTextColor }}>{userChatInput}</p>
        </div>
        <div className='bubble-user-chat-after' style={{ borderColor: `${bubbleUserChatBackground} transparent` }}/>
      </div>
    </div>
  );
};

export default BubbleSpeechUser;
