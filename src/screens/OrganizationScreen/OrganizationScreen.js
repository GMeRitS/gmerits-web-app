import React, { Component } from 'react';

import './style.css';

import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import organizations from '../../MockData/Organizations';
import IsMobileSize from '../../helpers/MobileDetect';
import users from '../../MockData/Users';
import usersOrganizations from '../../MockData/UsersOrganizations';
import UserListItem from '../../components/UserListItem/UserListItem';
import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';

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
    const { isOnMobileSize, currentOrganization } = this.state;
    if (!currentOrganization) return null;

    return isOnMobileSize ? (
      <div className="organization-container">
        <div className="organization-header">
          <ScreenHeader
            headerBackgroundColor="blue"
            screenHeaderName={currentOrganization.organizationName}
            heartIconVisible={true}
            buttonBackVisible={true}
            sideMenuButtonVisible={false}
            screenHeaderNameVisible={true}
          />
          <div className="organization-sub-header">
            <img src={currentOrganization.organizationImage} alt="" />
            {currentOrganization.organizationDescription && (
              <div className="organization-description">
                <p>{currentOrganization.organizationDescription}</p>
              </div>
            )}
          </div>
        </div>
        <div className="organization-content">
          {this.getUsersWithinOrganization().map((user, id) => (
            <UserListItem
              key={id}
              userName={user.userName}
              userProfileImage={user.userProfileImage}
              userActiveStatus={user.userActiveStatus}
              userBiography={user.userBiography}
              id={user.id}
              onClick={this.handleUserListItemClick}
            />
          ))}
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default OrganizationScreen;
