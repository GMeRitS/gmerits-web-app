import RoutePathConstants from '../constants/RoutePathConstants';

const { searchNew } = RoutePathConstants;

export default {
  isSearchScreen: pathname => pathname === `/${searchNew}`
};
