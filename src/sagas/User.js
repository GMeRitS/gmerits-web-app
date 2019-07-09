import { takeEvery, select, put, call, delay } from 'redux-saga/effects';
import _pick from 'lodash/pick';
import _isEmpty from 'lodash/isEmpty';

import UserConstants from '../constants/UserConstants';
import UserRepository from '../repositories/UserRepository';

const {
  GET_USER,
  FILTER_SEARCH,
  GET_USER_DETAIL,
  ENDORSE_USER,
  REMOVE_ENDORSE_USER,
  FAVOURITE_USER,
  REMOVE_FAVOURITE_USER,
  GET_FAVOURITE_USERS,
  GET_MATCH_RECOMMENDATION
} = UserConstants;

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
      yield delay(110);
      yield put({
        type: `${GET_USER}_STOP_LOADING`
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
        payload: (searchInput = '' ? userList : filteredUserList)
      });
    } catch (errors) {
      yield put({
        type: `${FILTER_SEARCH}_FAILURE`,
        payload: errors
      });
    }
  });
}

function* getUserDetail(userId) {
  try {
    const userDetail = yield call(UserRepository.getUserDetail, userId);

    yield put({
      type: `${GET_USER_DETAIL}_SUCCESS`,
      payload: userDetail
    });
    yield delay(110);
    yield put({
      type: `${GET_USER_DETAIL}_STOP_LOADING`
    });
  } catch (errors) {
    yield put({
      type: `${GET_USER_DETAIL}_FAILURE`,
      payload: errors
    });
  }
}

export function* watchGetUserDetail() {
  yield takeEvery(`${GET_USER_DETAIL}_REQUEST`, function*({
    payload: { userId }
  }) {
    yield call(getUserDetail, userId);
  });
}

export function* watchEndorseUser() {
  yield takeEvery(`${ENDORSE_USER}_REQUEST`, function*({
    payload: { topicId, userId }
  }) {
    try {
      yield call(UserRepository.endorseUser, topicId, userId);
      yield call(getUserDetail, userId);
    } catch (errors) {
      yield put({
        type: `${ENDORSE_USER}_FAILURE`,
        payload: { errors }
      });
    }
  });
}

export function* watchRemoveEndorseUser() {
  yield takeEvery(`${REMOVE_ENDORSE_USER}_REQUEST`, function*({
    payload: { topicId, userId }
  }) {
    try {
      yield call(UserRepository.removeEndorseUser, topicId, userId);
      yield call(getUserDetail, userId);
    } catch (errors) {
      yield put({
        type: `${ENDORSE_USER}_FAILURE`,
        payload: { errors }
      });
    }
  });
}

export function* watchFavouriteUser() {
  yield takeEvery(`${FAVOURITE_USER}_REQUEST`, function*({
    payload: { userId }
  }) {
    try {
      yield call(UserRepository.favouriteUser, userId);
      yield call(getUserDetail, userId);
    } catch (errors) {
      yield put({
        type: `${FAVOURITE_USER}_FAILURE`,
        payload: { errors }
      });
    }
  });
}

export function* watchRemoveFavouriteUser() {
  yield takeEvery(`${REMOVE_FAVOURITE_USER}_REQUEST`, function*({
    payload: { userId }
  }) {
    try {
      yield call(UserRepository.removeFavouriteUser, userId);
      yield call(getUserDetail, userId);
    } catch (errors) {
      yield put({
        type: `${REMOVE_FAVOURITE_USER}_FAILURE`,
        payload: { errors }
      });
    }
  });
}

export function* watchGetFavouriteUsers() {
  yield takeEvery(`${GET_FAVOURITE_USERS}_REQUEST`, function*() {
    try {
      const favouriteUserList = yield call(UserRepository.getFavouriteUsers);
      const filterFavouriteUserList = favouriteUserList.map(newFavouriteUserList =>
        _pick(
          newFavouriteUserList,
          'uu_id',
          'image_url',
          'username',
          'online',
          'biography'
        )
      );

      yield put({
        type: `${GET_FAVOURITE_USERS}_SUCCESS`,
        payload: filterFavouriteUserList
      });
      yield delay(110);
      yield put({
        type: `${GET_FAVOURITE_USERS}_STOP_LOADING`
      });
    } catch (errors) {
      yield put({
        type: `${GET_FAVOURITE_USERS}_FAILURE`,
        payload: errors
      });
    }
  });
}

export function* watchGetMatchRecommendations() {
  yield takeEvery(`${GET_MATCH_RECOMMENDATION}_REQUEST`, function*() {
    try {
      const recommendationList = yield call(
        UserRepository.getMatchRecommendations
      );
      const filterRecommendationList = recommendationList.map(newRecommendationList =>
        _pick(
          newRecommendationList,
          'uu_id',
          'image_url',
          'username',
          'online',
          'biography'
        )
      );

      yield put({
        type: `${GET_MATCH_RECOMMENDATION}_SUCCESS`,
        payload: filterRecommendationList
      });
      yield delay(110);
      yield put({
        type: `${GET_MATCH_RECOMMENDATION}_STOP_LOADING`
      });
    } catch (errors) {
      yield put({
        type: `${GET_MATCH_RECOMMENDATION}_FAILURE`,
        payload: errors
      });
    }
  });
}
