import React from 'react';

import '../style.css';
import defaultUserProfileImage from '../../../assets/defaultUserAvatar.png';

const BubbleSpeechMentor = ({
  mentorChatSpeech,
  bubbleMentorStyle,
  iconChatBotAvatar,
  mentorChatTextColor,
  bubbleMentorChatBackground
}) => {
  return (
    <div className="bubble-container mentor" style={bubbleMentorStyle}>
      <div className="mentor-chat-avatar">
        <img
          src={
            iconChatBotAvatar === null
              ? defaultUserProfileImage
              : iconChatBotAvatar
          }
          alt=""
        />
      </div>
      <div className="bubble-chat-container">
        <div
          className="bubble-mentor-chat"
          style={{ backgroundColor: bubbleMentorChatBackground }}
        >
          <p style={{ color: mentorChatTextColor }}>{mentorChatSpeech}</p>
        </div>
        <div
          className="bubble-mentor-chat-after"
          style={{ borderColor: `${bubbleMentorChatBackground} transparent` }}
        />
      </div>
    </div>
  );
};

export default BubbleSpeechMentor;
