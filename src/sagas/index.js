import { fork, all } from 'redux-saga/effects';

import { watchGetAppConfig } from './AppConfig';

import {
  watchSignin,
  watchSigninAnonymous,
  watchValidateMagicLoginToken,
  watchSignout
} from './Auth';
import {
  watchGetUser,
  filterSearch,
  watchGetUserListAfterSortResult,
  watchGetUserDetail,
  watchEndorseUser,
  watchRemoveEndorseUser,
  watchFavouriteUser,
  watchRemoveFavouriteUser,
  watchGetFavouriteUsers,
  watchGetMatchRecommendations,
  watchGetMyProfileDetail,
  watchGetSameTopicUsers,
  watchGetSearchTopic,
  watchUpdateEditedUserProfile,
  watchUploadUserProfileImage
} from './User';
import { watchGetOrganizationDetail } from './Organization';
import {
  watchGetScheduleList,
  watchGetScheduleDetail,
  watchGetSessionDetail,
  watchReserveSeat,
  watchCancelReservation,
  watchFavouriteSession,
  watchRemoveFavouriteSession
} from './Schedule';

export default function* root() {
  yield all([
    fork(watchGetAppConfig),

    fork(watchSignin),
    fork(watchSigninAnonymous),
    fork(watchValidateMagicLoginToken),
    fork(watchSignout),
    fork(watchGetUser),
    fork(filterSearch),
    fork(watchGetUserListAfterSortResult),
    fork(watchGetUserDetail),
    fork(watchEndorseUser),
    fork(watchRemoveEndorseUser),
    fork(watchFavouriteUser),
    fork(watchRemoveFavouriteUser),
    fork(watchGetFavouriteUsers),
    fork(watchGetMatchRecommendations),
    fork(watchGetMyProfileDetail),
    fork(watchGetSameTopicUsers),
    fork(watchGetSearchTopic),
    fork(watchUpdateEditedUserProfile),
    fork(watchUploadUserProfileImage),

    fork(watchGetOrganizationDetail),

    fork(watchGetScheduleList),
    fork(watchGetScheduleDetail),
    fork(watchGetSessionDetail),
    fork(watchReserveSeat),
    fork(watchCancelReservation),
    fork(watchFavouriteSession),
    fork(watchRemoveFavouriteSession)
  ]);
}
