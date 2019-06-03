import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import UserSkill from '../../components/UserSkill/UserSkill';
import users from '../../MockData/Users';
import iconCall from '../../assets/iconCall.png';
import iconChat from '../../assets/iconChat.png';
import showMoreIcon from '../../assets/showMoreArrow.png';
import backIcon from '../../assets/back_icon.png';
import history from "../../history";
import RoutePathConstants from "../../constants/RoutePathConstants";

const MAX_DESCRIPTION_CHARS_WHEN_COLLAPSED = 132;
const { userSearch } = RoutePathConstants;

class UserProfileDetail extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      currentUser: {},
      userList: users
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    const {
      match: {
        params: { userId }
      }
    } = this.props;
    const { userList } = this.state;
    const currentUser = userList.find(user => user.id.toString() === userId);

    this.setState({ currentUser });
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
        className="show-more-button"
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
      currentUser
    } = this.state;

    if (!currentUser) return null;

    return isOnMobileSize ? (
      <div className="profile-container">
        <div className="profile-header">
          <button
            className="back-button"
            onClick={() => history.push(`/${userSearch}`)}
          >
            <img src={backIcon} alt="" />
          </button>
          <div className="user-detail-avatar">
            <UserAvatar
              userProfileImage={currentUser.userProfileImage}
              userActiveStatus={currentUser.userActiveStatus}
              avatarSize="user-image-detail"
              profileImageSize="image-detail"
              activeStatusSize="active-status-detail"
            />
          </div>
          <div className="user-detail-name">{currentUser.userName}</div>
          <div className="contact-section">
            <div className="icons-container">
              <div className="icon-contact icon-call">
                <img src={iconCall} alt="" />
              </div>
              <div className="icon-contact icon-chat">
                <img src={iconChat} alt="" />
              </div>
            </div>
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
            <div className="profession-tag">{currentUser.profession}</div>
            <p className="description">
              {shouldUserDescriptionCollapse
                ? `${currentUser.userDescription.substring(
                    0,
                    MAX_DESCRIPTION_CHARS_WHEN_COLLAPSED
                  )}...`
                : `${currentUser.userDescription}`}
            </p>
            {this.renderShowMoreOrLessButton(shouldUserDescriptionCollapse)}
          </div>
          <div className="skills-container">
            {!_isEmpty(currentUser.userSkills) &&
              currentUser.userSkills.map((skill, id) => (
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
