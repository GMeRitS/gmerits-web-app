import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _pick from 'lodash/pick';
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
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import {
  faHeart,
  faChevronDown,
  faChevronUp,
  faPhoneAlt,
  faComments
} from '@fortawesome/free-solid-svg-icons';
import UserActions from "../../actions/UserActions";

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

    window.scrollTo(0, 0);

    const {
      match: {
        params: { userId }
      }
    } = this.props;

    this.props.getUserDetail(userId);

    //const { userList } = this.state;
    //const currentUser = userList.find(user => user.id.toString() === userId);

    //this.setState({ currentUser });
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
    const { User: { userDetail } } = this.props;

    return (
      userDetail.biography.length <= MAX_BIOGRAPHY_CHARS_WHEN_COLLAPSED
      ? <div style={{ height: '20px' }}/>
      :
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
      shouldUserBiographyCollapse
    } = this.state;

    const { User: { userDetail } } = this.props;

    if(_isEmpty(userDetail)) return null;

    return isOnMobileSize ? (
      <div className="profile-container">
        <ScreenHeader
          headerBackgroundColor="purple-gradient-user-detail"
          onFavouriteCheck={this.handleFavouriteCheck}
          heartIconVisible={true}
          buttonBackVisible={true}
          sideMenuButtonVisible={false}
        />
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
                <FontAwesomeIcon className="icon-call" icon={faPhoneAlt} />
              </div>
              <div className="icon-contact chat-button">
                <FontAwesomeIcon className="icon-chat" icon={faComments} />
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
                    id={organization.id}
                    onClick={() =>
                      this.handleOrganizationOnClick(organization.id)
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
                ? userDetail.biography.length < MAX_BIOGRAPHY_CHARS_WHEN_COLLAPSED
                  ? userDetail.biography:
                  `${userDetail.biography.substring(
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
                  //voted={topic.voters.includes(USER_ID)}
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

export default connect(
  state => _pick(state, ['User']),
  dispatch => bindActionCreators({ ...UserActions }, dispatch)
)(UserProfileDetail);
