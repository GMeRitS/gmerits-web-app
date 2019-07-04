import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';

import './style.css';

import EditItem from '../EditItem/EditItem';
import iconUser from '../../assets/iconUser.png';
import iconGender from '../../assets/iconGender.png';
import iconEdit from '../../assets/iconEdit.png';
import UserAvatar from '../../components/UserAvatar';
import avatarBoy from '../../assets/img_avatar_boy.png';
import AddedTopicItem from '../AddedTopicItem';

class EditProfileContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAnonymousUser: false,
      value: '',
      topics: [],
      nextId: 0
    };
  }

  handleInputChange = e => {
    this.setState({ value: e.target.value });
  };

  handleButtonAddTopicClick = topicName => {
    const { topics } = this.state;
    let addedTopicList = topics.slice();

    if (topicName.length > 0) {
      addedTopicList.push({ id: this.state.nextId, addedTopic: topicName });
      this.setState({
        topics: addedTopicList,
        nextId: this.state.nextId + 1,
        value: ''
      });
    }
  };

  onRemoveTopicClick = id => {
    const { topics } = this.state;

    this.setState({
      topics: topics.filter(topic => topic.id !== id)
    });
  };

  render() {
    const { isAnonymousUser, value, topics } = this.state;

    return (
      <div className="edit-profile-container">
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
          />
          <EditItem
            editItemIcon={iconGender}
            dividerLineStyle="full"
            editBioTextAreaVisible={false}
            editUserNameVisible={false}
            editGenderVisible={true}
          />
          <EditItem
            editItemIcon={iconEdit}
            editItemName=""
            dividerLineStyle="full"
            editBioTextAreaVisible={true}
            editUserNameVisible={false}
            editGenderVisible={false}
          />
          {!isAnonymousUser && (
            <div className="edit-avatar-container">
              <UserAvatar
                userProfileImage={avatarBoy}
                avatarSize="user-image-standard"
                profileImageSize="image-standard"
                activeStatusVisible={false}
              />
              <div className="edit-image-container">
                <label htmlFor="files" className="edit-avatar-label">Edit</label>
                <input id="files" type="file" />
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

export default EditProfileContent;
