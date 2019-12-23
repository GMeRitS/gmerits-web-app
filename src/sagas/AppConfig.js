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

      if (appConfig.success === false) {
        window.location.assign('https://content.mesensei.com/404/');
      }

      AuthDataStorage.storeAppKey(appConfig.app.appkey);

      yield put({
        type: `${GET_APP_CONFIG}_SUCCESS`,
        payload: appConfig.app
      });
    } catch (errors) {
      yield put({
        type: `${GET_APP_CONFIG}_FAILURE`,
        payload: errors
      });
    }
  });
}
