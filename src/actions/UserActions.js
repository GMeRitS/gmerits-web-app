import UserConstants from '../constants/UserConstants';

const { GET_USER, FILTER_SEARCH } = UserConstants;

export const getUser = () => ({
  type: `${GET_USER}_REQUEST`
});

export const filterSearch = searchInput => ({
  type: `${FILTER_SEARCH}_REQUEST`,
  payload: { searchInput }
});

export default {
  getUser,
  filterSearch
};
