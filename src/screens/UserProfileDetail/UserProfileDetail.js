import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import './style.css';
import Linkify from 'react-linkify';

import IsMobileSize from '../../helpers/MobileDetect';
import UserAvatar from '../../components/UserAvatar';
import UserTopic from '../../components/UserTopic';
import users from '../../MockData/Users';
import organizations from '../../MockData/Organizations';
import usersOrganizations from '../../MockData/UsersOrganizations';
import ScreenHeader from '../../components/ScreenHeader';
import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import iconCall from '../../assets/callIcon.png';
import iconChat from '../../assets/ic_chat_button.png';

import UserActions from '../../actions/UserActions';
import AppConfigAction from '../../actions/AppConfigAction';

const MAX_BIOGRAPHY_CHARS_WHEN_COLLAPSED = 132;
const { organization, sameTopicUserListScreen } = RoutePathConstants;

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

    window.scrollTo(0, 0);

    const {
      match: {
        params: { userId }
      }
    } = this.props;

    this.props.getUserDetail(userId);

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
    const {
      User: { userDetail }
    } = this.props;

    return userDetail.biography.length <= MAX_BIOGRAPHY_CHARS_WHEN_COLLAPSED ? (
      <div style={{ height: '20px' }} />
    ) : (
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

  handleVoteButtonClick = topicId => {
    const {
      match: {
        params: { userId }
      },
      User: { userDetail }
    } = this.props;

    !_.isEmpty(userDetail.topics) &&
    userDetail.topics.find(obj => obj.uuid === topicId)['is_endorsed']
      ? this.props.removeEndorseUser(topicId, userId)
      : this.props.endorseUser(topicId, userId);
  };

  handleFavouriteCheck = () => {
    const {
      match: {
        params: { userId }
      },
      User: { userDetail }
    } = this.props;

    !_.isEmpty(userDetail) && userDetail['is_favourite']
      ? this.props.removeFavouriteUser(userId)
      : this.props.favouriteUser(userId);
  };

  handleTopicClick = id => {
    history.push(`/${sameTopicUserListScreen}/${id}`);
  };

  render() {
    const { shouldUserBiographyCollapse } = this.state;
    const {
      User: { userDetail },
      AppConfig: { appConfig }
    } = this.props;

    if (_.isEmpty(userDetail) && _.isEmpty(appConfig)) return null;

    return (
      <div className="profile-container">
        <ScreenHeader
          onFavouriteCheck={this.handleFavouriteCheck}
          heartIconVisible={true}
          isFavouriteIcon={userDetail['is_favourite']}
          buttonBackVisible={true}
          sideMenuButtonVisible={false}
          backgroundHeaderColor={appConfig.colors['default_gradient_top']}
        />
        <div className="profile-sub-container">
          <div
            className="profile-header"
            style={{
              backgroundImage: `linear-gradient(${
                appConfig.colors['default_gradient_top']
              }, ${appConfig.colors['default_gradient_bottom']})`
            }}
          >
            <div className="user-detail-profile">
              <div className="user-detail-avatar">
                <UserAvatar
                  userProfileImage={userDetail['image_url']}
                  isImageUrlAvailable={userDetail['image_url']}
                  userActiveStatus={userDetail.online}
                  avatarSize="user-image-detail"
                  profileImageSize="image-detail"
                  activeStatusSize="active-status-detail"
                  activeStatusVisible={true}
                  statusOnline="rgb(126, 211, 33)"
                  statusOffline="rgb(195, 195, 197)"
                />
              </div>
              <div className="user-detail-name">{userDetail.username}</div>
            </div>
            <div className="contact-section">
              <div className="icons-container">
                <div
                  className="icon-contact call-button"
                  style={{
                    backgroundColor:
                      appConfig.colors['profile_button_background']
                  }}
                >
                  <img src={iconCall} className="icon-call" alt="" />
                </div>
                <div
                  className="icon-contact chat-button"
                  style={{
                    backgroundColor:
                      appConfig.colors['profile_button_background']
                  }}
                >
                  <img src={iconChat} className="icon-chat" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="profile-content">
            {!_.isEmpty(userDetail.organizations) && (
              <div className="user-organization-container">
                <div className="user-organization">
                  {userDetail.organizations.map((organization, id) => (
                    <div
                      key={id}
                      id={organization.uuid}
                      onClick={() =>
                        this.handleOrganizationOnClick(organization.uuid)
                      }
                    >
                      {organization.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="user-detail-biography">
              <div className="profession-tag">{userDetail.profession}</div>
              <p className="biography">
                {userDetail.biography && (
                  <Linkify properties={{ target: '_blank' }}>
                    {shouldUserBiographyCollapse
                      ? userDetail.biography.length <
                        MAX_BIOGRAPHY_CHARS_WHEN_COLLAPSED
                        ? userDetail.biography
                        : `${userDetail.biography.substring(
                            0,
                            MAX_BIOGRAPHY_CHARS_WHEN_COLLAPSED
                          )}...`
                      : `${userDetail.biography}`}
                  </Linkify>
                )}
              </p>
            </div>
            <div className="topics-container">
              {!_.isEmpty(userDetail.topics) &&
                userDetail.topics.map(topic => (
                  <UserTopic
                    key={topic.uuid}
                    id={topic.uuid}
                    numberOfEndorsement={topic['endorsement_count']}
                    topicName={topic.name}
                    onTopicClick={this.handleTopicClick}
                    onVoted={this.handleVoteButtonClick}
                    voted={topic['is_endorsed']}
                    userTopic={topic}
                    topicEndorseDefaultBackgroundColor={
                      appConfig.colors['topic_default_background']
                    }
                    topicEndorseBackgroundColor={
                      appConfig.colors['topic_endorsed_background']
                    }
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['User', 'AppConfig']),
  dispatch =>
    bindActionCreators({ ...UserActions, ...AppConfigAction }, dispatch)
)(UserProfileDetail);
