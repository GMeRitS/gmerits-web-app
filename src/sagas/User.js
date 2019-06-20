import { takeEvery, put, call } from 'redux-saga/effects';

import UserConstants from '../constants/UserConstants';
import UserRepository from '../repositories/UserRepository';

const { GET_USER } = UserConstants;

export function* watchGetUser() {
  yield takeEvery(`${GET_USER}_REQUEST`, function*() {
    try {
      const userList = yield call(UserRepository.getUser);

      yield put({
        type: `${GET_USER}_SUCCESS`,
        payload: userList
      });
    }
    catch (errors) {
      yield put({
        type: `${GET_USER}_FAILURE`,
        payload: errors
      });
    }
  });
}

