import React from 'react';

import './style.css';

const EditScreenHeader = ({
  editScreenHeaderBackgroundColor,
  editScreenHeaderName,
  onClick
}) => {
  function isUnsavedAlertVisible() {
    onClick();
  }

  return (
    <div
      className={`edit-screen-header-container ${editScreenHeaderBackgroundColor}`}
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
        <div className="edit-button save">
          <p>Save</p>
        </div>
      </div>
    </div>
  );
};

export default EditScreenHeader;
