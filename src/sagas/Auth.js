import { takeEvery, put, call } from 'redux-saga/effects';

import _ from 'lodash';
import AuthConstants from '../constants/AuthConstants';
import AuthRepository from '../repositories/AuthRepository';
import SigninValidation from '../lib/validators/SigninValidation';
import AuthInfoUser from '../lib/AuthInfoUser';
import LocalStorage from '../lib/LocalStorage';

const { SIGNIN, VALIDATE_MAGIC_LOGIN_TOKEN, Invalid_magic_login_token_error_code } = AuthConstants;

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
  yield takeEvery(`${VALIDATE_MAGIC_LOGIN_TOKEN}_REQUEST`, function*({ payload: { token } }) {
    try {
      const response = yield call(AuthRepository.validateMagicLoginToken, token);

      if (response.success === undefined) {
        yield put({
          type: `${VALIDATE_MAGIC_LOGIN_TOKEN}_SUCCESS`
        });
        LocalStorage.set('apikey', response.apikey);
        LocalStorage.set('uuid', response.uuid);
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
  })
}

