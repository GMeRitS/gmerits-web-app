import { takeEvery, select, put, call } from 'redux-saga/effects';
import _pick from 'lodash/pick';
import _isEmpty from 'lodash/isEmpty';

import UserConstants from '../constants/UserConstants';
import UserRepository from '../repositories/UserRepository';

const { GET_USER, FILTER_SEARCH } = UserConstants;

export function* watchGetUser() {
  yield takeEvery(`${GET_USER}_REQUEST`, function*() {
    try {
      const userList = yield call(UserRepository.getUser);
      const filterUsedProperties = userList.map(newUserList =>
        _pick(
          newUserList,
          'uu_id',
          'image_url',
          'username',
          'online',
          'biography',
          'mentor'
        )
      );

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

export function* filterSearch() {
  yield takeEvery(`${FILTER_SEARCH}_REQUEST`, function*({
    payload: { searchInput }
  }) {
    try {
      const userList = yield select(state => state.User.userList);

      let filteredUserList =
        !_isEmpty(userList) &&
        userList.filter(
          result =>
            result.username.toLowerCase().indexOf(searchInput.toLowerCase()) !==
            -1
        );

      yield put({
        type: `${FILTER_SEARCH}_SUCCESS`,
        payload: filteredUserList
      });
    } catch (errors) {
      yield put({
        type: `${FILTER_SEARCH}_FAILURE`,
        payload: errors
      });
    }
  });
}
