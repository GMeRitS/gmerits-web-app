import createReducer from '../lib/utils/CreateReducer';
import UserConstants from '../constants/UserConstants';

const { GET_USER, FILTER_SEARCH, GET_USER_DETAIL, ENDORSE_USER, REMOVE_ENDORSE_USER } = UserConstants;

export const getInitialState = () => ({
  loading: false,
  errors: {},
  userList: {},
  filteredUserList: {},
  userDetail: {}
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
    loading: true,
    errors: {}
  }),
  [`${ENDORSE_USER}_FAILURE`]: (state, { payload: { errors } }) => ({
    loading: false,
    errors
  }),
  [`${REMOVE_ENDORSE_USER}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),
  [`${REMOVE_ENDORSE_USER}_SUCCESS`]: () => ({
    loading: false
  }),
  [`${REMOVE_ENDORSE_USER}_FAILURE`]: (state, { payload: { errors } }) => ({
    loading: false,
    errors
  })
});
