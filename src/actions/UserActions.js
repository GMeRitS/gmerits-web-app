import UserConstants from '../constants/UserConstants';

const {
  GET_USER,
  FILTER_SEARCH,
  GET_USER_DETAIL,
  ENDORSE_USER,
  REMOVE_ENDORSE_USER,
  FAVOURITE_USER,
  REMOVE_FAVOURITE_USER,
  GET_FAVOURITE_USERS,
  GET_MATCH_RECOMMENDATION
} = UserConstants;

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

export const favouriteUser = userId => ({
  type: `${FAVOURITE_USER}_REQUEST`,
  payload: { userId }
});

export const removeFavouriteUser = userId => ({
  type: `${REMOVE_FAVOURITE_USER}_REQUEST`,
  payload: { userId }
});

export const getFavouriteUsers = () => ({
  type: `${GET_FAVOURITE_USERS}_REQUEST`
});

export const getMatchRecommendations = () => ({
  type: `${GET_MATCH_RECOMMENDATION}_REQUEST`
});

export default {
  getUser,
  filterSearch,
  getUserDetail,
  endorseUser,
  removeEndorseUser,
  favouriteUser,
  removeFavouriteUser,
  getFavouriteUsers,
  getMatchRecommendations
};
