import React, { Component } from 'react';

import './style.css';

import EditItem from '../EditItem/EditItem';
import iconUser from '../../assets/iconUser.png';
import iconGender from '../../assets/iconGender.png';
import iconEdit from '../../assets/iconEdit.png';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import avatarBoy from '../../assets/img_avatar_boy.png';

class EditProfileContent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAnonymousUser: false
    };
  }

  render() {
    const { isAnonymousUser } = this.state;

    return (
      <div className="edit-profile-container">
        <div className="edit-user-account">
          <div className="edit-profile-header-name">
            <p>ACCOUNT</p>
          </div>
          <EditItem
            editItemIcon={iconUser}
            editItemName="Oscar"
            dividerLineStyle={!isAnonymousUser ? 'cut' : 'full'}
            editBioTextAreaVisible={false}
            editItemNameVisible={true}
          />
          <EditItem
            editItemIcon={iconGender}
            editItemName="Not specified"
            dividerLineStyle="full"
            editBioTextAreaVisible={false}
            editItemNameVisible={true}
          />
          <EditItem
            editItemIcon={iconEdit}
            editItemName=""
            dividerLineStyle="full"
            editBioTextAreaVisible={true}
            editItemNameVisible={false}
            style={ { height: "unset" } }
          />
          <div className="edit-avatar-container">
            <UserAvatar
              userProfileImage={avatarBoy}
              avatarSize="user-image-standard"
              profileImageSize="image-standard"
              activeStatusVisible={false}
            />
            <div className="edit-avatar-label">Edit</div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfileContent;
