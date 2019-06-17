import React, { Component } from 'react';

import './style.css';

class EditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'Oscar'
    };
  }

  handleInputOnChange = e => {
    this.setState({ userName: e.target.userName });
  };

  render() {
    const {
      editItemIcon,
      editUserGender,
      dividerLineStyle,
      editGenderVisible,
      editBioTextAreaVisible,
      editUserNameVisible
    } = this.props;

    const { userName } = this.state;

    return (
      <div className="edit-item-container">
        <div className="edit-item-sub-container">
          <div className="icon-edit-screen">
            <img src={editItemIcon} alt="" />
          </div>
          {editUserNameVisible && (
            <input
              className="edit-item-name"
              defaultValue={userName}
              type="text"
              onChange={this.handleInputOnChange}
            />
          )}
          {editGenderVisible && (
            <button className="edit-item-name">{editUserGender}</button>
          )}
          {editBioTextAreaVisible && (
            <textarea
              rows="4"
              cols="50"
              className="edit-bio-textarea"
              placeholder="Your bio (1500 characters)"
            />
          )}
        </div>
        <div className={`divider-line ${dividerLineStyle}`} />
      </div>
    );
  }
}

export default EditItem;
