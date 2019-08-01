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

class UserListContent extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const {
      User: { userList, filteredUserList },
      searchInput,
      onUserListItemClick,
      onSortResultButtonClick,
      userListAfterSortResult
    } = this.props;

    const renderUserList = _isEmpty(filteredUserList)
      ? _isEmpty(searchInput)
        ? userList
        : filteredUserList
      : filteredUserList;

    const sortedUserList = _isEmpty(userListAfterSortResult) ? renderUserList : userListAfterSortResult;

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
          {!_isEmpty(sortedUserList) &&
          sortedUserList.map((user, id) => (
              <UserListItem
                onClick={onUserListItemClick}
                key={id}
                id={user['uu_id']}
                userProfileImage={user['image_url']}
                userActiveStatus={user.online}
                userName={user.username}
                userBiography={user.biography}
                isMentorUser={user.mentor}
                isImageUrlAvailable={user['image_url']}
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
