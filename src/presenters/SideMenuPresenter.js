import RoutePathConstants from '../constants/RoutePathConstants';

const { search } = RoutePathConstants;

export default {
  isSearchScreen: pathname => pathname === `/${search}`
};
