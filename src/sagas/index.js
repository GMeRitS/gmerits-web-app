import { fork, all } from 'redux-saga/effects';

import { watchGetUser, filterSearch } from './User';

export default function* root() {
  yield all([fork(watchGetUser), fork(filterSearch)]);
}
