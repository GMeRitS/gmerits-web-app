import routes from '../lib/ApiRoutes';
import { checkResponse, get } from '../lib/FetchHelper';

export default {
  getScheduleList() {
    return get(routes.getScheduleList(), {}, true).then(checkResponse);
  }
};
