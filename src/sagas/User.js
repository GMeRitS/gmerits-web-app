import { takeEvery, put, call } from 'redux-saga/effects';
import _pick  from 'lodash/pick';

import UserConstants from '../constants/UserConstants';
import UserRepository from '../repositories/UserRepository';

const { GET_USER } = UserConstants;

export function* watchGetUser() {
  yield takeEvery(`${GET_USER}_REQUEST`, function*() {
    try {
      const userList = yield call(UserRepository.getUser);

      const filterUsedProperties = userList.map(newUserList => _pick(newUserList, 'uu_id', 'image_url', 'username', 'online', 'biography', 'mentor'));

      yield put({
        type: `${GET_USER}_SUCCESS`,
        payload: filterUsedProperties
      });
    } catch (errors) {
      yield put({
        type: `${GET_USER}_FAILURE`,
        payload: errors
      });
    }
  });
}
