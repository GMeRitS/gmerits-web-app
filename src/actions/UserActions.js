import UserConstants from '../constants/UserConstants';

const { GET_USER, FILTER_SEARCH, GET_USER_DETAIL, ENDORSE_USER, REMOVE_ENDORSE_USER } = UserConstants;

export const getUser = () => ({
  type: `${GET_USER}_REQUEST`
});

export const filterSearch = searchInput => ({
  type: `${FILTER_SEARCH}_REQUEST`,
  payload: { searchInput }
});

export const getUserDetail = userId => ({
  type: `${GET_USER_DETAIL}_REQUEST`,
  payload: { userId }
});

export const endorseUser = (topicId, userId) => ({
  type: `${ENDORSE_USER}_REQUEST`,
  payload: { topicId, userId }
});

export const removeEndorseUser = (topicId, userId) => ({
  type: `${REMOVE_ENDORSE_USER}_REQUEST`,
  payload: { topicId, userId }
});

export default {
  getUser,
  filterSearch,
  getUserDetail,
  endorseUser,
  removeEndorseUser
};
