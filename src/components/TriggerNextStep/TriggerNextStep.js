import React from 'react';

import './style.css';

const TriggerNextStep = (
  onButtonClick
) => {
  function onStartSearchingButtonClick() {
    onButtonClick()
  }
  return (
    <div className="start-searching-button" onClick={onStartSearchingButtonClick}>OK, START SEARCHING</div>
  )
};

export default TriggerNextStep;