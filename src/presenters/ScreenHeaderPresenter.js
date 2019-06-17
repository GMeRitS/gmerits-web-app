import RoutePathConstants from '../constants/RoutePathConstants';

const { eventList, workspace } = RoutePathConstants;

export default {
  isEventListPage: pathname => pathname === `/${eventList}`,
  isWorkspaceView: pathname => pathname === `/${workspace}`
};
