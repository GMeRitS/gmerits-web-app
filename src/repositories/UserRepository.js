import routes from '../lib/ApiRoutes';
import { checkResponse, get, post, del } from '../lib/FetchHelper';

export default {
  getUser() {
    return get(routes.getUser(), {}, true).then(checkResponse);
  },
  getUserDetail(userId) {
    return get(routes.getUserDetail(userId), {}, true).then(checkResponse);
  },
  endorseUser(topicId, userId) {
    return post(routes.endorseUser(topicId, userId), {}).then(checkResponse);
  },
  removeEndorseUser(topicId, userId) {
    return del(routes.removeEndorseUser(topicId, userId)).then(checkResponse)
  }
};
