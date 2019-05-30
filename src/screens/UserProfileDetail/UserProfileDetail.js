import React, { Component } from 'react';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import UserSkill from '../../components/UserSkill/UserSkill';

import userAvatarWomen from "../../assets/img_avatar_women.png";
import iconCall from '../../assets/iconCall.png';
import iconChat from '../../assets/iconChat.png';
import showMoreIcon from '../../assets/showMoreArrow.png';
import votedIcon from '../../assets/voted.png';
import notVotedIcon from '../../assets/notVoted.png';

class UserProfileDetail extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      showText: false,
      user: {
        userProfileImage: userAvatarWomen,
        userActiveStatus: 'active',
        userName: 'Doc Emilia',
        profession: 'postdoc',
        userDescription:
          'I\'m RSE Enterprise Fellow in the Biochemistry Department in Cambridge and a GFC Fellow in Innovation & Entrepreneurship at the World'
      },
      userSkills: [
        {
          numberOfVotes: '174',
          skill: 'BioChemistry',
          voteStatus: votedIcon
        },
        {
          numberOfVotes: '154',
          skill: 'Biofuels',
          voteStatus: notVotedIcon
        },
        {
          numberOfVotes: '174',
          skill: 'Industrial-academic',
          voteStatus: notVotedIcon
        },
        {
          numberOfVotes: '174',
          skill: 'Science communication',
          voteStatus: votedIcon
        },
        {
          numberOfVotes: '174',
          skill: 'Entrepreneurship',
          voteStatus: notVotedIcon
        },
        {
          numberOfVotes: '174',
          skill: 'Industrial-academic',
          voteStatus:  notVotedIcon
        },
      ]
    }
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
    console.log(IsMobileSize());
  };

  handleShowMoreContentButtonClick = () => {
    const { user, showText } = this.state;

    if(showText) {
      
    }

    this.setState(
      {
          showText: user.userDescription.length < 130
          ? !showText
          : showText
      });
    console.log(showText);
  };

  render() {
    const { isOnMobileSize, user, userSkills } = this.state;
    // const {
    //   userProfileImage,
    //   userActiveStatus
    // } = this.props;

    return isOnMobileSize ? (
      <div className="profile-container">
        <div className="profile-header">
          <div className="user-detail-avatar">
            <UserAvatar
              userProfileImage={user.userProfileImage}
              userActiveStatus={user.userActiveStatus}
              avatarSize="user-image-detail"
              profileImageSize="image-detail"
              activeStatusSize="active-status-detail"
            />
          </div>
          <div className="user-detail-name">{user.userName}</div>
        </div>
        <div className="contact-section">
          <div className="icon-contact icon-call">
            <img src={iconCall}/>
          </div>
          <div className="icon-contact icon-chat">
            <img src={iconChat}/>
          </div>
        </div>
        <div className="profile-content">
          <div className="user-position-container">
            <div className="user-position">
              <p>University <br/> Alumni Network</p>
            </div>
          </div>
          <div className="user-detail-description">
            <div className="profession-tag">{user.profession}</div>
            <p className="description">
              {user.userDescription.length < 130
              ? `${user.userDescription}`
              : `${user.userDescription.substring(0, 135)} ...`}
            </p>
            <div className="show-more-description" onClick={this.handleShowMoreContentButtonClick}>
              <p>show more</p>
              <img src={showMoreIcon}/>
            </div>
          </div>
          <div className="skills-container">
            {userSkills.map((skill, id) => (
              <UserSkill
                key={id}
                numberOfVotes={skill.numberOfVotes}
                skill={skill.skill}
                voteStatus={skill.voteStatus}
            />))}
          </div>
        </div>
      </div>
    ) : (
      <div>Too big screen size</div>
    )
  }
}

export default UserProfileDetail;

