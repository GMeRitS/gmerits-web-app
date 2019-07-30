import createReducer from '../lib/utils/CreateReducer';
import AuthConstants from '../constants/AuthConstants';

const { SIGNIN } = AuthConstants;

export const getInitialState = () => ({
  loading: false,
  errors: {}
});

export default createReducer(getInitialState, {
  [`${SIGNIN}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),

  [`${SIGNIN}_SUCCESS`]: () => ({ loading: false }),

  [`${SIGNIN}_FAILURE`]: (state, { payload: { errors } }) => ({
    loading: false,
    errors
  })
});
