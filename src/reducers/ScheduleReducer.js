import createReducer from '../lib/utils/CreateReducer';
import ScheduleConstants from '../constants/ScheduleConstants';

const { GET_SCHEDULE_LIST } = ScheduleConstants;

export const getInitialState = () => ({
  loading: false,
  errors: {},
  scheduleList: {}
});

export default createReducer(getInitialState, {
  [`${GET_SCHEDULE_LIST}_REQUEST`]: () => ({
    loading: true,
    errors: {}
  }),

  [`${GET_SCHEDULE_LIST}_SUCCESS`]: (state, {payload: scheduleList}) => ({
    loading: false,
    scheduleList
  }),

  [`${GET_SCHEDULE_LIST}_FAILURE`]: (state, {payload: errors}) => ({
    loading: false,
    errors
  }),
});