import React, { Component } from 'react';

import './style.css';

import SideMenuNavigationsList from '../SideMenuContent/SideMenuNavigationsList/SideMenuNavigationsList';
import SideMenuWorkspaceView from '../SideMenuContent/SideMenuWorkspaceView/SideMenuWorkSpaceView';

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: ''
    };
  }

  handleSwitchWorkspaceIconClick = () => {
    this.setState({ view: 'sideMenuWorkSpaceView' });
  };

  handleWorkSpaceClick = () => {
    this.setState({ view: 'sideMenuNavigationList' });
  };

  render() {
    const { view } = this.state;

    return (
      <div className="side-menu-container">
        {view !== 'sideMenuWorkSpaceView' ? (
          <SideMenuNavigationsList
            onSwitchWorkspaceClick={this.handleSwitchWorkspaceIconClick}
          />
        ) : (
          <SideMenuWorkspaceView
            onWorkSpaceItemCLick={this.handleWorkSpaceClick}
          />
        )}
      </div>
    );
  }
}

export default SideMenu;
