import UserConstants from '../constants/UserConstants';

const {
  GET_USER,
  FILTER_SEARCH,
  GET_USER_DETAIL,
  GET_MY_PROFILE_DETAIL,
  ENDORSE_USER,
  REMOVE_ENDORSE_USER,
  FAVOURITE_USER,
  REMOVE_FAVOURITE_USER,
  GET_FAVOURITE_USERS,
  GET_MATCH_RECOMMENDATION,
  GET_SAME_TOPIC_USERS,
  SORT_RESULT,
  SEARCH_TOPIC
} = UserConstants;

export const getUser = () => ({
  type: `${GET_USER}_REQUEST`
});

export const filterSearch = searchInput => ({
  type: `${FILTER_SEARCH}_REQUEST`,
  payload: { searchInput }
});

export const sortResult = id => ({
  type: `${SORT_RESULT}_REQUEST`,
  payload: { id }
});

export const getUserDetail = userId => ({
  type: `${GET_USER_DETAIL}_REQUEST`,
  payload: { userId }
});

export const getMyProfileDetail = userId => ({
  type: `${GET_MY_PROFILE_DETAIL}_REQUEST`,
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

export const getSameTopicUsers = topicId => ({
  type: `${GET_SAME_TOPIC_USERS}_REQUEST`,
  payload: { topicId }
});

export const getSearchTopic = topicSearchInput => ({
  type: `${SEARCH_TOPIC}_REQUEST`,
  payload: { topicSearchInput }
});

export default {
  getUser,
  filterSearch,
  sortResult,
  getUserDetail,
  getMyProfileDetail,
  endorseUser,
  removeEndorseUser,
  favouriteUser,
  removeFavouriteUser,
  getFavouriteUsers,
  getMatchRecommendations,
  getSameTopicUsers,
  getSearchTopic
};
