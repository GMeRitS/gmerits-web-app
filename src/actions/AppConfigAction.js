import AppConfigConstants from '../constants/AppConfigConstants';

const { GET_APP_CONFIG } = AppConfigConstants;

export const getAppConfig = appIdentifier => ({
  type: `${GET_APP_CONFIG}_REQUEST`,
  payload: { appIdentifier }
});

export default {
  getAppConfig
};
