import RoutePathConstants from '../constants/RoutePathConstants';

const { eventList, eventSchedule } = RoutePathConstants;

export default {
  isEventListPage: path => path === `/${eventList}`,
  isEventSchedulePage: pathname => pathname === `/${eventSchedule}`
};
