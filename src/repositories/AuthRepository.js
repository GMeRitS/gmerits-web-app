import routes from '../lib/ApiRoutes';
import { checkResponse, post, get } from '../lib/FetchHelper';

export default {
  signin(email) {
    return post(routes.signin(), { email }).then(checkResponse);
  },
  validateLoginData(loginData) {
    return post(routes.validateLoginData(), loginData).then(
      checkResponse
    );
  },
  validateMagicLoginToken(token) {
    return get(routes.validateMagicLoginToken(token), {}, true).then(
      checkResponse
    );
  },
  signout() {
    return post(routes.signout(), {}).then(checkResponse);
  }
};
