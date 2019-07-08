import { combineReducers } from 'redux';

import User from './UserReducer';
import Organization from './OrganizationReducer';

export default combineReducers({
  User,
  Organization
});
