import React from 'react';

import './style.css';

const EventListItem = ({

}) => {
  return(
    <div className="event-list-item-container">
      <div className="event-date-container">
        <div className="event-date">JUNE 12</div>
      </div>
      <div className="event-name">
        <p>Managing People for the First Time</p>
      </div>
    </div>
  )
};

export default EventListItem;