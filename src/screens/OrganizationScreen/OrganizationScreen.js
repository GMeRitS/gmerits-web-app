import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import _isEmpty from 'lodash/isEmpty';

import './style.css';

import ScreenHeader from '../../components/ScreenHeader';
import organizations from '../../MockData/Organizations';
import IsMobileSize from '../../helpers/MobileDetect';
import users from '../../MockData/Users';
import usersOrganizations from '../../MockData/UsersOrganizations';
import UserListItem from '../../components/UserListItem';

import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import OrganizationAction, {
  getOrganizationDetail
} from '../../actions/OrganizationAction';

const { searchNew } = RoutePathConstants;

class OrganizationScreen extends Component {
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
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    window.scrollTo(0, 0);

    const {
      match: {
        params: { organizationId }
      }
    } = this.props;

    this.props.getOrganizationDetail(organizationId);

    const { organizations } = this.state;
    const currentOrganization = organizations.find(
      organization => organization.id.toString() === organizationId
    );

    this.setState({ currentOrganization });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  getUsersWithinOrganization() {
    const { currentOrganization } = this.state;
    const userIds = usersOrganizations
      .filter(
        usersOrganizations =>
          usersOrganizations.organizationId === currentOrganization.id
      )
      .map(usersOrganizations => usersOrganizations.userId);

    return users.filter(user => userIds.includes(user.id));
  }

  handleUserListItemClick = id => {
    history.push(`/${searchNew}/${id}`);
  };

  render() {
    const { isOnMobileSize } = this.state;
    const {
      Organization: { organizationDetail }
    } = this.props;

    if (_isEmpty(organizationDetail)) return null;

    return isOnMobileSize ? (
      <div className="organization-container">
        <div className="organization-header">
          <ScreenHeader
            headerBackgroundColor="purple-gradient"
            screenHeaderName={organizationDetail.name}
            heartIconVisible={true}
            buttonBackVisible={true}
            sideMenuButtonVisible={false}
          />
          <div className="organization-sub-header">
            <img
              src={
                !_isEmpty(organizationDetail.image) &&
                organizationDetail.image.url
              }
              alt=""
            />
            {organizationDetail.description && (
              <div className="organization-description">
                <p>{organizationDetail.description}</p>
              </div>
            )}
          </div>
        </div>
        <div className="organization-content">
          {!_isEmpty(organizationDetail.mentors) &&
            organizationDetail.mentors.map((user, id) => (
              <UserListItem
                key={id}
                userName={user.username}
                userProfileImage={user['image_url']}
                isImageUrlAvailable={user['image_url']}
                userActiveStatus={user.online}
                userBiography={user.biography}
                id={user['uu_id']}
                onClick={this.handleUserListItemClick}
                isMentorUser={user['is_mentor']}
              />
            ))}
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default connect(
  state => _.pick(state, ['Organization']),
  dispatch => bindActionCreators({ ...OrganizationAction }, dispatch)
)(OrganizationScreen);
