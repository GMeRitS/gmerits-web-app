import routes from '../lib/ApiRoutes';
import { checkResponse, post } from '../lib/FetchHelper';

export default {
  signin(email) {
    return post(routes.signin(), { email }).then(checkResponse);
  }
};
