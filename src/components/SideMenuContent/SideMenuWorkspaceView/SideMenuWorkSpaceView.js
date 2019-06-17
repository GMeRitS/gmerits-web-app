import React, { Component } from 'react';

import './style.css';

import WorkspaceListItem from '../../../components/WorkspaceListItem/WorkspaceListItem';

import newCoHelsinkiAppIcon from '../../../assets/iconAppNewCoHel.png';
import shipAppIcon from '../../../assets/iconAppShip.png';
import unifiedScience from '../../../assets/iconAppUnifiedSci.png';

class SideMenuWorkSpaceView extends Component {
  render() {
    return (
      <div className="workspace-side-menu-content">
        <WorkspaceListItem
          workspaceItemIcon={unifiedScience}
          workspaceItemName="UNIFIED SCIENCE"
        />
        <WorkspaceListItem
          workspaceItemIcon={shipAppIcon}
          workspaceItemName="*SHIP"
        />
        <WorkspaceListItem
          workspaceItemIcon={newCoHelsinkiAppIcon}
          workspaceItemName="NEWCO HELSINKI"
        />
      </div>
    );
  }
}

export default SideMenuWorkSpaceView;
