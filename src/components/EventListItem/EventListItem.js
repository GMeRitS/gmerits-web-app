import React from 'react';

import './style.css';

const EventListItem = ({
  eventMonth,
  eventDay,
  eventName,
  onClick,
  id
}) => {
  function handleOnClick() {
    onClick(id)
  }

  return(
    <div className="event-list-item-container" onClick={handleOnClick}>
      <div className="event-date-container">
        <div className="event-date">
          <p className="event-month">{eventMonth}</p>
          <p className="event-day">{eventDay}</p>
        </div>
      </div>
      <div className="event-name">
        <p>{eventName}</p>
      </div>
    </div>
  )
};

export default EventListItem;