import RoutePathConstants from '../constants/RoutePathConstants';

const { workspace } = RoutePathConstants;

export default {
  isWorkspaceView: pathname => pathname === `/${workspace}`
};
