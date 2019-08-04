import createReducer from '../lib/utils/CreateReducer';
import ScheduleConstants from '../constants/ScheduleConstants';

const {
  GET_SCHEDULE_LIST,
  CURRENT_EVENT,
  GET_SCHEDULE_DETAIL,
  GET_SESSION_DETAIL
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
  })
});
