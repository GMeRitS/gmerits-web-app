import createReducer from '../lib/utils/CreateReducer';
import AppConfigConstants from '../constants/AppConfigConstants';

const { GET_APP_CONFIG } = AppConfigConstants;

export const getInitialState = () => ({
  loading: false,
  errors: {},
  appConfig: {}
});

export default createReducer(getInitialState, {
  [`${GET_APP_CONFIG}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),
  [`${GET_APP_CONFIG}_SUCCESS`]: (state, { payload: appConfig }) => ({
    loading: false,
    appConfig
  }),
  [`${GET_APP_CONFIG}_FAILURE`]: (state, { payload: errors }) => ({
    loading: false,
    errors
  })
});
