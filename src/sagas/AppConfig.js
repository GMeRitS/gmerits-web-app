import { takeEvery, put, call } from 'redux-saga/effects';

import AppConfigConstants from '../constants/AppConfigConstants';
import AppConfigRepository from '../repositories/AppConfigRepository';
import AuthDataStorage from '../helpers/StorageHelpers/AuthDataStorage';

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
      AuthDataStorage.storeAppKey(appConfig.app.appkey);
      if (!appConfig.success) {
        window.location.assign('https://content.mesensei.com/404/');
      }

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
