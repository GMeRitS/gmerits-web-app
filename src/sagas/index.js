import { fork, all } from 'redux-saga/effects';

import { watchGetUser, filterSearch, watchGetUserDetail } from './User';
import { watchGetOrganizationDetail } from './Organization';

export default function* root() {
  yield all([
    fork(watchGetUser),
    fork(filterSearch),
    fork(watchGetUserDetail),
    fork(watchGetOrganizationDetail)
  ]);
}
