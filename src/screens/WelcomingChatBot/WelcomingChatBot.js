import React, { Component, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _isEmpty from 'lodash/isEmpty';
import _pick from 'lodash/pick';

import './style.css';

import NextStepButton from '../../components/TriggerNextStep';
import ScreenHeader from '../../components/ScreenHeader';
import BubbleSpeechMentor from '../../components/BubbleSpeech/BubbleSpeechMentor';
import BubbleSpeechUser from '../../components/BubbleSpeech/BubbleSpeechUser';
import isEmpty from 'lodash/isEmpty';
import AlertBox from '../../components/AlertBox';
import AuthDataStorage from '../../helpers/StorageHelpers/AuthDataStorage';
import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import AppConfigAction from '../../actions/AppConfigAction';

const { search } = RoutePathConstants;
let inputElement;

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

  componentDidMount() {
    if (AuthDataStorage.getApiKey()) {
      history.push(`/${search}`);
    }
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

  useEffect = () => {
    inputElement = useRef(null);
    inputElement.current.onfocus = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    };
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

    const {
      AppConfig: { appConfig }
    } = this.props;

    if (_isEmpty(appConfig)) return null;

    return (
      <div className="welcoming-bot-container">
        <ScreenHeader
          defaultGradientTop={appConfig.colors['default_gradient_top']}
          defaultGradientBottom={appConfig.colors['default_gradient_bottom']}
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
          <BubbleSpeechMentor
            iconChatBotAvatar={appConfig.images['bot_avatar']['image_url']}
            mentorChatSpeech="How would you like to be called?"
            bubbleMentorChatBackground={
              appConfig.colors['message_received_background']
            }
            mentorChatTextColor={appConfig.colors['message_received_text']}
          />
          {shouldBubbleUserSpeechVisible && (
            <BubbleSpeechUser
              userChatInput={isEmpty(userChatInput) ? '' : userChatInput}
              bubbleUserChatBackground={
                appConfig.colors['message_sent_background']
              }
              userChatTextColor={appConfig.colors['message_sent_text']}
            />
          )}
          {
            <BubbleSpeechMentor
              iconChatBotAvatar={appConfig.images['bot_avatar']['image_url']}
              mentorChatSpeech="Welcome :)"
              bubbleMentorStyle={
                shouldBubbleUserSpeechVisible
                  ? visibleMentorThirdBubble
                  : hiddenStyle
              }
              bubbleMentorChatBackground={
                appConfig.colors['message_received_background']
              }
              mentorChatTextColor={appConfig.colors['message_received_text']}
            />
          }
          {
            <BubbleSpeechMentor
              iconChatBotAvatar={appConfig.images['bot_avatar']['image_url']}
              mentorChatSpeech="Your nickname is visible in the application only to the people who you call or send messages to."
              bubbleMentorStyle={
                shouldBubbleUserSpeechVisible
                  ? visibleMentorFourthBubble
                  : hiddenStyle
              }
              bubbleMentorChatBackground={
                appConfig.colors['message_received_background']
              }
              mentorChatTextColor={appConfig.colors['message_received_text']}
            />
          }
          {
            <BubbleSpeechMentor
              iconChatBotAvatar={appConfig.images['bot_avatar']['image_url']}
              mentorChatSpeech="You can also change your nickname on the settings page."
              bubbleMentorStyle={
                shouldBubbleUserSpeechVisible
                  ? visibleMentorFifthBubble
                  : hiddenStyle
              }
              bubbleMentorChatBackground={
                appConfig.colors['message_received_background']
              }
              mentorChatTextColor={appConfig.colors['message_received_text']}
            />
          }
          {
            <BubbleSpeechMentor
              iconChatBotAvatar={appConfig.images['bot_avatar']['image_url']}
              mentorChatSpeech="You are now ready to start searching for advice and mentors to talk to about the topics you are interested in."
              bubbleMentorStyle={
                shouldBubbleUserSpeechVisible
                  ? visibleMentorSixthBubble
                  : hiddenStyle
              }
              bubbleMentorChatBackground={
                appConfig.colors['message_received_background']
              }
              mentorChatTextColor={appConfig.colors['message_received_text']}
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
              startSearchingButtonColor={
                appConfig.colors['profile_button_background']
              }
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
                  ref={inputElement}
                />
              </div>
              <div
                className="chat-button"
                onClick={this.handleButtonChatSend}
                style={{
                  backgroundColor: appConfig.colors['profile_button_background']
                }}
              >
                <p>OK</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => _pick(state, ['AppConfig']),
  dispatch => bindActionCreators({ ...AppConfigAction }, dispatch)
)(WelcomingChatBot);
