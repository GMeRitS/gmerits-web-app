import { fork, all } from 'redux-saga/effects';

import { watchSignin, watchValidateMagicLoginToken, watchSignout } from './Auth';
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
  watchGetSearchTopic
} from './User';
import { watchGetOrganizationDetail } from './Organization';
import {
  watchGetScheduleList,
  watchGetScheduleDetail,
  watchGetSessionDetail
} from './Schedule';

export default function* root() {
  yield all([
    fork(watchSignin),
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
    fork(watchGetOrganizationDetail),
    fork(watchGetScheduleList),
    fork(watchGetScheduleDetail),
    fork(watchGetSessionDetail)
  ]);
}
