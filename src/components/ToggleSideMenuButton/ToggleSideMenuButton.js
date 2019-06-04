import React from 'react';

import './style.css';

const ToggleSideMenuButton = props => (
  <button className="menuToggle" onClick={props.click}>
    <span />
    <span />
    <span />
  </button>
);

export default ToggleSideMenuButton;