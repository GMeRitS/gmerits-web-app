import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import './style.css';

const lineHeight = 18;

class EditItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: 'Oscar',
      isOpen: false,
      dropDownValue: 'Not Specified',
      textareaValue: '',
      textareaRow: 3
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

  handleResizeTextArea = (e) => {
    const oldRows = e.target.rows;
    e.target.rows = 3;
    const newRows = (e.target.scrollHeight/lineHeight);

    if (newRows === oldRows) {
      e.target.rows = newRows;
    }

    this.setState({
      textareaValue: e.target.value,
      textareaRow: newRows
    });
  };

  render() {
    const {
      editItemIcon,
      dividerLineStyle,
      editGenderVisible,
      editBioTextAreaVisible,
      editUserNameVisible
    } = this.props;

    const { userName, isOpen, dropDownValue, textareaRow, textareaValue } = this.state;

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
              value={textareaValue}
              style={{
                lineHeight: `${lineHeight}px`
              }}
              onChange={this.handleResizeTextArea}
            />
          )}
        </div>
        <div className={`divider-line ${dividerLineStyle}`} />
      </div>
    );
  }
}

export default EditItem;
