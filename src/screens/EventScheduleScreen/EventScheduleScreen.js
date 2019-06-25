import React, { Component } from 'react';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

import './style.css';
import history from '../../history';

import IsMobileSize from '../../helpers/MobileDetect';
import events from '../../MockData/Events';
import EventScheduleTrack from '../../components/EventScheduleTrack/EventScheduleTrack';
import ScheduleTimePanel from '../../components/ScheduleTimePanel/ScheduleTimePanel';
import DayPanel from '../../components/DayScheduleDisplayPanel/DayScheduleDisplayPanel';

import RoutePathConstants from '../../constants/RoutePathConstants';

const { eventDetail } = RoutePathConstants;

class EventScheduleScreen extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isOnMobileSize: IsMobileSize(),
      eventList: events,
      currentEvent: {},
    };
  }

  componentDidMount() {
    this.windowResize();
    window.addEventListener('resize', this.windowResize);
    window.addEventListener('scroll', this.handleScroll);

    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.windowResize);
  }

  windowResize = () => {
    this.setState({ isOnMobileSize: IsMobileSize() });
  };

  handleSessionItemClick = () => {
    history.push(`/${eventDetail}`);
  };

  handleScroll = () => {
    const { isScroll } = this.state;

    this.setState({
      isScroll: isScroll
    });
  };

  render() {
    const { isOnMobileSize } = this.state;

    return isOnMobileSize ? (
      <div className="event-schedule-container">
        <div className="event-schedule-content">
          <DayPanel/>
          <ScrollSync>
            <div>
              <ScrollSyncPane group="one">
                <ScheduleTimePanel/>
              </ScrollSyncPane>
              <ScrollSyncPane group="one">
                <EventScheduleTrack
                  onSessionItemClick={this.handleSessionItemClick}
                  onScroll={this.handleScroll}
                  trackTitle="Main Stage"
                />
              </ScrollSyncPane>
              <ScrollSyncPane group="one">
                <EventScheduleTrack
                  onSessionItemClick={this.handleSessionItemClick}
                  onScroll={this.handleScroll}
                  trackTitle="Creative Stage"
                />
              </ScrollSyncPane>
              <ScrollSyncPane group="one">
                <EventScheduleTrack
                  onSessionItemClick={this.handleSessionItemClick}
                  onScroll={this.handleScroll}
                  trackTitle="Founder Stage"
                />
              </ScrollSyncPane>
              <ScrollSyncPane group="one">
                <EventScheduleTrack
                  onSessionItemClick={this.handleSessionItemClick}
                  onScroll={this.handleScroll}
                  trackTitle="WS 1 Area"
                />
              </ScrollSyncPane>
              <ScrollSyncPane group="one">
                <EventScheduleTrack
                  onSessionItemClick={this.handleSessionItemClick}
                  onScroll={this.handleScroll}
                  trackTitle="WS 2 Area"
                />
              </ScrollSyncPane>
            </div>
          </ScrollSync>
        </div>
      </div>
    ) : (
      <div>Too big screen</div>
    );
  }
}

export default EventScheduleScreen;
