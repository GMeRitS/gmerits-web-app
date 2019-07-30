import { combineReducers } from 'redux';

import User from './UserReducer';
import Organization from './OrganizationReducer';
import Schedule from './ScheduleReducer';
import Auth from './AuthReducer';

export default combineReducers({
  User,
  Organization,
  Schedule,
  Auth
});
