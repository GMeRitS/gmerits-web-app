import React from 'react';

import './style.css';

const EditScreenHeader = ({
  editScreenHeaderName,
  onClick,
  onSaveButtonClick,
  defaultGradientTop,
  defaultGradientBottom
}) => {
  function isUnsavedAlertVisible() {
    onClick();
  }

  return (
    <div
      className="edit-screen-header-container"
      style={{
        backgroundImage: `linear-gradient(${defaultGradientTop}, ${defaultGradientBottom})`
      }}
    >
      <div className="edit-screen-header-items-container">
        <div
          className="edit-button cancel"
          onClick={() => {
            isUnsavedAlertVisible();
          }}
        >
          <p>Cancel</p>
        </div>
        <div className="edit-screen-header-name">{editScreenHeaderName}</div>
        <div className="edit-button save" onClick={onSaveButtonClick}>
          <p>Save</p>
        </div>
      </div>
    </div>
  );
};

export default EditScreenHeader;
