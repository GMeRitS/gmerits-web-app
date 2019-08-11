import routes from '../lib/ApiRoutes';
import { checkResponse, post, get } from '../lib/FetchHelper';

export default {
  signin(email) {
    return post(routes.signin(), { email }).then(checkResponse);
  },
  signinAnonymous(device_id, username) {
    return post(routes.signinAnonymous(), { device_id, username }).then(
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
