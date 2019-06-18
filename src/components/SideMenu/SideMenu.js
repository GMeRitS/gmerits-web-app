import React, { Component } from 'react';

import './style.css';
import history from '../../history';

import SideMenuNavigationsList from '../SideMenuContent/SideMenuNavigationsList/SideMenuNavigationsList';
import SideMenuWorkspaceView from '../SideMenuContent/SideMenuWorkspaceView/SideMenuWorkSpaceView';

import RoutePathConstants from '../../constants/RoutePathConstants';

const { searchNew } = RoutePathConstants;

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
    history.push(`/${searchNew}`);
    window.location.reload();
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
