import createReducer from '../lib/utils/CreateReducer';
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

export const getInitialState = () => ({
  loading: false,
  errors: {},
  userList: {},
  filteredUserList: {},
  userDetail: {},
  favouriteUserList: {},
  recommendationList: {},
  searchInput: ''
});

export default createReducer(getInitialState, {
  [`${GET_USER}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),

  [`${GET_USER}_SUCCESS`]: (state, { payload: userList }) => ({
    userList
  }),

  [`${GET_USER}_STOP_LOADING`]: () => ({
    loading: false
  }),

  [`${GET_USER}_FAILURE`]: (state, { payload: errors }) => ({
    loading: false,
    errors
  }),

  [`${FILTER_SEARCH}_REQUEST`]: (state, { payload: { searchInput } }) => ({
    searchInput
  }),

  [`${FILTER_SEARCH}_SUCCESS`]: (state, { payload: filteredUserList }) => ({
    filteredUserList
  }),

  [`${FILTER_SEARCH}_FAILURE`]: (state, { payload: errors }) => ({
    errors
  }),

  [`${GET_USER_DETAIL}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),

  [`${GET_USER_DETAIL}_SUCCESS`]: (state, { payload: userDetail }) => ({
    userDetail
  }),

  [`${GET_USER_DETAIL}_STOP_LOADING`]: () => ({
    loading: false
  }),

  [`${GET_USER_DETAIL}_FAILURE`]: (state, { payload: errors }) => ({
    loading: false,
    errors
  }),

  [`${ENDORSE_USER}_REQUEST`]: () => ({
    errors: {}
  }),

  [`${ENDORSE_USER}_FAILURE`]: (state, { payload: { errors } }) => ({
    errors
  }),

  [`${REMOVE_ENDORSE_USER}_REQUEST`]: () => ({
    errors: {}
  }),

  [`${REMOVE_ENDORSE_USER}_SUCCESS`]: () => ({}),

  [`${REMOVE_ENDORSE_USER}_FAILURE`]: (state, { payload: { errors } }) => ({
    errors
  }),

  [`${FAVOURITE_USER}_REQUEST`]: () => ({
    errors: {}
  }),

  [`${FAVOURITE_USER}_FAILURE`]: (state, { payload: { errors } }) => ({
    errors
  }),

  [`${REMOVE_FAVOURITE_USER}_REQUEST`]: () => ({
    errors: {}
  }),

  [`${REMOVE_FAVOURITE_USER}_SUCCESS`]: () => ({}),

  [`${REMOVE_FAVOURITE_USER}_FAILURE`]: (state, { payload: { errors } }) => ({
    errors
  }),

  [`${GET_FAVOURITE_USERS}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),

  [`${GET_FAVOURITE_USERS}_SUCCESS`]: (
    state,
    { payload: favouriteUserList }
  ) => ({
    favouriteUserList
  }),

  [`${GET_FAVOURITE_USERS}_STOP_LOADING`]: () => ({
    loading: false
  }),

  [`${GET_FAVOURITE_USERS}_FAILURE`]: (state, { payload: errors }) => ({
    loading: false,
    errors
  }),

  [`${GET_MATCH_RECOMMENDATION}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),

  [`${GET_MATCH_RECOMMENDATION}_SUCCESS`]: (
    state,
    { payload: recommendationList }
  ) => ({
    recommendationList
  }),

  [`${GET_MATCH_RECOMMENDATION}_STOP_LOADING`]: () => ({
    loading: false
  }),

  [`${GET_MATCH_RECOMMENDATION}_FAILURE`]: (state, { payload: errors }) => ({
    loading: false,
    errors
  })
});
