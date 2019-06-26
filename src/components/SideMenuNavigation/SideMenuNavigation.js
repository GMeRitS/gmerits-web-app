import React from 'react';

import './style.css';

const SideMenuNavigation = ({
  elementMargin,
  icon,
  navigationName,
  navigationNameStyle,
  onNavigationClick,
  onCloseSideMenuClick
}) => (
  <div
    className={`side-menu-navigation-container ${elementMargin}`}
    onClick={() => {
      onNavigationClick();
      onCloseSideMenuClick();
    }}
  >
    <div className="navigation-icon">
      <img src={icon} alt="" />
    </div>
    <div className={`navigationName ${navigationNameStyle}`}>
      {navigationName}
    </div>
  </div>
);

export default SideMenuNavigation;
