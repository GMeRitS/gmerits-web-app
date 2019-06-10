import React, { Component } from 'react';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

import './style.css';

class SettingsItem extends Component {
  constructor(props) {
    super(props);

    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    const {
      settingName,
      buttonVisible,
      arrowVisible,
      logoutIconVisible,
      switchActiveText,
      switchInactiveText,
      onSettingsItemClick
    } = this.props;
    const { checked } = this.state;

    return (
      <div className="settings-item-container" onClick={onSettingsItemClick}>
        <div className="settings-item-sub-container">
          <div className="setting-item-name">
            <p>{settingName}</p>
          </div>
          {buttonVisible && (
            <div className="switch-button">
              <label>
                <span>{checked ? switchActiveText : switchInactiveText}</span>
                <Switch
                  onChange={this.handleChange}
                  checked={this.state.checked}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor="#7ed321"
                  width={48}
                />
              </label>
            </div>
          )}
          {arrowVisible && (
            <div className="arrow-right">
              <FontAwesomeIcon
                className="icon-arrow-right"
                icon={faChevronRight}
              />
            </div>
          )}
          {logoutIconVisible && (
            <div>
              <FontAwesomeIcon
                className="logout-setting-button"
                icon={faSignOutAlt}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SettingsItem;
