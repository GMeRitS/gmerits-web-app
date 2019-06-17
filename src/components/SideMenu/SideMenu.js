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
  render() {
    // const {
    //   match: { path }
    // } = this.props;

    return (
      <div className="side-menu-container">
        {/*<Switch>*/}
        {/*  <Route*/}
        {/*    exact*/}
        {/*    path={`${path}`}*/}
        {/*    component={SideMenuNavigationsList}*/}
        {/*  />*/}
        {/*  <Route*/}
        {/*    exact*/}
        {/*    path={`${path}`}*/}
        {/*    component={SideMenuWorkspaceView}*/}
        {/*  />*/}
        {/*</Switch>*/}
        {/*<SideMenuNavigationsList />*/}
        <SideMenuWorkspaceView />
      </div>
    );
  }
}

export default SideMenu;
