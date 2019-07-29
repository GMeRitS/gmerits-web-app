import { takeEvery, put, call } from 'redux-saga/effects';

import ScheduleConstants from '../constants/ScheduleConstants';
import ScheduleRepository from '../repositories/ScheduleRepository';

const { GET_SCHEDULE_LIST } = ScheduleConstants;

export function* watchGetScheduleList() {
  yield takeEvery(`${GET_SCHEDULE_LIST}_REQUEST`, function*() {
    try {
      const scheduleList = yield call(
        ScheduleRepository.getScheduleList
      );

      yield put({
        type: `${GET_SCHEDULE_LIST}_SUCCESS`,
        payload: scheduleList
      });
    } catch (errors) {
      yield put({
        type: `${GET_SCHEDULE_LIST}_FAILURE`,
        payload: errors
      });
    }
  });
}
