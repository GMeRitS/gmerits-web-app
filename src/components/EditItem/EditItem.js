import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import _ from 'lodash';

import './style.css';

class EditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      dropDownValue: 'Not Specified'
    };
  }

  handleInputOnChange = e => {
    this.setState({ userName: e.target.userName });
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleSelectedItemClick = e => {
    this.setState({ dropDownValue: e.currentTarget.textContent });
  };

  render() {
    const {
      editItemIcon,
      dividerLineStyle,
      editGenderVisible,
      editBioTextAreaVisible,
      editUserNameVisible,
      userProfileDetail,
      userName,
      onUserNameInputChange,
      onUserBiographyInputChange,
      resizeStyle,
      textareaRow
    } = this.props;

    const { isOpen, dropDownValue } = this.state;

    // if (_.isEmpty(userProfileDetail)) return null;

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
              onChange={onUserNameInputChange}
              placeholder="Username"
              maxLength={window.innerWidth <= 320 ? '16' : '21'}
            />
          )}
          {editGenderVisible && (
            <ButtonDropdown
              className="edit-gender-button"
              isOpen={isOpen}
              toggle={this.toggle}
            >
              <DropdownToggle className="aaa" size="sm">
                {dropDownValue}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <div onClick={this.handleSelectedItemClick}>
                    Not specified
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div onClick={this.handleSelectedItemClick}>Male</div>
                </DropdownItem>
                <DropdownItem>
                  <div onClick={this.handleSelectedItemClick}>Female</div>
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          )}
          {editBioTextAreaVisible && (
            <textarea
              rows={textareaRow}
              cols="50"
              className="edit-bio-textarea"
              placeholder="Your bio..."
              defaultValue={userProfileDetail.biography}
              style={resizeStyle}
              onChange={onUserBiographyInputChange}
            />
          )}
        </div>
        <div className={`divider-line ${dividerLineStyle}`} />
      </div>
    );
  }
}

export default EditItem;
