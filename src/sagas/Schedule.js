import { takeEvery, put, call } from 'redux-saga/effects';

import ScheduleConstants from '../constants/ScheduleConstants';
import ScheduleRepository from '../repositories/ScheduleRepository';

const {
  GET_SCHEDULE_LIST,
  GET_SCHEDULE_DETAIL,
  GET_SESSION_DETAIL,
  RESERVE_SEAT,
  CANCEL_RESERVATION,
  FAVOURITE_SCHEDULE,
  REMOVE_FAVOURITE_SCHEDULE
} = ScheduleConstants;

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
    payload: { scheduleId }
  }) {
    try {
      const scheduleDetail = yield call(
        ScheduleRepository.getScheduleDetail,
        scheduleId
      );

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

function* getSessionDetail(sessionId) {
  try {
    const sessionDetail = yield call(
      ScheduleRepository.getSessionDetail,
      sessionId
    );

    yield put({
      type: `${GET_SESSION_DETAIL}_SUCCESS`,
      payload: sessionDetail
    });
  } catch (errors) {
    yield put({
      type: `${GET_SESSION_DETAIL}_FAILURE`,
      payload: errors
    });
  }
}

export function* watchGetSessionDetail() {
  yield takeEvery(`${GET_SESSION_DETAIL}_REQUEST`, function*({
    payload: { sessionId }
  }) {
    yield call(getSessionDetail, sessionId);
  });
}

export function* watchReserveSeat() {
  yield takeEvery(`${RESERVE_SEAT}_REQUEST`, function*({
    payload: { sessionId }
  }) {
    try {
      yield call(ScheduleRepository.reserveSeat, sessionId);
      yield call(getSessionDetail, sessionId);
      yield put({
        type: `${RESERVE_SEAT}_SUCCESS`
      });
    } catch (errors) {
      yield put({
        type: `${RESERVE_SEAT}_FAILURE`,
        payload: errors
      });
    }
  });
}

export function* watchCancelReservation() {
  yield takeEvery(`${CANCEL_RESERVATION}_REQUEST`, function*({
    payload: { sessionId }
  }) {
    try {
      yield call(ScheduleRepository.cancelReservation, sessionId);
      yield call(getSessionDetail, sessionId);
      yield put({
        type: `${CANCEL_RESERVATION}_SUCCESS`
      });
    } catch (errors) {
      yield put({
        type: `${CANCEL_RESERVATION}_FAILURE`,
        payload: errors
      });
    }
  });
}

export function* watchFavouriteSession() {
  yield takeEvery(`${FAVOURITE_SCHEDULE}_REQUEST`, function*({
    payload: { sessionId }
  }) {
    try {
      yield call(ScheduleRepository.favouriteSession, sessionId);
      yield call(getSessionDetail, sessionId);
      yield put({
        type: `${FAVOURITE_SCHEDULE}_SUCCESS`
      });
    } catch (errors) {
      yield put({
        type: `${FAVOURITE_SCHEDULE}_FAILURE`,
        payload: errors
      });
    }
  });
}

export function* watchRemoveFavouriteSession() {
  yield takeEvery(`${REMOVE_FAVOURITE_SCHEDULE}_REQUEST`, function*({
    payload: { sessionId }
  }) {
    try {
      yield call(ScheduleRepository.removeFavouriteSession, sessionId);
      yield call(getSessionDetail, sessionId);
      yield put({
        type: `${REMOVE_FAVOURITE_SCHEDULE}_SUCCESS`
      });
    } catch (errors) {
      yield put({
        type: `${REMOVE_FAVOURITE_SCHEDULE}_FAILURE`,
        payload: errors
      });
    }
  });
}
