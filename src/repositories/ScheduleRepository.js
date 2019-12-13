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

  favouriteSession(sessionId) {
    return post(routes.favouriteSession(sessionId), {}).then(checkResponse);
  },

  removeFavouriteSession(sessionId) {
    return del(routes.removeFavouriteSession(sessionId)).then(checkResponse);
  }
};
