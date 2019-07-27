import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import _isEmpty from 'lodash/isEmpty';

import './style.css';

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
import iconChat from '../../assets/chatIcon.png';

import UserActions from '../../actions/UserActions';

const MAX_BIOGRAPHY_CHARS_WHEN_COLLAPSED = 132;
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

    !_isEmpty(userDetail.topics) &&
    userDetail.topics.find(obj => obj.id === topicId)['is_endorsed']
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

    !_isEmpty(userDetail) && userDetail['is_favourite']
      ? this.props.removeFavouriteUser(userId)
      : this.props.favouriteUser(userId);
  };

  render() {
    const { isOnMobileSize, shouldUserBiographyCollapse } = this.state;
    const {
      User: { userDetail }
    } = this.props;

    if (_isEmpty(userDetail)) return null;

    return isOnMobileSize ? (
      <div className="profile-container">
        <ScreenHeader
          headerBackgroundColor="purple-gradient-user-detail"
          onFavouriteCheck={this.handleFavouriteCheck}
          heartIconVisible={true}
          isFavouriteIcon={userDetail['is_favourite']}
          buttonBackVisible={true}
          sideMenuButtonVisible={false}
        />
        <div className="profile-sub-container">
          <div className="profile-header">
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
                />
              </div>
              <div className="user-detail-name">{userDetail.username}</div>
            </div>
            <div className="contact-section">
              <div className="icons-container">
                <div className="icon-contact call-button">
                  <img src={iconCall} className="icon-call" alt="" />
                </div>
                <div className="icon-contact chat-button">
                  <img src={iconChat} className="icon-chat" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="profile-content">
            {!_isEmpty(userDetail.organizations) && (
              <div className="user-organization-container">
                <div className="user-organization">
                  {userDetail.organizations.map((organization, id) => (
                    <div
                      key={id}
                      id={organization['uu_id']}
                      onClick={() =>
                        this.handleOrganizationOnClick(organization['uu_id'])
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
                {shouldUserBiographyCollapse
                  ? userDetail.biography.length <
                    MAX_BIOGRAPHY_CHARS_WHEN_COLLAPSED
                    ? userDetail.biography
                    : `${userDetail.biography.substring(
                        0,
                        MAX_BIOGRAPHY_CHARS_WHEN_COLLAPSED
                      )}...`
                  : `${userDetail.biography}`}
              </p>
              {this.renderShowMoreOrLessButton(shouldUserBiographyCollapse)}
            </div>
            <div className="topics-container">
              {!_isEmpty(userDetail.topics) &&
                userDetail.topics.map(topic => (
                  <UserTopic
                    key={topic.id}
                    id={topic.id}
                    numberOfEndorsement={topic.endorsements}
                    topicName={topic.name}
                    onVoted={this.handleVoteButtonClick}
                    voted={topic['is_endorsed']}
                    userTopic={topic}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div>Too big screen size</div>
    );
  }
}

export default connect(
  state => _.pick(state, ['User']),
  dispatch => bindActionCreators({ ...UserActions }, dispatch)
)(UserProfileDetail);
