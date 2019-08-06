import createReducer from '../lib/utils/CreateReducer';
import AuthConstants from '../constants/AuthConstants';

const { SIGNIN, VALIDATE_MAGIC_LOGIN_TOKEN, SIGNOUT } = AuthConstants;

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
  }),

  [`${VALIDATE_MAGIC_LOGIN_TOKEN}_REQUEST`]: () => ({
    loading: true
  }),

  [`${VALIDATE_MAGIC_LOGIN_TOKEN}_SUCCESS`]: () => ({
    loading: false
  }),

  [`${VALIDATE_MAGIC_LOGIN_TOKEN}_FAILURE`]: (
    state,
    { payload: { errors } }
  ) => ({
    loading: false,
    errors
  }),

  [`${SIGNOUT}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),
  [`${SIGNOUT}_SUCCESS`]: () => ({ loading: false }),
  [`${SIGNOUT}_FAILURE`]: (state, { payload: { errors } }) => ({
  loading: false,
  errors
})
});
