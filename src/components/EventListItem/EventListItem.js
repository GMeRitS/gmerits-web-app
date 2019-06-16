import React from 'react';

import './style.css';

const EventListItem = ({
  eventMonth,
  eventDay,
  eventName,
  onClick,
  id,
  isSelected
}) => {
  function handleOnClick() {
    onClick(id);
  }

  return (
    <div className="event-list-item-container" onClick={handleOnClick}>
      <div
        className={`event-date-container ${
          isSelected ? 'chosen-event-list-date-container-highlight' : ''
        }`}
      >
        <div
          className={`event-date ${
            isSelected ? 'chosen-event-list-event-date-highlight' : ''
          }`}
        >
          <p className="event-month">{eventMonth}</p>
          <p className="event-day">{eventDay}</p>
        </div>
      </div>
      <div
        className={`event-name ${
          isSelected ? 'chosen-event-list-name-highlight' : ''
        }`}
      >
        <p>{eventName}</p>
      </div>
    </div>
  );
};

export default EventListItem;
