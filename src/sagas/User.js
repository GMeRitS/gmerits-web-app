import { takeEvery, select, put, call, delay } from 'redux-saga/effects';
import _ from 'lodash';

import UserConstants from '../constants/UserConstants';
import UserRepository from '../repositories/UserRepository';
import LocalStorage from '../lib/LocalStorage';

const {
  GET_USER,
  FILTER_SEARCH,
  GET_USER_DETAIL,
  GET_MY_PROFILE_DETAIL,
  ENDORSE_USER,
  REMOVE_ENDORSE_USER,
  FAVOURITE_USER,
  REMOVE_FAVOURITE_USER,
  GET_FAVOURITE_USERS,
  GET_MATCH_RECOMMENDATION,
  GET_SAME_TOPIC_USERS,
  SORT_RESULT,
  SEARCH_TOPIC,
  UPDATE_EDITED_USER_PROFILE,
  UPLOAD_PROFILE_IMAGE
} = UserConstants;

export function* watchGetUser() {
  yield takeEvery(`${GET_USER}_REQUEST`, function*() {
    try {
      const sortId = yield select(state => state.User.selectedOption.id);
      const filterUsedProperties = yield call(sortUserList, sortId);

      const filteredUserList = filterUsedProperties.filter(
        filteredList => filteredList['uu_id'] !== LocalStorage.get('uuid')
      );

      yield put({
        type: `${GET_USER}_SUCCESS`,
        payload: filteredUserList
      });
      yield delay(200);
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

      // let filteredUserList =
      //   !_isEmpty(userList) &&
      //   userList.filter(
      //     result =>
      //       result.username.toLowerCase().indexOf(searchInput.toLowerCase()) !==
      //       -1
      //   );

      const searchResult = yield call(UserRepository.filterSearch, searchInput);

      yield put({
        type: `${FILTER_SEARCH}_SUCCESS`,
        payload: searchInput === '' ? userList : searchResult
      });
    } catch (errors) {
      yield put({
        type: `${FILTER_SEARCH}_FAILURE`,
        payload: errors
      });
    }
  });
}

export function* watchGetUserListAfterSortResult() {
  yield takeEvery(`${SORT_RESULT}_REQUEST`, function*({ payload: { id } }) {
    yield call(sortUserList, id);
  });
}

function* sortUserList(id) {
  try {
    const sortedUserList = yield call(UserRepository.sortResult, id);
    const filteredSortedUserList = sortedUserList.map(newUserList =>
      _.pick(
        newUserList,
        'uu_id',
        'image_url',
        'username',
        'online',
        'biography',
        'mentor',
        'roles'
      )
    );

    yield put({
      type: `${SORT_RESULT}_SUCCESS`,
      payload: filteredSortedUserList
    });
  } catch (errors) {
    yield put({
      type: `${SORT_RESULT}_FAILURE`,
      payload: errors
    });
  }
}

function* getUserDetail(userId) {
  try {
    const userDetail = yield call(UserRepository.getUserDetail, userId);
    const filterUserDetail = _.pick(
      userDetail,
      'uu_id',
      'image_url',
      'username',
      'online',
      'biography',
      'is_favourite',
      'topics',
      'organizations',
      'roles'
    );

    yield put({
      type: `${GET_USER_DETAIL}_SUCCESS`,
      payload: filterUserDetail
    });
    yield delay(200);
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

export function* watchGetMyProfileDetail() {
  yield takeEvery(`${GET_MY_PROFILE_DETAIL}_REQUEST`, function*({
    payload: { userId }
  }) {
    yield call(getMyProfileDetail, userId);
  });
}

export function* getMyProfileDetail(userId) {
  try {
    const myProfileDetail = yield call(
      UserRepository.getMyProfileDetail,
      userId
    );
    const filterMyProfileDetail = _.pick(
      myProfileDetail,
      'uu_id',
      'image_url',
      'username',
      'online',
      'biography',
      'is_favourite',
      'topics',
      'organizations',
      'roles'
    );

    yield put({
      type: `${GET_MY_PROFILE_DETAIL}_SUCCESS`,
      payload: filterMyProfileDetail
    });
    yield delay(200);
    yield put({
      type: `${GET_MY_PROFILE_DETAIL}_STOP_LOADING`
    });
  } catch (errors) {
    yield put({
      type: `${GET_MY_PROFILE_DETAIL}_FAILURE`,
      payload: errors
    });
  }
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
      const filterFavouriteUserList = favouriteUserList.map(
        newFavouriteUserList =>
          _.pick(
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
      yield delay(200);
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
      const filterRecommendationList = recommendationList.map(
        newRecommendationList =>
          _.pick(
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
      yield delay(200);
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

export function* watchGetSameTopicUsers() {
  yield takeEvery(`${GET_SAME_TOPIC_USERS}_REQUEST`, function*({
    payload: { topicId }
  }) {
    try {
      const sameTopicUserList = yield call(
        UserRepository.getSameTopicUsers,
        topicId
      );
      const filterSameTopicUserList = sameTopicUserList.map(
        newRecommendationList =>
          _.pick(
            newRecommendationList,
            'uu_id',
            'image_url',
            'username',
            'online',
            'biography',
            'mentor'
          )
      );

      yield put({
        type: `${GET_SAME_TOPIC_USERS}_SUCCESS`,
        payload: filterSameTopicUserList
      });
    } catch (errors) {
      yield put({
        type: `${GET_SAME_TOPIC_USERS}_FAILURE`,
        payload: errors
      });
    }
  });
}

export function* watchGetSearchTopic() {
  yield takeEvery(`${SEARCH_TOPIC}_REQUEST`, function*({
    payload: { topicSearchInput }
  }) {
    try {
      const searchTopicList = yield call(
        UserRepository.getSearchTopic,
        topicSearchInput
      );

      yield put({
        type: `${SEARCH_TOPIC}_SUCCESS`,
        payload: searchTopicList
      });
    } catch (errors) {
      yield put({
        type: `${SEARCH_TOPIC}_FAILURE`,
        payload: errors
      });
    }
  });
}

export function* watchUpdateEditedUserProfile() {
  yield takeEvery(`${UPDATE_EDITED_USER_PROFILE}_REQUEST`, function*({
    payload: { userId, editFields }
  }) {
    try {
      const myEditedProfileDetail = yield call(
        UserRepository.updateEditedUserProfile,
        userId,
        editFields
      );

      yield put({
        type: `${UPDATE_EDITED_USER_PROFILE}_SUCCESS`,
        payload: myEditedProfileDetail
      });
    } catch (errors) {
      yield put({
        type: `${UPDATE_EDITED_USER_PROFILE}_FAILURE`,
        payload: errors
      });
    }
  });
}

export function* watchUploadUserProfileImage() {
  yield takeEvery(`${UPLOAD_PROFILE_IMAGE}_REQUEST`, function*({
    payload: { imageIdentifier, imageData }
  }) {
    try {
      yield call(
        UserRepository.uploadUserProfileImage,
        imageIdentifier,
        imageData
      );

      yield put({
        type: `${UPLOAD_PROFILE_IMAGE}_SUCCESS`
      });
    } catch (errors) {
      yield put({
        type: `${UPLOAD_PROFILE_IMAGE}_FAILURE`,
        payload: errors
      });
    }
  });
}
