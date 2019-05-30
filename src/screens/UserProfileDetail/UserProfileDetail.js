import React, { Component } from 'react';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import UserSkill from '../../components/UserSkill/UserSkill';

import userAvatarWomen from '../../assets/img_avatar_women.png';
import iconCall from '../../assets/iconCall.png';
import iconChat from '../../assets/iconChat.png';
import showMoreIcon from '../../assets/showMoreArrow.png';
import votedIcon from '../../assets/voted.png';
import notVotedIcon from '../../assets/notVoted.png';

const MAX_DESCRIPTION_CHARS_WHEN_COLLAPSED = 132;

class UserProfileDetail extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      user: {
        userProfileImage: userAvatarWomen,
        userActiveStatus: 'active',
        userName: 'Doc Emilia',
        profession: 'postdoc',
        userDescription:
          "I'm RSE Enterprise Fellow in the Biochemistry Department in Cambridge and a GFC Fellow in Innovation & Entrepreneurship at the Worldddd"
      },
      get shouldUserDescriptionCollapse() {
        return (
          this.user.userDescription.length >
          MAX_DESCRIPTION_CHARS_WHEN_COLLAPSED
        );
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
          voteStatus: notVotedIcon
        }
      ]
    };
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
  };

  handleShowMoreContentButtonClick = () => {
    const { shouldUserDescriptionCollapse } = this.state;

    this.setState({
      shouldUserDescriptionCollapse: !shouldUserDescriptionCollapse
    });
  };

  renderShowMoreOrLessButton = isShowMore => {
    return (
      <div
        className="show-more-description"
        onClick={this.handleShowMoreContentButtonClick}
      >
        <p>{isShowMore ? 'SHOW MORE' : 'SHOW LESS'}</p>
        <img src={showMoreIcon} alt="" />
      </div>
    );
  };

  render() {
    const {
      isOnMobileSize,
      shouldUserDescriptionCollapse,
      user: {
        userProfileImage,
        userActiveStatus,
        userName,
        profession,
        userDescription
      },
      userSkills
    } = this.state;

    return isOnMobileSize ? (
      <div className="profile-container">
        <div className="profile-header">
          <div className="user-detail-avatar">
            <UserAvatar
              userProfileImage={userProfileImage}
              userActiveStatus={userActiveStatus}
              avatarSize="user-image-detail"
              profileImageSize="image-detail"
              activeStatusSize="active-status-detail"
            />
          </div>
          <div className="user-detail-name">{userName}</div>
        </div>
        <div className="contact-section">
          <div className="icon-contact icon-call">
            <img src={iconCall} />
          </div>
          <div className="icon-contact icon-chat">
            <img src={iconChat} />
          </div>
        </div>
        <div className="profile-content">
          <div className="user-position-container">
            <div className="user-position">
              <p>
                University <br /> Alumni Network
              </p>
            </div>
          </div>
          <div className="user-detail-description">
            <div className="profession-tag">{profession}</div>
            <p className="description">
              {shouldUserDescriptionCollapse
                ? `${userDescription.substring(
                    0,
                    MAX_DESCRIPTION_CHARS_WHEN_COLLAPSED
                  )}...`
                : `${userDescription}`}
            </p>
            {this.renderShowMoreOrLessButton(shouldUserDescriptionCollapse)}
          </div>
          <div className="skills-container">
            {userSkills.map((skill, id) => (
              <UserSkill
                key={id}
                numberOfVotes={skill.numberOfVotes}
                skill={skill.skill}
                voteStatus={skill.voteStatus}
              />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div>Too big screen size</div>
    );
  }
}

export default UserProfileDetail;
