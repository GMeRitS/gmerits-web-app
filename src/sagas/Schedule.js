import { takeEvery, put, call } from 'redux-saga/effects';

import ScheduleConstants from '../constants/ScheduleConstants';
import ScheduleRepository from '../repositories/ScheduleRepository';

const { GET_SCHEDULE_LIST, GET_SCHEDULE_DETAIL } = ScheduleConstants;

export function* watchGetScheduleList() {
  yield takeEvery(`${GET_SCHEDULE_LIST}_REQUEST`, function*() {
    try {
      const scheduleList = yield call(ScheduleRepository.getScheduleList);

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

export function* watchGetScheduleDetail() {
  yield takeEvery(`${GET_SCHEDULE_DETAIL}_REQUEST`, function*({
    payload: scheduleId
  }) {
    try {
      const scheduleDetail = yield call(ScheduleRepository.getScheduleDetail, scheduleId);

      yield put({
        type: `${GET_SCHEDULE_DETAIL}_SUCCESS`,
        payload: scheduleDetail
      });
    } catch (errors) {
      yield put({
        type: `${GET_SCHEDULE_DETAIL}_FAILURE`,
        payload: errors
      });
    }
  });
}
