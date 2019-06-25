import React, { Component } from 'react';
import { Tabs, TabLink } from 'react-tabs-redux';

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
    const { slidingHrStyle } = this.state;
    const { dayName } = this.props;

    return (
      <div className="day-schedule-container">
        <Tabs className="day-schedule-sub-container">
          <TabLink
            to={`day-tab-one ${dayName}`}
            className="tab-link"
            onClick={this.handleDayOneTabClick}
          >
            <p>THURSDAY</p>
          </TabLink>
          <TabLink
            to={`day-tab-two ${dayName}`}
            className="tab-link"
            onClick={this.handleDayTwoTabClick}
          >
            <p>FRIDAY</p>
          </TabLink>

          <hr className="sliding-hr" style={slidingHrStyle} />
        </Tabs>
      </div>
    );
  }
}

export default DayScheduleDisplayPanel;
