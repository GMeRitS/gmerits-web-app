import RoutePathConstants from '../constants/RoutePathConstants';

const { eventList } = RoutePathConstants;

export default {
  isEventListPage: pathname => pathname === `/${eventList}`
};
