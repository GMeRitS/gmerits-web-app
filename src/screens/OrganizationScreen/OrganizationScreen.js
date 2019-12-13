import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import _isEmpty from 'lodash/isEmpty';

import './style.css';

import ScreenHeader from '../../components/ScreenHeader';
import UserListItem from '../../components/UserListItem';
import defaultUserProfileImage from '../../assets/defaultUserAvatar.png';

import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';
import OrganizationAction from '../../actions/OrganizationAction';

const { search } = RoutePathConstants;

class OrganizationScreen extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    const {
      match: {
        params: { organizationId }
      }
    } = this.props;

    this.props.getOrganizationDetail(organizationId);
  }
  handleUserListItemClick = id => {
    history.push(`/${search}/${id}`);
  };

  render() {
    const {
      Organization: { organizationDetail }
    } = this.props;

    if (_isEmpty(organizationDetail)) return null;
    let organization_description_text = 'rgb(243, 243, 244)';

    return (
      <div className="organization-container">
        <div className="organization-header">
          <ScreenHeader
            defaultGradientTop="rgb(22, 10, 32)"
            defaultGradientBottom="rgb(22, 10, 32)"
            screenHeaderName={organizationDetail.name}
            buttonBackVisible={true}
            sideMenuButtonVisible={false}
          />
          <div className="organization-sub-header">
            <img
              className={
                !_isEmpty(organizationDetail.image) ? '' : 'default-image'
              }
              src={
                !_isEmpty(organizationDetail.image)
                  ? organizationDetail.image.url
                  : defaultUserProfileImage
              }
              alt=""
            />
            {organizationDetail.description && (
              <div className="organization-description">
                <p style={{ color: organization_description_text }}>
                  {organizationDetail.description}
                </p>
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
                userProfileImage={!_.isEmpty(user.image) && user.image.url}
                isImageUrlAvailable={
                  !_.isEmpty(user.image) ? user.image.url : user.image
                }
                userActiveStatus={user.online}
                userBiography={user.biography}
                id={user['uu_id']}
                onClick={this.handleUserListItemClick}
                isMentorUser={user['is_mentor']}
                statusOnline="rgb(126, 211, 33)"
                statusOffline="rgb(195, 195, 197)"
              />
            ))}
        </div>
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['Organization']),
  dispatch => bindActionCreators({ ...OrganizationAction }, dispatch)
)(OrganizationScreen);
