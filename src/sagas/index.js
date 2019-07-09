import { fork, all } from 'redux-saga/effects';

import {
  watchGetUser,
  filterSearch,
  watchGetUserDetail,
  watchEndorseUser,
  watchRemoveEndorseUser,
  watchFavouriteUser,
  watchRemoveFavouriteUser
} from './User';
import { watchGetOrganizationDetail } from './Organization';

export default function* root() {
  yield all([
    fork(watchGetUser),
    fork(filterSearch),
    fork(watchGetUserDetail),
    fork(watchGetOrganizationDetail),
    fork(watchEndorseUser),
    fork(watchRemoveEndorseUser),
    fork(watchFavouriteUser),
    fork(watchRemoveFavouriteUser)
  ]);
}
