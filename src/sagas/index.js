import { fork, all } from 'redux-saga/effects';

import { watchGetUser, filterSearch, watchGetUserDetail } from './User';

export default function* root() {
  yield all([fork(watchGetUser), fork(filterSearch), fork(watchGetUserDetail)]);
}
