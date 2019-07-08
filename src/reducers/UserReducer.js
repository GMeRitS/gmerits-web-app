import createReducer from '../lib/utils/CreateReducer';
import UserConstants from '../constants/UserConstants';

const { GET_USER, FILTER_SEARCH, GET_USER_DETAIL } = UserConstants;

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
    loading: true,
    userList
  }),
  [`${GET_USER}_FAILURE`]: (state, { payload: error }) => ({
    loading: true,
    error
  }),
  [`${FILTER_SEARCH}_SUCCESS`]: (state, { payload: filteredUserList }) => ({
    filteredUserList
  }),
  [`${FILTER_SEARCH}_FAILURE`]: (state, { payload: error }) => ({
    error
  }),
  [`${GET_USER_DETAIL}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),
  [`${GET_USER_DETAIL}_SUCCESS`]: (state, { payload: userDetail }) => ({
    loading: true,
    userDetail
  }),
  [`${GET_USER_DETAIL}_FAILURE`]: (state, { payload: error }) => ({
    loading: true,
    error
  })
});
