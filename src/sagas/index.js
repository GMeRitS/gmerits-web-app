import { fork, all } from 'redux-saga/effects';

import { watchGetUser } from './User';

export default function* root() {
  yield all([fork(watchGetUser)]);
}