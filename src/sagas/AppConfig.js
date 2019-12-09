import { takeEvery, put, call } from 'redux-saga/effects';

import AppConfigConstants from '../constants/AppConfigConstants';
import AppConfigRepository from '../repositories/AppConfigRepository';

const { GET_APP_CONFIG } = AppConfigConstants;

export function* watchGetAppConfig() {
  yield takeEvery(`${GET_APP_CONFIG}_REQUEST`, function*({
    payload: { appIdentifier }
  }) {
    try {
      const appConfig = yield call(
        AppConfigRepository.getAppConfig,
        appIdentifier
      );
      console.log(appConfig);

      yield put({
        type: `${GET_APP_CONFIG}_SUCCESS`,
        payload: appConfig
      });
    } catch (errors) {
      yield put({
        type: `${GET_APP_CONFIG}_FAILURE`,
        payload: errors
      });
    }
  });
}
