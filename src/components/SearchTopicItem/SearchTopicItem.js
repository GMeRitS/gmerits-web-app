import React from 'react';

import './style.css';

const SearchTopicItem = ({
  searchTopicName,
  onClick,
  id
}) => {
  function handleSearchTopicItemClick() {
    onClick(id, searchTopicName)
  }

  return (
    <div className="search-topic" onClick={handleSearchTopicItemClick}>
      <p>{searchTopicName}</p>
    </div>
  )
};

export default SearchTopicItem;