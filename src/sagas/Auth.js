import { takeEvery, put, call } from 'redux-saga/effects';

import _ from 'lodash';
import history from '../history';
import AuthConstants from '../constants/AuthConstants';
import AuthRepository from '../repositories/AuthRepository';
import SigninValidation from '../lib/validators/SigninValidation';
import AuthInfoUser from '../lib/AuthInfoUser';
import LocalStorage from '../lib/LocalStorage';
import UserConstants from '../constants/UserConstants';
import RoutePathConstants from '../constants/RoutePathConstants';

const {
  SIGNIN,
  VALIDATE_MAGIC_LOGIN_TOKEN,
  Invalid_magic_login_token_error_code,
  SIGNOUT
} = AuthConstants;
const { GET_MY_PROFILE_DETAIL } = UserConstants;
const { searchNew } = RoutePathConstants;

export function* watchSignin() {
  yield takeEvery(`${SIGNIN}_REQUEST`, function*({ payload: { email } }) {
    try {
      const validationErrors = SigninValidation.validate({ email });
      if (!_.isEmpty(validationErrors)) throw validationErrors;

      const response = yield call(AuthRepository.signin, email);
      yield call(login, response.loginToken);
    } catch (errors) {
      yield put({
        type: `${SIGNIN}_FAILURE`,
        payload: { errors }
      });
      // const { locale } = yield select(state => state.Localization);
      // Alert.apiError(locale, errors);
    }
  });
}

function* login(loginToken) {
  AuthInfoUser.setToken(loginToken, true);
  //yield call(getMyProfileDetail);
  yield put({
    type: `${SIGNIN}_SUCCESS`
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
        LocalStorage.set('apikey', response.apikey);
        LocalStorage.set('uuid', response.uuid);
        yield put({
          type: `${GET_MY_PROFILE_DETAIL}_REQUEST`,
          payload: { userId: response.uuid }
        });
        if (!_.isEmpty(response.profile)) {
          history.push(`/${searchNew}`);
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
      console.log('signout');
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
