import ScheduleConstants from '../constants/ScheduleConstants';

const {
  GET_SCHEDULE_LIST,
  CURRENT_EVENT,
  GET_SCHEDULE_DETAIL,
  GET_SESSION_DETAIL,
  RESERVE_SEAT,
  CANCEL_RESERVATION,
  FAVOURITE_SCHEDULE,
  REMOVE_FAVOURITE_SCHEDULE
} = ScheduleConstants;

export const getScheduleList = () => ({
  type: `${GET_SCHEDULE_LIST}_REQUEST`
});

export const currentEvent = event => ({
  type: `${CURRENT_EVENT}_REQUEST`,
  payload: event
});

export const getScheduleDetail = scheduleId => ({
  type: `${GET_SCHEDULE_DETAIL}_REQUEST`,
  payload: { scheduleId }
});

export const getSessionDetail = sessionId => ({
  type: `${GET_SESSION_DETAIL}_REQUEST`,
  payload: { sessionId }
});

export const reserveSeat = sessionId => ({
  type: `${RESERVE_SEAT}_REQUEST`,
  payload: { sessionId }
});

export const cancelReservation = sessionId => ({
  type: `${CANCEL_RESERVATION}_REQUEST`,
  payload: { sessionId }
});

export const favouriteSchedule = sessionId => ({
  type: `${FAVOURITE_SCHEDULE}_REQUEST`,
  payload: {sessionId}
});

export const removeFavouriteSchedule = sessionId => ({
  type: `${REMOVE_FAVOURITE_SCHEDULE}_REQUEST`,
  payload: {sessionId}
});

export default {
  getScheduleList,
  currentEvent,
  getScheduleDetail,
  getSessionDetail,
  reserveSeat,
  cancelReservation,
  favouriteSchedule,
  removeFavouriteSchedule
};
