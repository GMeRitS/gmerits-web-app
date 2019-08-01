import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import './style.css';

import EditItem from '../EditItem/EditItem';
import iconUser from '../../assets/iconUser.png';
import iconGender from '../../assets/iconGender.png';
import iconEdit from '../../assets/iconEdit.png';
import UserAvatar from '../../components/UserAvatar';
import AddedTopicItem from '../AddedTopicItem';
import SearchTopicItem from '../SearchTopicItem';
import UserActions from '../../actions/UserActions';

class EditProfileContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAnonymousUser: false,
      value: '',
      topics: [],
      nextId: 0,
      shouldSearchTopicListVisible: false
    };
  }

  handleInputChange = e => {
    this.props.getSearchTopic(e.target.value);
    this.setState({ value: e.target.value });

    if(!_.isEmpty(e.target.value)) {
      this.setState({ shouldSearchTopicListVisible: true })
    } else {
      this.setState({ shouldSearchTopicListVisible: false })
    }
  };

  handleButtonAddTopicClick = topicName => {
    const { topics } = this.state;
    let addedTopicList = topics.slice();

    if (topicName.length > 0) {
      addedTopicList.push({ id: this.state.nextId, addedTopic: topicName });
      this.setState({
        topics: addedTopicList,
        nextId: this.state.nextId + 1,
        value: '',
        shouldSearchTopicListVisible: false
      });
    }
  };

  handleSearchTopicItemClick = (topicId) => {
    console.log(topicId)

  };

  onRemoveTopicClick = id => {
    const { topics } = this.state;

    this.setState({
      topics: topics.filter(topic => topic.id !== id)
    });
  };

  render() {
    const { isAnonymousUser, value, topics, shouldSearchTopicListVisible } = this.state;
    const {
      userInformation,
      userName,
      onUserNameInputChange,
      onUserBiographyInputChange,
      resizeStyle,
      textareaRow,
      userProfileImage,
      onChangeUserProfileImage,
      User: { searchTopicList }
    } = this.props;

    if (_.isEmpty(userInformation) && _.isEmpty(searchTopicList)) return null;

    return (
      <div className="edit-profile-content-container">
        <div className="edit-user-account">
          <div className="edit-profile-header-name">
            <p>ACCOUNT</p>
          </div>
          <EditItem
            editItemIcon={iconUser}
            dividerLineStyle={!isAnonymousUser ? 'cut' : 'full'}
            editBioTextAreaVisible={false}
            editUserNameVisible={true}
            editGenderVisible={false}
            userProfileDetail={userInformation}
            userName={userName}
            onUserNameInputChange={onUserNameInputChange}
          />
          <EditItem
            editItemIcon={iconGender}
            dividerLineStyle="full"
            editBioTextAreaVisible={false}
            editUserNameVisible={false}
            editGenderVisible={true}
            userProfileDetail={userInformation}
          />
          <EditItem
            editItemIcon={iconEdit}
            editItemName=""
            dividerLineStyle="full"
            editBioTextAreaVisible={true}
            editUserNameVisible={false}
            editGenderVisible={false}
            userProfileDetail={userInformation}
            onUserBiographyInputChange={onUserBiographyInputChange}
            resizeStyle={resizeStyle}
            textareaRow={textareaRow}
          />
          {!isAnonymousUser && (
            <div className="edit-avatar-container">
              <UserAvatar
                userProfileImage={userProfileImage}
                isImageUrlAvailable={userProfileImage}
                avatarSize="user-image-standard"
                profileImageSize="image-standard"
                activeStatusVisible={false}
              />
              <div className="edit-image-container">
                <label htmlFor="files" className="edit-avatar-label">
                  Edit
                </label>
                <input
                  id="files"
                  type="file"
                  onChange={onChangeUserProfileImage}
                />
              </div>
            </div>
          )}

          {!isAnonymousUser && (
            <div className="add-edit-topic-section">
              <div className="add-edit-topic-label">TOPICS I KNOW ABOUT</div>
              <InputGroup className="add-topic-container">
                <InputGroupAddon
                  className="input-group-addon"
                  addonType="prepend"
                >
                  <Button
                    className="add-topic-button"
                    onClick={() => this.handleButtonAddTopicClick(value)}
                  >
                    +
                  </Button>
                </InputGroupAddon>
                <Input
                  type="text"
                  className="add-topic-input"
                  value={value}
                  onChange={this.handleInputChange}
                  placeholder="Start writing..."
                />
              </InputGroup>
              {shouldSearchTopicListVisible &&
                <div className="search-topic-list">
                  {!_.isEmpty(searchTopicList) &&
                  searchTopicList.map((topic, id) => (
                    <SearchTopicItem
                      key={id}
                      searchTopicName={topic.name}
                      id={topic.id}
                      onClick={this.handleSearchTopicItemClick}
                    />
                  ))}
                </div>
              }
              {topics.map((topic, id) => (
                <AddedTopicItem
                  key={id}
                  topicName={topic.addedTopic}
                  id={topic.id}
                  onRemoveClick={this.onRemoveTopicClick}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => _.pick(state, ['User']),
  dispatch => bindActionCreators({ ...UserActions }, dispatch)
)(EditProfileContent);
