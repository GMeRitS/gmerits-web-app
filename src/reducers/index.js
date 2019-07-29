import { combineReducers } from 'redux';

import User from './UserReducer';
import Organization from './OrganizationReducer';
import Schedule from './ScheduleReducer';

export default combineReducers({
  User,
  Organization,
  Schedule
});
