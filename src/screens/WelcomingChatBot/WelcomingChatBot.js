import React, { Component } from 'react';

import './style.css';

import NextStepButton from '../../components/TriggerNextStep';
import ScreenHeader from '../../components/ScreenHeader';
import BubbleSpeechMentor from '../../components/BubbleSpeech/BubbleSpeechMentor';
import BubbleSpeechUser from '../../components/BubbleSpeech/BubbleSpeechUser';
import isEmpty from 'lodash/isEmpty';
import AlertBox from '../../components/AlertBox';
import EditScreenHeader from "../../components/EditScreensHeader";

class WelcomingChatBot extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      userChatInput: '',
      shouldBubbleUserSpeechVisible: false,
      shouldWelcomeChatBotInputVisible: true,
      shouldAlertBoxVisible: false
    };
  }

  handleInputChatOnChange = e => {
    this.setState({ userChatInput: e.target.value });
  };

  handleButtonChatSend = () => {
    const { userChatInput } = this.state;

    if (userChatInput.length < 2 || userChatInput.length > 25) {
      this.setState({ shouldAlertBoxVisible: true });
    } else {
      this.setState({
        shouldBubbleUserSpeechVisible: true,
        shouldWelcomeChatBotInputVisible: false
      });
    }
  };

  handleAlertBoxClose = () => {
    this.setState({ userChatInput: '', shouldAlertBoxVisible: false });
  };

  render() {
    const {
      userChatInput,
      shouldBubbleUserSpeechVisible,
      shouldWelcomeChatBotInputVisible,
      shouldAlertBoxVisible
    } = this.state;
    let hiddenStyle = {
      opacity: 0,
      visibility: 'hidden'
    };

    let visibleMentorThirdBubble = {
      opacity: 1,
      visibility: 'visible',
      transition: 'all 300ms'
    };

    let visibleMentorFourthBubble = {
      opacity: 1,
      visibility: 'visible',
      transition: 'all 300ms 0.5s'
    };

    let visibleMentorFifthBubble = {
      opacity: 1,
      visibility: 'visible',
      transition: 'all 300ms 1s'
    };

    let visibleMentorSixthBubble = {
      opacity: 1,
      visibility: 'visible',
      transition: 'all 300ms 1.5s'
    };

    return (
      <div className="welcoming-bot-container">
        <ScreenHeader
          defaultGradientTop="rgb(22, 10, 32)"
          defaultGradientBottom="rgb(35, 24, 45)"
          screenHeaderName="WELCOME"
        />
        <div className="welcoming-bot-content">
          {shouldAlertBoxVisible && (
            <AlertBox
              alertTextLabel="The chosen username must be between 2 and 25 characters long. Please enter a valid username"
              leftOptionVisible={true}
              rightOptionVisible={false}
              leftOption="OK"
              onLeftOptionClick={this.handleAlertBoxClose}
            />
          )}
          <BubbleSpeechMentor mentorChatSpeech="How would you like to be called?" />
          {shouldBubbleUserSpeechVisible && (
            <BubbleSpeechUser
              userChatInput={isEmpty(userChatInput) ? '' : userChatInput}
            />
          )}
          {
            <BubbleSpeechMentor
              mentorChatSpeech="Welcome :)"
              bubbleMentorStyle={
                shouldBubbleUserSpeechVisible
                  ? visibleMentorThirdBubble
                  : hiddenStyle
              }
            />
          }
          {
            <BubbleSpeechMentor
              mentorChatSpeech="Your nickname is visible in the application only to the people who you call or send messages to."
              bubbleMentorStyle={
                shouldBubbleUserSpeechVisible
                  ? visibleMentorFourthBubble
                  : hiddenStyle
              }
            />
          }
          {
            <BubbleSpeechMentor
              mentorChatSpeech="You can also change your nickname on the settings page."
              bubbleMentorStyle={
                shouldBubbleUserSpeechVisible
                  ? visibleMentorFifthBubble
                  : hiddenStyle
              }
            />
          }
          {
            <BubbleSpeechMentor
              mentorChatSpeech="You are now ready to start searching for advice and mentors to talk to about the topics you are interested in."
              bubbleMentorStyle={
                shouldBubbleUserSpeechVisible
                  ? visibleMentorSixthBubble
                  : hiddenStyle
              }
            />
          }
          {
            <NextStepButton
              startSearchingButtonStyle={
                shouldBubbleUserSpeechVisible
                  ? visibleMentorSixthBubble
                  : hiddenStyle
              }
              username={userChatInput}
            />
          }
          {shouldWelcomeChatBotInputVisible && (
            <div className="welcoming-bot-footer">
              <div className="chat-input-container">
                <input
                  type="text"
                  className="chat-input"
                  onChange={this.handleInputChatOnChange}
                  value={userChatInput}
                />
              </div>
              <div className="chat-button" onClick={this.handleButtonChatSend}>
                <p>OK</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default WelcomingChatBot;
