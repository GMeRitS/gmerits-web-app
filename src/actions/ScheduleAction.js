import ScheduleConstants from '../constants/ScheduleConstants';

const { GET_SCHEDULE_LIST } = ScheduleConstants;

export const getScheduleList = () => ({
  type: `${GET_SCHEDULE_LIST}_REQUEST`
});

export default {
  getScheduleList
};
