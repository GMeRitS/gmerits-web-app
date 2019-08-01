import React from 'react';

import './style.css';

import SortOptionsItem from '../../SortOptionsItem';

const SortResult = ({
  sortResultContainerWhenCollapse,
  sortResultOptions,
  onSortResultOptionClick,
  selectedOption
}) => {
  return (
    <div
      className={
        sortResultContainerWhenCollapse
          ? 'sort-result-container-collapse'
          : 'sort-result-container'
      }
    >
      {sortResultOptions.map((option, id) => (
        <SortOptionsItem
          key={id}
          sortOption={option.optionName}
          id={option.id}
          highlightIconArrowVisible={onSortResultOptionClick}
          onClick={onSortResultOptionClick}
          isSelected={selectedOption.id === option.id}
        />
      ))}
    </div>
  )
};

export default SortResult;
