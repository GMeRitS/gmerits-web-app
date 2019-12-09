import { takeEvery, put, call } from 'redux-saga/effects';

import _ from 'lodash';
import history from '../history';
import AuthConstants from '../constants/AuthConstants';
import AuthRepository from '../repositories/AuthRepository';
import SigninValidation from '../lib/validators/SigninValidation';
import UserConstants from '../constants/UserConstants';
import RoutePathConstants from '../constants/RoutePathConstants';
import AuthDataStorage from '../helpers/StorageHelpers/AuthDataStorage';

const {
  SIGNIN,
  SIGNIN_ANONYMOUS,
  VALIDATE_MAGIC_LOGIN_TOKEN,
  Invalid_magic_login_token_error_code,
  SIGNOUT
} = AuthConstants;
const { GET_MY_PROFILE_DETAIL } = UserConstants;
const { search } = RoutePathConstants;

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

export function* watchSigninAnonymous() {
  yield takeEvery(`${SIGNIN_ANONYMOUS}_REQUEST`, function*({
    payload: { deviceId, username }
  }) {
    try {
      if (!AuthDataStorage.getDeviceId()) {
        AuthDataStorage.storeDeviceId(deviceId);
      }
      const response = yield call(
        AuthRepository.signinAnonymous,
        deviceId,
        username
      );

      AuthDataStorage.storeApiKey(response.apikey);
      AuthDataStorage.storeUuid(response.uuid);

      history.push(`/${search}`);

      yield put({
        type: `${SIGNIN_ANONYMOUS}_SUCCESS`
      });
    } catch (errors) {
      yield put({
        type: `${SIGNIN_ANONYMOUS}_FAILURE`,
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
        AuthDataStorage.storeApiKey(response.uuid);
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
          payload: { errors: Invalid_magic_login_token_error_code }
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
