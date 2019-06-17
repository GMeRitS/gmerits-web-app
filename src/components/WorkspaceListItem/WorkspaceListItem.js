import React from 'react';

import './style.css';

const WorkspaceListItem = ({ workspaceItemIcon, workspaceItemName, onWorkspaceClick }) => {
  return (
    <div className="workspace-list-item-container" onClick={onWorkspaceClick}>
      <div className="workspace-item-icon">
        <img src={workspaceItemIcon} alt="" />
      </div>
      <div className="workspace-item-name">
        <p>{workspaceItemName}</p>
      </div>
    </div>
  );
};

export default WorkspaceListItem;
