import createReducer from '../lib/utils/CreateReducer';
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

export const getInitialState = () => ({
  loading: false,
  errors: {},
  scheduleList: {},
  currentEvent: {},
  scheduleDetail: {},
  sessionDetail: {}
});

export default createReducer(getInitialState, {
  [`${GET_SCHEDULE_LIST}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),

  [`${GET_SCHEDULE_LIST}_SUCCESS`]: (state, { payload: scheduleList }) => ({
    loading: false,
    scheduleList
  }),

  [`${GET_SCHEDULE_LIST}_FAILURE`]: (state, { payload: errors }) => ({
    loading: false,
    errors
  }),

  [`${CURRENT_EVENT}_REQUEST`]: (state, { payload: currentEvent }) => ({
    currentEvent
  }),

  [`${GET_SCHEDULE_DETAIL}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),

  [`${GET_SCHEDULE_DETAIL}_SUCCESS`]: (state, { payload: scheduleDetail }) => ({
    loading: false,
    scheduleDetail
  }),

  [`${GET_SCHEDULE_DETAIL}_FAILURE`]: (state, { payload: errors }) => ({
    loading: false,
    errors
  }),

  [`${GET_SESSION_DETAIL}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),

  [`${GET_SESSION_DETAIL}_SUCCESS`]: (state, { payload: sessionDetail }) => ({
    loading: false,
    sessionDetail
  }),

  [`${GET_SESSION_DETAIL}_FAILURE`]: (state, { payload: errors }) => ({
    loading: false,
    errors
  }),

  [`${RESERVE_SEAT}_REQUEST`]: () => ({
    errors: {}
  }),

  [`${RESERVE_SEAT}_FAILURE`]: (state, { payload: { errors } }) => ({
    errors
  }),

  [`${CANCEL_RESERVATION}_REQUEST`]: () => ({
    errors: {}
  }),

  [`${CANCEL_RESERVATION}_FAILURE`]: (state, { payload: { errors } }) => ({
    errors
  }),

  [`${FAVOURITE_SCHEDULE}_REQUEST`]: () => ({
    errors: {}
  }),

  [`${FAVOURITE_SCHEDULE}_FAILURE`]: (state, { payload: { errors } }) => ({
    errors
  }),

  [`${REMOVE_FAVOURITE_SCHEDULE}_REQUEST`]: () => ({
    errors: {}
  }),

  [`${REMOVE_FAVOURITE_SCHEDULE}_FAILURE`]: (
    state,
    { payload: { errors } }
  ) => ({
    errors
  })
});
