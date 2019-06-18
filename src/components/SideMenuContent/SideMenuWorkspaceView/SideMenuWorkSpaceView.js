import React, { Component } from 'react';

import './style.css';

import WorkspaceListItem from '../../../components/WorkspaceListItem/WorkspaceListItem';

import newCoHelsinkiAppIcon from '../../../assets/iconAppNewCoHel.png';
import shipAppIcon from '../../../assets/iconAppShip.png';
import unifiedScience from '../../../assets/iconAppUnifiedSci.png';

class SideMenuWorkSpaceView extends Component {
  render() {
    const { onWorkSpaceItemCLick, workspaceId } = this.props;

    return (
      <div className="workspace-side-menu-content">
        <WorkspaceListItem
          workspaceItemIcon={unifiedScience}
          workspaceItemName="UNIFIED SCIENCE"
          id={workspaceId}
          onWorkspaceClick={onWorkSpaceItemCLick}
        />
        <WorkspaceListItem
          workspaceItemIcon={shipAppIcon}
          workspaceItemName="*SHIP"
          id={workspaceId}
          onWorkspaceClick={onWorkSpaceItemCLick}
        />
        <WorkspaceListItem
          workspaceItemIcon={newCoHelsinkiAppIcon}
          workspaceItemName="NEWCO HELSINKI"
          id={workspaceId}
          onWorkspaceClick={onWorkSpaceItemCLick}
        />
      </div>
    );
  }
}

export default SideMenuWorkSpaceView;
