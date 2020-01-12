import { takeEvery, put, call } from 'redux-saga/effects';

import _ from 'lodash';
import history from '../history';
import AuthConstants from '../constants/AuthConstants';
import AuthRepository from '../repositories/AuthRepository';
import SigninValidation from '../lib/validators/SigninValidation';
import UserConstants from '../constants/UserConstants';
import RoutePathConstants from '../constants/RoutePathConstants';
import AuthDataStorage from '../helpers/StorageHelpers/AuthDataStorage';
import UserInfoStorage from '../helpers/StorageHelpers/UserInfoStorage';

const {
  SIGNIN,
  VALIDATE_LOGIN_DATA,
  VALIDATE_MAGIC_LOGIN_TOKEN,
  Invalid_login_token_error_code,
  SIGNOUT
} = AuthConstants;
const { GET_MY_PROFILE_DETAIL } = UserConstants;
const { search, startScreen } = RoutePathConstants;

export function* watchSignin() {
  yield takeEvery(`${SIGNIN}_REQUEST`, function*({ payload: { email } }) {
    try {
      const validationErrors = SigninValidation.validate({ email });
      if (!_.isEmpty(validationErrors)) throw validationErrors;

      yield call(AuthRepository.signin, email);
      yield call(login);
    } catch (errors) {
      yield put({
        type: `${SIGNIN}_FAILURE`,
        payload: { errors }
      });
    }
  });
}

function* login() {
  yield put({
    type: `${SIGNIN}_SUCCESS`
  });
}

export function* watchValidateLoginData() {
  yield takeEvery(`${VALIDATE_LOGIN_DATA}_REQUEST`, function*({
    payload: { loginData, appId }
  }) {
    try {
      if (!AuthDataStorage.getDeviceId()) {
        AuthDataStorage.storeDeviceId(loginData['pseudo_user_identifier']);
      }
      const response = yield call(AuthRepository.validateLoginData, loginData);
      if (
        !AuthDataStorage.isAuthDataAvailable(appId) &&
        _.isEmpty(AuthDataStorage.getUserAuthentication())
      ) {
        AuthDataStorage.storeApiKey(response.user.apikey);
        AuthDataStorage.storeUuid(response.user.uuid);
        AuthDataStorage.storeAuthentication(response.user.accepted);
      }

      if (!response.success) {
        yield put({
          type: 'DISPLAY_ALERT',
          payload: {
            alertOptions: {
              alertText:
                'It seems that the link you used is invalid or already used. Please try signing in again.',
              leftOption: 'OK',
              leftOptionVisible: true
            }
          }
        });

        if (AuthDataStorage.isAuthDataAvailable(appId)) {
          history.push(`/${search}`);
        } else {
          history.push(`/${startScreen}`);
        }
      }

      if (response.user.accepted) {
        UserInfoStorage.storeUserRole(response.user.roles[0]);
        history.push(`/${search}`);
      } else {
        history.push(`/${startScreen}`);
      }

      yield put({
        type: `${VALIDATE_LOGIN_DATA}_SUCCESS`
      });
    } catch (errors) {
      yield put({
        type: `${VALIDATE_LOGIN_DATA}_FAILURE`,
        payload: { errors }
      });
    }
  });
}

export function* watchValidateMagicLoginToken() {
  yield takeEvery(`${VALIDATE_MAGIC_LOGIN_TOKEN}_REQUEST`, function*({
    payload: { token }
  }) {
    try {
      const response = yield call(
        AuthRepository.validateMagicLoginToken,
        token
      );

      if (response.success === undefined) {
        yield put({
          type: `${VALIDATE_MAGIC_LOGIN_TOKEN}_SUCCESS`
        });
        AuthDataStorage.storeApiKey(response.apikey);
        AuthDataStorage.storeUuid(response.uuid);
        yield put({
          type: `${GET_MY_PROFILE_DETAIL}_REQUEST`,
          payload: { userId: response.uuid }
        });
        if (!_.isEmpty(response.profile)) {
          history.push(`/${search}`);
        }
      } else {
        yield put({
          type: `${VALIDATE_MAGIC_LOGIN_TOKEN}_FAILURE`,
          payload: { errors: Invalid_login_token_error_code }
        });
      }
    } catch (errors) {
      yield put({
        type: `${VALIDATE_MAGIC_LOGIN_TOKEN}_FAILURE`,
        payload: { errors }
      });
    }
  });
}

export function* watchSignout() {
  yield takeEvery(`${SIGNOUT}_REQUEST`, function*() {
    try {
      yield call(AuthRepository.signout);
      yield put({
        type: `${SIGNOUT}_SUCCESS`
      });
    } catch (errors) {
      yield put({
        type: `${SIGNOUT}_FAILURE`,
        payload: { errors }
      });
    }
  });
}
