import React, { Component } from 'react';
import Switch from 'react-switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import './style.css';

class SettingsItem extends Component {
  constructor(props) {
    super(props);

    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    const { settingsName, buttonVisible, arrowVisible } = this.props;

    return (
      <div className="settings-item-container">
        <div className="settings-item-sub-container">
          <div className="setting-item-name">
            <p>Status</p>
          </div>
          {buttonVisible && <div className="switch-button">
            <label>
              <span>Online</span>
              <Switch onChange={this.handleChange} checked={this.state.checked} />
            </label>
          </div>}
          {arrowVisible && <div className="arrow-right">
            <FontAwesomeIcon className="icon-arrow-right" icon={faChevronRight} />
          </div>}
        </div>
      </div>
    )
  }
}

export default SettingsItem;