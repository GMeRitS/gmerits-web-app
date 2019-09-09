import React from 'react';

import '../style.css';
import iconAppUnifiedSci from '../../../assets/iconAppUnifiedSci.png';

const BubbleSpeechMentor = ({ mentorChatSpeech, bubbleMentorStyle }) => {
  return (
    <div className="bubble-container mentor" style={bubbleMentorStyle}>
      <div className="mentor-chat-avatar">
        <img src={iconAppUnifiedSci} alt="" />
      </div>
      <div className="bubble-mentor-chat">
        <p>{mentorChatSpeech}</p>
      </div>
    </div>
  );
};

export default BubbleSpeechMentor;
