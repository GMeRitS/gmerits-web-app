import React, { Component } from 'react';

import './style.css';

import IsMobileSize from '../../helpers/MobileDetect';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';
import EventListItem from '../../components/EventListItem/EventListItem';

class EventsListScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      events: [
        {
          id: 1,
          eventName: 'Managing People for the First Time',
          eventMonth: 'Jun',
          eventDay: '12'
        },
        {
          id: 2,
          eventName: 'CW Talk: Solving 5G rural connectivity: regulation or innovation?',
          eventMonth: 'Jun',
          eventDay: '12'
        },
        {
          id: 3,
          eventName: 'Our experience: how to apply compliant data management?',
          eventMonth: 'Jun',
          eventDay: '13'
        },
        {
          id: 4,
          eventName: 'Presentation Skills: Advanced',
          eventMonth: 'Jun',
          eventDay: '14'
        },
        {
          id: 5,
          eventName: 'Reactive, Predictive, Prescriptive – Evolving your IIoT',
          eventMonth: 'Jun',
          eventDay: '14'
        },
        {
          id: 6,
          eventName: 'Soft Skills for Tech Leaders Who Think Coaching is a Waste of Time?',
          eventMonth: 'Jun',
          eventDay: '15'
        }
      ]
    }
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);

    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };


  render() {
    const { isOnMobileSize, events } = this.state;
    return isOnMobileSize ? (
      <div className="event-list-container">
        <ScreenHeader
          headerBackgroundColor="blue"
          closeIconVisible={true}
        />
        <div className="event-list">
          {events.map((event, id) => (
            <EventListItem
              key={id}
              eventName={event.eventName}
              eventDay={event.eventDay}
              eventMonth={event.eventMonth}
            />
          ))}
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default EventsListScreen;