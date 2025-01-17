import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserActions from '../../actions/UserActions';
import _ from 'lodash';

import ScreenHeader from '../../components/ScreenHeader';
import UserListItem from '../../components/UserListItem';
import DefaultScreen from '../../components/DefaultScreen';
import RoutePathConstants from '../../constants/RoutePathConstants';
import history from '../../history';

const { search } = RoutePathConstants;

class SameTopicUserListScreen extends Component {
  componentDidMount() {
    const {
      match: {
        params: { topicId }
      }
    } = this.props;

    this.props.getSameTopicUsers(topicId);
  }

  handleUserListItemClick = id => {
    history.push(`/${search}/${id}`);
  };

  render() {
    const {
      User: { sameTopicUserList }
    } = this.props;

    if (_.isEmpty(sameTopicUserList))
      return (
        <ScreenHeader
          defaultGradientTop="rgb(22, 10, 32)"
          defaultGradientBottom="rgb(35, 24, 45)"
          buttonBackVisible={true}
        />
      );

    return (
      <DefaultScreen
        backButtonVisible={true}
        screenContent={
          sameTopicUserList &&
          sameTopicUserList.map((user, id) => (
            <UserListItem
              onClick={this.handleUserListItemClick}
              key={id}
              id={user['uu_id']}
              userProfileImage={user['image_url']}
              userActiveStatus={user.online}
              userName={user.username}
              userBiography={user.biography}
              isMentorUser={user.mentor}
              isImageUrlAvailable={user['image_url']}
            />
          ))
        }
      />
    );
  }
}

export default connect(
  state => _.pick(state, ['User']),
  dispatch => bindActionCreators({ ...UserActions }, dispatch)
)(SameTopicUserListScreen);
