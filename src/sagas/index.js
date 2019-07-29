import { fork, all } from 'redux-saga/effects';

import {
  watchGetUser,
  filterSearch,
  watchGetUserDetail,
  watchEndorseUser,
  watchRemoveEndorseUser,
  watchFavouriteUser,
  watchRemoveFavouriteUser,
  watchGetFavouriteUsers,
  watchGetMatchRecommendations,
  watchGetMyProfileDetail,
  watchGetSameTopicUsers
} from './User';
import { watchGetOrganizationDetail } from './Organization';
import { watchGetScheduleList, watchGetScheduleDetail } from './Schedule';

export default function* root() {
  yield all([
    fork(watchGetUser),
    fork(filterSearch),
    fork(watchGetUserDetail),
    fork(watchEndorseUser),
    fork(watchRemoveEndorseUser),
    fork(watchFavouriteUser),
    fork(watchRemoveFavouriteUser),
    fork(watchGetFavouriteUsers),
    fork(watchGetMatchRecommendations),
    fork(watchGetMyProfileDetail),
    fork(watchGetSameTopicUsers),
    fork(watchGetOrganizationDetail),
    fork(watchGetScheduleList),
    fork(watchGetScheduleDetail)
  ]);
}
