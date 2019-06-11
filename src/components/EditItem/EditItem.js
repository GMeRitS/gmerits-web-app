import React from 'react';

import './style.css';

const EditItem = ({
  editItemIcon,
  editItemName,
  dividerLineStyle,
  editItemNameVisible,
  editBioTextAreaVisible
}) => (
  <div className="edit-item-container">
    <div className="edit-item-sub-container">
      <div className="icon-edit-screen">
        <img src={editItemIcon} alt="" />
      </div>
      {editItemNameVisible && (
        <div className="edit-item-name">{editItemName}</div>
      )}
      {editBioTextAreaVisible && (
        <textarea
          rows="4"
          cols="50"
          className="edit-bio-textarea"
          placeholder="Your bio (1500 characters)"
        />
      )}
    </div>
    <div className={`divider-line ${dividerLineStyle}`} />
  </div>
);

export default EditItem;
