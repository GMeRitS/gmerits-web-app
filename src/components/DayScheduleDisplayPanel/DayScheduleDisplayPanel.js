import React, { Component } from 'react';
import { Tabs, TabLink } from 'react-tabs-redux';
import _ from 'lodash';

import './style.css';

import history from '../../history';
import RoutePathConstants from '../../constants/RoutePathConstants';

const { searchNew } = RoutePathConstants;

class DayScheduleDisplayPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slidingHrStyle: {}
    };
  }

  handleDayOneTabClick = () => {
    this.setState({ slidingHrStyle: { marginLeft: '0' } });
  };

  handleDayTwoTabClick = () => {
    this.setState({ slidingHrStyle: { marginLeft: '50%' } });
  };

  handleUserListItemClick = id => {
    history.push(`/${searchNew}/${id}`);
  };

  render() {
    const { scheduleDetail } = this.props;

    if(_.isEmpty(scheduleDetail)) return null;

    return (
      <div className="day-schedule-container">
        <Tabs
          className="day-schedule-sub-container"
          activeLinkStyle={ { borderBottom: '5px solid #333', transition: '.3s ease-in-out' } }
        >
          {scheduleDetail.days && scheduleDetail.days.map((day, id) => (
            <TabLink
              key={id}
              to={`tab${id}`}
              className="tab-link"
            >
              <p>{day['day_name']}</p>
            </TabLink>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default DayScheduleDisplayPanel;
