import React from 'react';

import './style.css';

const WorkspaceListItem = ({
  workspaceItemIcon,
  workspaceItemName
}) => {
  return (
    <div className="workspace-list-item-container">
      <div className="workspace-item-icon">
        <img src={workspaceItemIcon} />
      </div>
      <div className="workspace-item-name">
        <p>{workspaceItemName}</p>
      </div>
    </div>
  )
};

export default WorkspaceListItem;