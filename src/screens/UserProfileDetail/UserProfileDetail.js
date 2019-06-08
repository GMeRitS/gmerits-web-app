import React, { Component } from 'react';
import _isEmpty from 'lodash/isEmpty';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import UserTopic from '../../components/UserTopic/UserTopic';
import users from '../../MockData/Users';
import organizations from '../../MockData/Organizations';
import usersOrganizations from '../../MockData/UsersOrganizations';
import iconCall from '../../assets/iconCall.png';
import iconChat from '../../assets/iconChat.png';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';

const MAX_BIOGRAPHY_CHARS_WHEN_COLLAPSED = 132;
const USER_ID = 9;
const { organization } = RoutePathConstants;

class UserProfileDetail extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      currentUser: {},
      userList: users,
      currentOrganization: {},
      organizations: organizations,
      usersOrganizations: usersOrganizations
    };
  }

  componentDidMount() {
    const { shouldUserBiographyCollapse } = this.state;
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
    this.setState({
      shouldUserBiographyCollapse: !shouldUserBiographyCollapse
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  handleShowMoreContentButtonClick = () => {
    const { shouldUserBiographyCollapse } = this.state;

    this.setState({
      shouldUserBiographyCollapse: !shouldUserBiographyCollapse
    });
  };

  renderShowMoreOrLessButton = isShowMore => {
    return (
      <div
        className="show-more-button"
        onClick={this.handleShowMoreContentButtonClick}
      >
        <p>{isShowMore ? 'SHOW MORE' : 'SHOW LESS'}</p>
        <FontAwesomeIcon
          className="icon-show"
          icon={isShowMore ? faChevronDown : faChevronUp}
        />
      </div>
    );
  };

  handleOrganizationOnClick = id => {
    history.push(`/${organization}/${id}`);
  };

  handleVoteButtonClick = id => {
    const { currentUser } = this.state;
    const modifiedCurrentUser = Object.assign({}, currentUser);
    const modifiedTopic = modifiedCurrentUser.userTopics.find(
      topic => topic.id === id
    );

    if (modifiedTopic.voters.includes(USER_ID)) {
      modifiedTopic.voters = modifiedTopic.voters.filter(
        voter => voter !== USER_ID
      );
    } else {
      modifiedTopic.voters.push(USER_ID);
    }

    this.setState({ currentUser: modifiedCurrentUser });
  };

  getUserOrganizations() {
    const { currentUser } = this.state;
    const organizationIds = usersOrganizations
      .filter(userOrganizations => userOrganizations.userId === currentUser.id)
      .map(usersOrganizations => usersOrganizations.organizationId);

    return organizations.filter(organization =>
      organizationIds.includes(organization.id)
    );
  }

  handleFavouriteCheck = () => {
    const {
      currentUser: { is_favourite }
    } = this.state;
    this.setState({ is_favourite: is_favourite ? faHeart : farHeart });
  };

  render() {
    const {
      isOnMobileSize,
      shouldUserBiographyCollapse,
      currentUser
    } = this.state;

    if (!currentUser) return null;

    return isOnMobileSize ? (
      <div className="profile-container">
        <div className="profile-header">
          <ScreenHeader
            headerBackgroundColor="light-blue"
            onFavouriteCheck={this.handleFavouriteCheck}
            heartIconVisible={true}
          />
          <div className="user-detail-profile">
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
          </div>
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
          {!_isEmpty(this.getUserOrganizations()) && (
            <div className="user-organization-container">
              <div className="user-organization">
                {this.getUserOrganizations().map((organization, id) => (
                  <div
                    key={id}
                    id={organization.id}
                    onClick={() =>
                      this.handleOrganizationOnClick(organization.id)
                    }
                  >
                    {organization.organizationName}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="user-detail-biography">
            <div className="profession-tag">{currentUser.profession}</div>
            <p className="biography">
              {shouldUserBiographyCollapse
                ? `${currentUser.userBiography.substring(
                    0,
                    MAX_BIOGRAPHY_CHARS_WHEN_COLLAPSED
                  )}...`
                : `${currentUser.userBiography}`}
            </p>
            {this.renderShowMoreOrLessButton(shouldUserBiographyCollapse)}
          </div>
          <div className="topics-container">
            {!_isEmpty(currentUser.userTopics) &&
              currentUser.userTopics.map(topic => (
                <UserTopic
                  key={topic.id}
                  id={topic.id}
                  numberOfEndorsement={topic.voters.length}
                  topicName={topic.topicName}
                  onVoted={this.handleVoteButtonClick}
                  voted={topic.voters.includes(USER_ID)}
                  userTopic={topic}
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
