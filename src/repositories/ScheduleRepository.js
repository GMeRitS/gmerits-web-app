import routes from '../lib/ApiRoutes';
import { checkResponse, get, post, del } from '../lib/FetchHelper';

export default {
  getScheduleList() {
    return get(routes.getScheduleList(), {}, true).then(checkResponse);
  },

  getScheduleDetail(scheduleId) {
    return get(routes.getScheduleDetail(scheduleId), {}, true).then(
      checkResponse
    );
  },

  getSessionDetail(sessionId) {
    return get(routes.getSessionDetail(sessionId), {}, true).then(
      checkResponse
    );
  },

  reserveSeat(sessionId) {
    return post(routes.reserveSeat(sessionId), {}).then(checkResponse);
  },

  cancelReservation(sessionId) {
    return del(routes.cancelReservation(sessionId)).then(checkResponse);
  },

  favouriteSchedule(sessionId) {
    return post(routes.favouriteSchedule(sessionId), {}).then(checkResponse);
  },

  removeFavouriteSchedule(sessionId) {
    return del(routes.removeFavouriteSchedule(sessionId)).then(checkResponse);
  }
};
