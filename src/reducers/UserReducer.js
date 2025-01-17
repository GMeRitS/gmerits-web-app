import createReducer from '../lib/utils/CreateReducer';
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
  SEARCH_TOPIC,
  SELECTED_SORT_OPTION,
  UPDATE_EDITED_USER_PROFILE,
  UPLOAD_PROFILE_IMAGE
} = UserConstants;

export const getInitialState = () => ({
  loading: false,
  errors: {},
  userList: {},
  filteredUserList: {},
  userDetail: {},
  myDetail: {},
  favouriteUserList: {},
  recommendationList: {},
  searchInput: '',
  sameTopicUserList: {},
  userListAfterSortResult: {},
  searchTopicInput: '',
  searchTopicList: {},
  selectedOption: {
    id: 2,
    optionName: 'A - Z',
    highlightIconArrowVisible: true
  },
  myEditedProfileDetail: {}
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
    loading: false,
    filteredUserList
  }),

  [`${FILTER_SEARCH}_FAILURE`]: (state, { payload: errors }) => ({
    loading: false,
    errors
  }),

  [`${SORT_RESULT}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),

  [`${SORT_RESULT}_SUCCESS`]: (
    state,
    { payload: userListAfterSortResult }
  ) => ({
    loading: false,
    userListAfterSortResult
  }),

  [`${SORT_RESULT}_FAILURE`]: (state, { payload: errors }) => ({
    loading: false,
    errors
  }),

  [`${SELECTED_SORT_OPTION}_REQUEST`]: (
    state,
    { payload: { selectedOption } }
  ) => ({
    selectedOption
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

  [`${GET_MY_PROFILE_DETAIL}_SUCCESS`]: (state, { payload: myDetail }) => ({
    myDetail
  }),

  [`${GET_MY_PROFILE_DETAIL}_STOP_LOADING`]: () => ({
    loading: false
  }),

  [`${GET_MY_PROFILE_DETAIL}_FAILURE`]: (state, { payload: errors }) => ({
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
  }),

  [`${GET_SAME_TOPIC_USERS}_REQUEST`]: () => ({
    errors: {}
  }),

  [`${GET_SAME_TOPIC_USERS}_SUCCESS`]: (
    state,
    { payload: sameTopicUserList }
  ) => ({
    loading: false,
    sameTopicUserList
  }),

  [`${GET_SAME_TOPIC_USERS}_FAILURE`]: (state, { payload: errors }) => ({
    loading: false,
    errors
  }),

  [`${SEARCH_TOPIC}_REQUEST`]: (state, { payload: { searchTopicInput } }) => ({
    searchTopicInput
  }),

  [`${SEARCH_TOPIC}_SUCCESS`]: (state, { payload: searchTopicList }) => ({
    searchTopicList
  }),

  [`${SEARCH_TOPIC}_FAILURE`]: (state, { payload: errors }) => ({
    errors
  }),

  [`${UPDATE_EDITED_USER_PROFILE}_REQUEST`]: () => ({
    errors: {}
  }),

  [`${UPDATE_EDITED_USER_PROFILE}_SUCCESS`]: (
    state,
    { payload: myEditedProfileDetail }
  ) => ({
    loading: false,
    myEditedProfileDetail
  }),

  [`${UPDATE_EDITED_USER_PROFILE}_FAILURE`]: (state, { payload: errors }) => ({
    loading: false,
    errors
  }),

  [`${UPLOAD_PROFILE_IMAGE}_REQUEST`]: () => ({
    errors: {}
  }),

  [`${UPLOAD_PROFILE_IMAGE}_SUCCESS`]: () => ({}),

  [`${UPLOAD_PROFILE_IMAGE}_FAILURE`]: (state, { payload: { errors } }) => ({
    errors
  })
});
