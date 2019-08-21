import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _pick from 'lodash/pick';
import _isEmpty from 'lodash/isEmpty';

import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import UserListItem from '../../UserListItem/UserListItem';
import UserActions from '../../../actions/UserActions';
import history from '../../../history';
import RoutePathConstants from '../../../constants/RoutePathConstants';
import LocalStorage from '../../../lib/LocalStorage';

const { searchNew, organization } = RoutePathConstants;

class UserListContent extends Component {
  componentDidMount() {
    if (!LocalStorage.get('apikey')) {
    } else {
      this.props.getUser();
    }
  }

  handleUserListItemClick = (id, isUser) => {
    switch (isUser) {
      case '1':
        return history.push(`/${organization}/${id}`);
      case '2':
        return this.props.getSameTopicUsers(id);
      case '3':
        return history.push(`/${searchNew}/${id}`);
      default:
        history.push(`/${searchNew}/${id}`);
    }
  };

  render() {
    const {
      User: { userList, filteredUserList, sameTopicUserList },
      searchInput,
      onSortResultButtonClick,
      userListAfterSortResult
    } = this.props;

    const renderUserList = _isEmpty(filteredUserList)
      ? _isEmpty(searchInput)
        ? _isEmpty(userListAfterSortResult)
          ? userList
          : userListAfterSortResult
        : filteredUserList
      : filteredUserList;

    const userListWithSameTopicSearch = _isEmpty(sameTopicUserList)
      ? renderUserList
      : _isEmpty(searchInput)
      ? renderUserList
      : sameTopicUserList;

    return (
      <div>
        <div className="sort-results" onClick={onSortResultButtonClick}>
          <span>SORT RESULTS</span>
          <div className="icon-sort-result-container">
            <FontAwesomeIcon
              className="icon-sort-result"
              icon={faChevronDown}
            />
          </div>
        </div>
        <div className="user-list">
          {!_isEmpty(userListWithSameTopicSearch) &&
            userListWithSameTopicSearch.map((user, id) => (
              <UserListItem
                onClick={this.handleUserListItemClick}
                key={id}
                id={user['uu_id']}
                userProfileImage={user['image_url']}
                userActiveStatus={user.online}
                userName={!user.username ? user.title : user.username}
                userBiography={!user.biography ? user.subtitle : user.biography}
                isMentorUser={user.mentor}
                isImageUrlAvailable={user['image_url']}
                isUser={user.type}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default connect(
  state => _pick(state, ['User']),
  dispatch => bindActionCreators({ ...UserActions }, dispatch)
)(UserListContent);
