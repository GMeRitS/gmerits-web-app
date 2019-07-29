import ScheduleConstants from '../constants/ScheduleConstants';

const { GET_SCHEDULE_LIST, CURRENT_EVENT, GET_SCHEDULE_DETAIL } = ScheduleConstants;

export const getScheduleList = () => ({
  type: `${GET_SCHEDULE_LIST}_REQUEST`
});

export const currentEvent = event => ({
  type: `${CURRENT_EVENT}_REQUEST`,
  payload: event
});

export const getScheduleDetail = scheduleId => ({
  type: `${GET_SCHEDULE_DETAIL}_REQUEST`,
  payload: scheduleId
})

export default {
  getScheduleList,
  currentEvent,
  getScheduleDetail
};
