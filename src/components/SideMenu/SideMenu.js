import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './style.css';

import SideMenuNavigationsList from '../SideMenuContent/SideMenuNavigationsList/SideMenuNavigationsList';
import SideMenuWorkspaceView from '../SideMenuContent/SideMenuWorkspaceView/SideMenuWorkSpaceView';

//import history from '../../history';
// import RoutePathConstants from '../../constants/RoutePathConstants';
// import SideMenuPresenter from '../../presenters/SideMenuPresenter';
//
// const { workspace } = RoutePathConstants;
// const { isWorkspaceView } = SideMenuPresenter;

class SideMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: ''
    }
  }

  handleSwitchWorkspaceIconClick = () => {
    this.setState({view: 'sideMenuWorkSpaceView'})
  };

  handleWorkSpaceClick = () => {
    this.setState({view: 'sideMenuNavigationList'})
  };

  render() {
    const { view } = this.state;

    return (
      <div className="side-menu-container">
        {view !== 'sideMenuWorkSpaceView' ? <SideMenuNavigationsList
          onSwitchWorkspaceClick={this.handleSwitchWorkspaceIconClick}
        /> :
        <SideMenuWorkspaceView onWorkSpaceItemCLick={this.handleWorkSpaceClick} />}
      </div>
    );
  }
}

export default SideMenu;
