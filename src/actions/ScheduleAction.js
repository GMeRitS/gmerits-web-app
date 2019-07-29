import ScheduleConstants from '../constants/ScheduleConstants';

const { GET_SCHEDULE_LIST, CURRENT_EVENT } = ScheduleConstants;

export const getScheduleList = () => ({
  type: `${GET_SCHEDULE_LIST}_REQUEST`
});

export const currentEvent = event => ({
  type: `${CURRENT_EVENT}_REQUEST`,
  payload: event
});

export default {
  getScheduleList,
  currentEvent
};
