import React from 'react';

import './style.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SortOptionsItem = ({
  highlightIconArrowVisible,
  sortOption,
  onClick,
  id,
  isSelected,
  highLightBoxColor,
  highLightBoxBorderColor
}) => {
  function handleOnClick() {
    onClick(id);
  }

  return (
    <div>
      <div
        className="sort-options-item-container"
        onClick={() => {
          handleOnClick();
        }}
      >
        <div className="sort-options-item-sub-container">
          <div
            className={
              isSelected
                ? 'chosen-sort-result-option-highlight'
                : 'highlight-box'
            }
            style={{ backgroundColor: isSelected ? highLightBoxColor : '', border: `1.5pt solid ${isSelected ? highLightBoxBorderColor : 'rgb(195, 195, 188)'}`}}
          >
            {highlightIconArrowVisible && (
              <FontAwesomeIcon
                className="icon-arrow-down-highlight-box"
                icon={faChevronDown}
              />
            )}
          </div>
          <div className="sort-options">
            <p>{sortOption}</p>
          </div>
        </div>
      </div>
      <span className="separation-line-sort-result" />
    </div>
  );
};

export default SortOptionsItem;
