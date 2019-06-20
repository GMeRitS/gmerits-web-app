import routes from '../lib/ApiRoutes';
import { checkResponse, get } from '../lib/FetchHelper';

export default {
  getUser() {
    return get(routes.getUser(), {}, true).then(checkResponse);
  }
};