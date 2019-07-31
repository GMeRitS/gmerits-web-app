import routes from '../lib/ApiRoutes';
import { checkResponse, post, get } from '../lib/FetchHelper';

export default {
  signin(email) {
    return post(routes.signin(), { email }).then(checkResponse);
  },
  validateMagicLoginToken(token) {
    return get(routes.validateMagicLoginToken(token), {}, true).then(
      checkResponse
    );
  }
};
