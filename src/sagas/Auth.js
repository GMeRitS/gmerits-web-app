import { takeEvery, put, call } from 'redux-saga/effects';

import _ from 'lodash';
import AuthConstants from '../constants/AuthConstants';
import AuthRepository from '../repositories/AuthRepository';
import SigninValidation from '../lib/validators/SigninValidation';
import AuthInfoUser from '../lib/AuthInfoUser';


const { SIGNIN } = AuthConstants;

export function* watchSignin() {
  yield takeEvery(`${SIGNIN}_REQUEST`, function*({ payload: { email } }) {
    try {
      const validationErrors = SigninValidation.validate(email);
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