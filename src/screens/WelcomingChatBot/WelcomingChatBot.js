import React from 'react';

import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

import './style.css';

import chatbotAvatar from '../../assets/iconAppUnifiedSci.png';
import NextStepButton from '../../components/TriggerNextStep';
import LinkToPage from '../../components/LinkToPage';

const WelcomingChatBot = () => {
  const theme = {
    background: 'rgb(255, 255, 255)',
    headerBgColor: 'linear-gradient(rgb(22, 10, 32), rgb(35, 24, 45))',
    headerFontColor: '#fff',
    headerFontSize: '12px',
    botBubbleColor: 'rgb(236, 236, 236)',
    botFontColor: 'rgb(109, 109, 114)',
    userBubbleColor: 'rgb(223, 220, 235)',
    userFontColor: 'rgb(109, 109, 114)'
  };

  const steps = [
    {
      id: '1',
      message: 'How would you like to be called?',
      trigger: '2'
    },
    {
      id: '2',
      user: true,
      trigger: '3'
    },
    {
      id: '3',
      message: 'welcome :)',
      hideInput: true,
      trigger: 4
    },
    {
      id: '4',
      message:
        'Your nickname is visible in the application only to the people who you call or send massages to.',
      hideInput: true,
      trigger: 5
    },
    {
      id: '5',
      message: 'You can also change your nickname on the settings page.',
      hideInput: true,
      trigger: 6
    },
    {
      id: '6',
      message:
        'You are now ready to start searching for advice and mentors to talk to about the topic you are interested in .',
      hideInput: true,
      trigger: 7
    },
    {
      id: '7',
      component: (
        <NextStepButton />
      ),
      hideInput: true,
      waitAction: true,
      trigger: '8',
    },
    {
      id: '8',
      component: (<LinkToPage/>),
      hideInput: true,
      end: true
    }
  ];

  return (
    <div style={{ height: '100%' }}>
      <ThemeProvider theme={theme}>
        <ChatBot
          steps={steps}
          headerTitle="WELCOME"
          placeholder="Please enter a nickname"
          botDelay={400}
          userDelay={200}
          hideUserAvatar={true}
          submitButtonStyle={{
            backgroundColor: 'rgb(35, 24, 45)',
            color: 'white',
            borderBottomRightRadius: 0
          }}
          avatarStyle={{
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            padding: 0
          }}
          botAvatar={chatbotAvatar}
          footerStyle={{
            position: 'absolute',
            bottom: 0,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%'
          }}
          contentStyle={{ height: '100%' }}
          customDelay={0}
        />
      </ThemeProvider>
    </div>
  );
};

export default WelcomingChatBot;
