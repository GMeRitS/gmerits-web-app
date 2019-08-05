import moment from 'moment';

export const getDate = (datetime) => {
  return moment(datetime).toDate();
};