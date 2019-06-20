import createReducer from '../lib/utils/CreateReducer';
import UserConstants from '../constants/UserConstants';

const { GET_USER, FILTER_SEARCH } = UserConstants;

export const getInitialState = () => ({
  loading: false,
  errors: {},
  userList: {},
  filteredUserList: {}
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
  })
});
